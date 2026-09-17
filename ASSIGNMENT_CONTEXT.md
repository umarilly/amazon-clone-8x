# 8x Assignment Context

This is a timed take-home assignment for 8x (Software Engineer role): rebuild a product
from a live reference in 24 hours. Chosen brief: **Amazon.com**. Judged on speed,
product judgement (what got built first, what was deliberately left out), and UX/UI
quality.

## Rules

- Never run any git command yourself (no init, add, commit, push). The human runs git,
  always. Just build files.
- Never edit, delete, or "clean up" anything in `.agent-logs/` after the fact. It is
  already set up and working (Stop hook in `.claude/settings.json` ->
  `.claude/hooks/capture.py`). Leave it alone.
- Never add `.agent-logs/` to `.gitignore`. It ships with the repo, committed. This has
  come up before and the answer is always no.

## First, before anything else: verify the capture hook

`.agent-logs/` is currently empty (intentionally cleared for a clean start). Before
building anything:

1. State your tool (Claude Code), model, and confirm the mechanism
   (`.claude/settings.json` Stop hook -> `.claude/hooks/capture.py`, reads
   `transcript_path` on the `Stop` event).
2. Note `.agent-logs/` was intentionally cleared and this session starts the capture
   record fresh - say so explicitly, it's a deliberate clean start, not concealment.
3. Ask the human to send the canary: `CAPTURE TEST — 8x assignment, Muhammad Umar`
4. Confirm a complete PROMPT + RESPONSE pair lands in `.agent-logs/`. If the response is
   empty, wait a couple seconds and check again (known transcript-flush delay, already
   handled by a retry in the script, but not instant).
5. Create `CAPTURE-TEST.md` (tool/model, mechanism, config file, log path, the canary
   entry pasted raw). Only then proceed.

---

## Bar to hit: this needs to be the best submission 8x has seen

Not "a working clone" - a standout one. Speed and completeness alone don't win this;
polish and product judgement do. Concretely:

- Every screen in scope should feel finished, not just functional: real loading states
  (skeletons, not blank flashes), real empty states (empty cart, no search results),
  real error states (failed add-to-cart, invalid form input) - not happy-path-only.
- Micro-interactions matter: hover states on product cards, a visible cart-count bump
  animation on add-to-cart, smooth transitions between filter states, disabled-button
  states that are actually styled as disabled, not just inert.
- Performance is part of UX grading: optimize images (Next/Image, proper sizing),
  avoid layout shift, keep interactions snappy - a fast clone reads as more credible
  than a sluggish one, independent of feature count.
- Fewer features done exceptionally beats more features done roughly. If a milestone
  in section 4 is running short on time, cut the NEXT milestone, don't ship the current
  one half-finished - this is the product-judgement axis they explicitly grade on.
- The narrated walkthrough video is part of the deliverable, not an afterthought:
  it should explain WHY things were built in this order and what was deliberately
  left out and why - that reasoning is graded as much as the UI itself.
- Code quality counts even under time pressure: consistent component structure,
  no dead code left in from experimentation, sensible naming - a reviewer opening the
  repo should see a deliberate build, not a rushed one.

## Process: Agile, not waterfall

Given the 24-hour clock, run this as short, real iterations - not one long
requirements phase followed by one long build phase:

- Treat each milestone in section 4 as a sprint: plan it in a sentence or two, build
  it, manually verify it against its acceptance criteria, deploy it, THEN move on.
  Never batch multiple milestones' work before checking any of them.
- Keep a lightweight backlog mindset: the milestone order below is the priority order
  (highest product value first) - if time runs out, whatever hasn't been started yet
  is what gets cut, and that should be a visible, deliberate decision, not a surprise.
- After each milestone, do a fast self-retro before starting the next: did this take
  longer or shorter than expected, does that change what's realistic to finish, does
  the remaining scope need to shrink. Say this out loud when it happens, don't just
  silently fall behind.
- Prefer a thin vertical slice over a thick horizontal layer: get one product all the
  way from homepage to checkout working early (even with minimal styling), then go
  back and raise the polish bar across all screens - this de-risks the deadline far
  better than perfecting the homepage while checkout doesn't exist yet.

## 1. Detailed requirements and acceptance criteria

**User journeys to support:**

- Guest browsing: land on homepage -> browse by category or search -> view product
  detail -> add to cart -> prompted to sign in at checkout.
- Registered flow: sign up or sign in -> browse/search -> product detail -> cart ->
  checkout (address -> mocked payment -> confirmation).

**User roles:** guest (browse + cart, cannot complete checkout) and registered user
(full flow). No admin/seller role - that's explicitly out of scope.

**Feature behavior:**

- Search: text query against the mock catalog, returns matching products by
  name/category/description. Empty-results state must be handled, not blank.
- Category browsing: filter by category, and within a category, filter by price range
  and minimum rating.
- Product grid: pagination or infinite scroll, product card shows image, name, price,
  rating stars, "Add to Cart" affordance.
- Product detail: image gallery (even if just 1-3 mock images per product), title,
  price, star rating with review count, description, quantity selector, Add to Cart,
  a reviews section (display only - writing reviews is out of scope).
- Cart: line items with quantity editable (+/-), remove item, running subtotal, empty-
  cart state, "Proceed to Checkout" disabled or redirecting-to-login if guest.
- Checkout: address form -> order summary review -> mocked "Place Order" (no real
  payment gateway) -> confirmation page with a mock order number.
- Auth: sign up (name/email/password, no real verification) and sign in, session
  persisted so cart/checkout gating works.

**Edge cases to handle, not ignore:**

- Empty cart: checkout button disabled or shows an empty-state message, not a broken
  page.
- Guest attempts checkout: redirect to sign in, return to checkout after.
- Search with no matches: explicit "no results" state, not a blank grid.
- Invalid quantity input on product/cart pages: clamp to valid range (min 1), don't
  crash or allow negative/zero.
- Out-of-stock (if modeled in mock data at all): Add to Cart disabled, clearly labeled.

**Performance, accessibility, security expectations (right-sized for a 24h clone, not
enterprise-grade):**

- Responsive at mobile, tablet, and desktop breakpoints - this is graded on UX/UI, not
  optional.
- Semantic HTML, alt text on product images, keyboard-navigable primary flows (search,
  add to cart, checkout form).
- Auth can be simplified/mocked (see architecture section) - do not spend scarce time
  building production-grade security for a demo that explicitly excludes real payments.

**Acceptance criteria, examples (write more like these as you build, don't skip this):**

- "A user can search for a product by name and see matching results from the mock
  catalog within the same page, no reload."
- "A user can add a product to their cart from both the product grid and the product
  detail page, and the cart icon count updates immediately."
- "A guest cannot reach the payment/confirmation step of checkout without being
  redirected to sign in first."
- "The checkout flow completes end to end with mock data and reaches a confirmation
  screen showing an order number."

## 2. UX/UI analysis and design

**Source of truth:** the real amazon.com, as actually browsed and screenshotted before
writing code (per the assignment's own instruction to use the product first). Base
visual decisions on what was actually seen, not on assumption or memory of Amazon from
before this session.

**Design direction to replicate (the recognizable parts, not pixel-perfect):**

- Header: logo, prominent search bar, account/sign-in, cart icon with item count,
  sticky on scroll.
- Category navigation: a horizontal bar or dropdown under/in the header.
- Homepage: hero/deals banner area, multiple product carousels or grids grouped by
  category.
- Product card: image, name (truncated), price prominent, star rating, consistent
  card sizing across the grid.
- Product detail: image gallery on one side, buy-box-style panel (price, quantity,
  Add to Cart) on the other, description and reviews below.
- Color/typography: Amazon's actual palette (dark header, orange accent for primary
  actions, white content area) - confirm exact shades from the real screenshots taken,
  don't guess.

**Responsive behavior:** header collapses to a hamburger/simplified search on mobile,
product grid reflows from multi-column to single/double column, buy-box panel stacks
below images on mobile instead of beside them.

**Usability checkpoints before calling a screen done:** can a first-time user find
search within 2 seconds of landing; is the current step in checkout always clear; does
the cart update give visible feedback (not a silent state change).

## 3. System architecture and technical design

**Frontend/backend boundary:** Next.js App Router. Server Components for
data-fetching-heavy pages (homepage, search results, product detail). Client
Components only where interactivity requires it (cart state, quantity selectors,
checkout form, auth forms).

**Data layer - kept intentionally simple for a 24h scope:** a seeded mock product
catalog (JSON or a small SQLite file via Prisma if time allows, plain JSON in
`/data` if not - JSON is the safer default given the clock). Do not attempt to
integrate a real product database or external API; the catalog is mock data written
to look like real Amazon listings (real-sounding names, prices, categories, images
sourced as placeholders or freely-usable stock images).

**API design:** Next.js Route Handlers - `/api/products` (list + search/filter query
params), `/api/products/[id]`, `/api/cart` (session-scoped, add/update/remove),
`/api/auth/*` (sign up/sign in), `/api/checkout` (accepts an order, returns a mock
confirmation, no real payment processor call).

**Auth:** simplified/mocked - a basic credentials-based session (e.g. NextAuth
Credentials provider backed by the mock user store, or an even simpler signed cookie
if that's faster to ship correctly). State explicitly in the walkthrough that this is
intentionally minimal because real production auth and payment security are out of
scope for a demo clone.

**Deployment:** Vercel, single environment (no staging/prod split needed for a demo of
this scope) - deploy early and often so there's always a working live link, not just
at the very end.

**Explicitly not part of the architecture:** no real payment gateway integration, no
recommendation engine, no seller-side systems, no order-tracking backend.

## 4. Implementation planning and setup

**Milestones, in this order (each should be a working, demoable increment, not a
half-built pile at the end):**

1. Project scaffold: Next.js + TypeScript + Tailwind, repo structure, mock catalog
   data, deployed to Vercel showing a blank/skeleton homepage (proves the pipeline
   works before building features into it).
2. Homepage with real layout and mock product data rendering.
3. Search + category/price/rating filtering.
4. Product detail page.
5. Cart (client state, or server-persisted if time allows).
6. Checkout flow (address -> mock payment -> confirmation), gated by auth.
7. Auth (sign up/sign in) wired into the checkout gate.

**Repo structure suggestion:** `app/` (routes), `components/` (shared UI), `lib/`
(data access, cart/session helpers), `data/` (mock catalog), `.agent-logs/` and
`.claude/` (already set up, do not touch).

**Review cadence:** given the compressed timeline, treat every milestone completion as
a natural checkpoint to pause and confirm scope is still on track, rather than a fixed
schedule.

## 5. Iterative development and integration

Build one milestone fully (including basic manual verification) before starting the
next, rather than half-building several screens in parallel. Keep the app in a
deployable state after each milestone - the live link should improve incrementally,
not sit broken until the very end. Flag and resolve blockers immediately rather than
working around them silently; if a scope question comes up that isn't answered above,
ask rather than guessing.

## 6. Testing and quality assurance

Given the 24-hour window, this is deliberately scoped to manual verification, not a
full automated suite - name that tradeoff explicitly rather than pretending otherwise:

- Walk every core journey manually after it's built: search -> product -> cart ->
  checkout -> confirmation, both as a guest (gets redirected appropriately) and as a
  signed-in user (completes the flow).
- Check responsive layout at three real breakpoints (not just resizing a desktop
  browser slightly - use actual mobile/tablet widths).
- Check for broken images, dead links, and console errors on every page before
  considering a milestone done.
- Basic accessibility pass: keyboard-only navigation through search and checkout,
  alt text present, sufficient color contrast on primary actions.
- If time genuinely allows once the core flow is solid, a small number of automated
  smoke tests (e.g. Playwright hitting the main journey) are a good use of remaining
  time - but a fully working manual-tested app beats a partially-built app with tests.

---

## Start

Do the capture-hook verification first (above). Then build in the milestone order in
section 4, checking testing/QA items from section 6 as each milestone completes. Ask
before making any scope decision not already covered in this document.
