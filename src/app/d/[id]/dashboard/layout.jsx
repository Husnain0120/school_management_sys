import "../../.././globals.css";
import { Toaster } from "@/components/ui/sonner";
import { AppSidebar } from "@/components/dashboardLayout/app-sidebar";

import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

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
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border-b-[2px] shadow">
              <div className="flex items-center gap-2 px-4 ">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="#" className={"text-2xl font-bold"}>
                        Edu Manage
                      </BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem>
                      <BreadcrumbPage>
                        <Badge
                          className={"bg-indigo-500 text-white rounded-full"}
                        >
                          admin
                        </Badge>
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </header>
            <main>{children}</main>
          </SidebarInset>

          <Toaster position="top-right" richColors />
        </SidebarProvider>
      </body>
    </html>
  );
};

export default layout;
