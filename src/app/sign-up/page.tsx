import type { Metadata } from "next";
import { Suspense } from "react";
import { SignUpForm } from "./SignUpForm";

export const metadata: Metadata = {
  title: "Create Account | Amazon Clone",
};

export default function SignUpPage() {
  return (
    <Suspense fallback={null}>
      <SignUpForm />
    </Suspense>
  );
}
