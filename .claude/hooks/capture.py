#!/usr/bin/env python3
"""8x assignment agent-capture hook.

Fires on the Claude Code `Stop` event (end of turn). Reads the session
transcript, pulls the last real user prompt and the final assistant text
response for that turn (skipping tool calls / thinking blocks), and appends
a PROMPT + RESPONSE entry pair to a per-session markdown log in
.agent-logs/, in the exact format the 8x brief specifies.
"""
import json
import sys
import os
import datetime
import uuid

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
LOG_DIR = os.path.join(REPO_ROOT, ".agent-logs")


def read_transcript(path):
    entries = []
    with open(path, "r") as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            try:
                entries.append(json.loads(line))
            except json.JSONDecodeError:
                continue
    return entries


def extract_text_blocks(content):
    if isinstance(content, str):
        return content
    if not isinstance(content, list):
        return ""
    parts = []
    for block in content:
        if isinstance(block, dict) and block.get("type") == "text":
            parts.append(block.get("text", ""))
    return "\n".join(parts).strip()


def find_last_turn(entries):
    """Return (prompt_text, response_text, model_name) for the most recent
    real user prompt and the assistant's final text response to it."""
    last_user_idx = None
    for i in range(len(entries) - 1, -1, -1):
        e = entries[i]
        if e.get("type") != "user":
            continue
        msg = e.get("message", {})
        content = msg.get("content", "")
        # Skip tool_result-only user entries (those are Claude Code
        # feeding tool output back in, not a real human prompt).
        if isinstance(content, list):
            if all(isinstance(b, dict) and b.get("type") == "tool_result" for b in content):
                continue
        text = extract_text_blocks(content)
        if text:
            last_user_idx = i
            break

    if last_user_idx is None:
        return None, None, None

    prompt_text = extract_text_blocks(entries[last_user_idx]["message"].get("content", ""))

    response_text = ""
    model_name = ""
    for e in entries[last_user_idx + 1:]:
        if e.get("type") != "assistant":
            continue
        msg = e.get("message", {})
        text = extract_text_blocks(msg.get("content", ""))
        if text:
            response_text = text
        m = msg.get("model")
        if m:
            model_name = m

    return prompt_text, response_text, model_name


def session_log_path(session_id, create_new):
    os.makedirs(LOG_DIR, exist_ok=True)
    existing = [f for f in os.listdir(LOG_DIR) if session_id in f]
    if existing:
        return os.path.join(LOG_DIR, existing[0]), False
    ts = datetime.datetime.utcnow().strftime("%Y-%m-%d_%H-%M-%S")
    fname = f"{ts}_{session_id}.md"
    return os.path.join(LOG_DIR, fname), True


def count_existing_exchanges(path):
    if not os.path.exists(path):
        return 0
    with open(path) as f:
        content = f.read()
    return content.count("type=PROMPT")


def main():
    payload = json.load(sys.stdin)
    session_id = payload.get("session_id", str(uuid.uuid4()))
    transcript_path = payload.get("transcript_path")
    if not transcript_path or not os.path.exists(transcript_path):
        sys.exit(0)

    entries = read_transcript(transcript_path)
    prompt_text, response_text, model_name = find_last_turn(entries)
    if not prompt_text:
        sys.exit(0)

    now = datetime.datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%S.") + f"{datetime.datetime.utcnow().microsecond // 1000:03d}Z"
    log_path, is_new = session_log_path(session_id, create_new=True)
    exchange_num = count_existing_exchanges(log_path) + 1

    lines = []
    if is_new:
        author = os.environ.get("AGENT_CAPTURE_AUTHOR", "your-github-handle")
        lines.append("---")
        lines.append(f"session_id: {session_id}")
        lines.append(f"date: {datetime.date.today().isoformat()}")
        lines.append(f"author: {author}")
        lines.append(f"model: {model_name or 'unknown'}")
        lines.append("tool: claude-code")
        lines.append("project: amazon-clone-8x")
        lines.append(f"total_exchanges: {exchange_num}")
        lines.append(f"first_prompt_time: {now}")
        lines.append(f"last_prompt_time: {now}")
        lines.append("---")
        lines.append("")
        lines.append(f"# Session Log - {datetime.date.today().isoformat()}")
        lines.append("")
        lines.append(f"Session: `{session_id[:8]}` | Project: `amazon-clone-8x` | Author: `{author}`")
        lines.append("")
        lines.append("---")
        lines.append("")

    lines.append(f"[LOG_ENTRY type=PROMPT num={exchange_num} session={session_id}]")
    lines.append(f"timestamp: {now}")
    lines.append(f"model: {model_name or 'unknown'}")
    lines.append("")
    lines.append(prompt_text)
    lines.append("")
    lines.append("")
    lines.append(f"[LOG_ENTRY type=RESPONSE num={exchange_num} session={session_id}]")
    lines.append(f"timestamp: {now}")
    lines.append(f"model: {model_name or 'unknown'}")
    lines.append("")
    lines.append(response_text)
    lines.append("")
    lines.append("")

    with open(log_path, "a") as f:
        f.write("\n".join(lines))

    sys.exit(0)


if __name__ == "__main__":
    main()
