"use client";

import { usePathname } from "next/navigation";
import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { SidebarMenuSkeleton } from "../skeleton/Sidebar-menu-skeleton";

export function NavMain({ items, loading }) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      {loading ? (
        <>
          <SidebarMenuSkeleton />
        </>
      ) : (
        <>
          {" "}
          <SidebarMenu className={" border-t pt-1 "}>
            {items.map((item) => {
              const isActive = pathname.startsWith(`/${item.url}`);
              if (!item?.title || !item?.url) return null;
              return (
                <Collapsible
                  key={item.title}
                  asChild
                  defaultOpen={item.isActive}
                  className="group/collapsible text-[15px] "
                >
                  <div>
                    {" "}
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <Link href={`/${item.url}`}>
                          <SidebarMenuButton
                            className={`cursor-pointer  ${
                              isActive
                                ? "bg-white  text-black font-semibold shadow-sm "
                                : ""
                            } mb-2 text-md font-light `}
                            tooltip={item.title}
                          >
                            {item.icon && <item.icon />}
                            <span>{item.title}</span>
                          </SidebarMenuButton>
                        </Link>
                      </CollapsibleTrigger>
                    </SidebarMenuItem>
                  </div>
                </Collapsible>
              );
            })}
          </SidebarMenu>
        </>
      )}
    </SidebarGroup>
  );
}
