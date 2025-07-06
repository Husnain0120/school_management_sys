import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

export const metadata = {
  title: "School Management System",
  description: "A comprehensive school management system",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="manifest" href="/manifest.json" />
      <meta name="theme-color" content="#1a1a1a" />

      <body>
        <main>{children}</main>

        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
