"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // Optionally redirect after few seconds if needed
    // setTimeout(() => router.push('/'), 10000);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-6">
      <div className="bg-white shadow-2xl rounded-2xl p-10 max-w-2xl w-full text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-700 mb-4">
          🎉 Form Submitted Successfully!
        </h1>
        <p className="text-gray-600 text-lg mb-6">
          Thank you for submitting the admission form.
        </p>
        <div className="text-md text-gray-700 leading-7">
          We have received your information. Our admission team will review your
          application and get back to you within{" "}
          <strong className="text-blue-600">7 days</strong>.
          <br />
          <br />
          Please wait for an email on the address you provided during the form
          submission.
        </div>

        <button
          onClick={() => router.push("/")}
          className="mt-8 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-all duration-300"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
