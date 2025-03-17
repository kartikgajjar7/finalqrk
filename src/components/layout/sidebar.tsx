"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Userinfo from "../userinfo";
import { useSidebar } from "@/contexts/sidebar-context";
import { useMediaQuery } from "@/hooks/use-media-query";
import { LogOut, PanelRightClose, PanelRightOpen } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Quark from "../quark";

import { SidebarLink } from "./sidebar-links";
import sidebarLinks from "@/config/sidebar.tsx";
import { MdDashboard } from "react-icons/md";
export const Sidebar = () => {
  const { isCollapsed, toggleSidebar } = useSidebar();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const session = useSession();

  return (
    <aside
      className={`${
        isCollapsed ? "w-16" : "w-56"
      } bg-black transition-all duration-300 flex flex-col h-full pb-0  `}
    >
      <div className="flex justify-between items-center gap-2 pt-4 pb-4 pl-3 pr-0">
        {!isCollapsed && <Userinfo />}
        {!isMobile && (
          <Button
            size="icon"
            onClick={toggleSidebar}
            className="hidden md:flex bg-transparent hover:bg-[#1E1F23] p-1 text-gray-300"
          >
            {isCollapsed ? (
              <PanelRightClose style={{ width: "20px", height: "20px" }} />
            ) : (
              <PanelRightOpen style={{ width: "20px", height: "20px" }} />
            )}
          </Button>
        )}
      </div>
      <nav className="flex-1">
        <ul className="px-2">
          {sidebarLinks.map((link) => (
            <SidebarLink key={link.href} {...link} isCollapsed={isCollapsed} />
          ))}
        </ul>
      </nav>
      <div className="p-4 border-gray-800 border-t">
        <Button
          onClick={async () => await signOut()}
          size="sm"
          className={`mt-2 text-left w-fit bg-transparent text-sm hover:bg-transparent ${
            isCollapsed ? "p-2" : ""
          } text-red-700 `}
        >
          <LogOut size={20} />
          {!isCollapsed && <span className="ml-2">Logout</span>}
        </Button>
      </div>
    </aside>
  );
};
