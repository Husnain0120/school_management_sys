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

      <body>
        <main>{children}</main>

        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
