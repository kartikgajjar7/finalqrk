import React from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useSession } from "next-auth/react";
import { useSidebar } from "@/contexts/sidebar-context";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
export default function Userinfo() {
  const { isCollapsed, toggleSidebar } = useSidebar();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const session = useSession();
  return (
    <div
      className={`flex items-center w-[144px]  ${
        isCollapsed ? "justify-center" : "space-x-3"
      }`}
    >
      <Avatar>
        <AvatarImage
          src={session?.data?.user?.image ?? "/avatar.png"}
          alt="User"
        />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
      {!isCollapsed && (
        <div className="flex-1 min-w-0">
          <p className="font-medium text-white text-sm truncate">
            {session?.data?.user?.name || "N/A"}
          </p>
          <p className="text-gray-400 text-xs truncate">
            {session?.data?.user?.email || "N/A"}
          </p>
        </div>
      )}
    </div>
  );
}
