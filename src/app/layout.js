import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

export const metadata = {
  title: "School Management System",
  description: "A comprehensive school management system",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
