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

export function NavMain({ items }) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarMenu className={" border-t pt-1 "}>
        {items.map((item) => {
          const isActive = pathname.startsWith(`/${item.url}`);
          return (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={item.isActive}
              className="group/collapsible text-[15px] "
            >
              <SidebarMenuItem className={"text-[14px] font-poppins"}>
                <CollapsibleTrigger asChild>
                  <Link href={`/${item.url}`}>
                    <SidebarMenuButton
                      className={`cursor-pointer  ${
                        isActive
                          ? "bg-white  text-black font-semibold shadow-sm "
                          : ""
                      } text-[16.5px] my-2`}
                      tooltip={item.title}
                    >
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </Link>
                </CollapsibleTrigger>
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
