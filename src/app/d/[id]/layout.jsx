import "../.././globals.css";
import { Toaster } from "@/components/ui/sonner";
import { AppSidebar } from "@/components/dashboardLayout/app-sidebar";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import SideNavber from "./SidebarInset";

export const metadata = {
  title: "Dashboard",
  description: "A comprehensive school management system",
};

const layout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <SideNavber />
            <main>{children}</main>
          </SidebarInset>

          <Toaster position="top-right" richColors />
        </SidebarProvider>
      </body>
    </html>
  );
};

export default layout;
