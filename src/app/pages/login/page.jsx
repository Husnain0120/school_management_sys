// ❌ DO NOT use "use client" here

import LoginPage from "@/components/pages-items/LoginPage";
import React from "react";

export const metadata = {
  title: "Login - Student Admission Portal",
  description:
    "Securely log in to your student portal to manage your admission, profile, and application details.",
  keywords: [
    "login",
    "student portal",
    "VU admission",
    "student dashboard",
    "verify account",
  ],
  authors: [{ name: "Husnain Rashid" }],
  creator: "Husnain Rashid",
};

const Page = () => {
  return <LoginPage />;
};

export default Page;
