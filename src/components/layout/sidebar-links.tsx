import Link from "next/link";
import localFont from "next/font/local";

import { usePathname } from "next/navigation";
const abc = localFont({
  src: "../../../public/atl.woff2",
});
export const hexToRGBA = (hex: string, opacity: number): string => {
  hex = hex.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

interface SidebarLinkProps {
  href: string;
  icon: React.ComponentType;
  label: string;
  isCollapsed: boolean;
  iconColor: string;
  pattern: RegExp;
}

export const SidebarLink = ({
  href,
  icon,
  label,
  isCollapsed,
  iconColor,
  pattern,
}: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive = pattern.test(pathname);
  const IconComponent = icon;
  return (
    <li className="p-0">
      <Link
        href={href}
        className={`flex  items-center  rounded-lg text-sm  ${
          isCollapsed ? "justify-center" : "space-x-3 pl-2"
        }
          ${
            isActive
              ? `text-3xl text-[#f1f1ff]`
              : "text-[#9F9E9F]  hover:bg-[#black]"
          }
          transition-colors duration-200
        `}
        style={
          isActive ? { backgroundColor: hexToRGBA(iconColor, 0.15) } : undefined
        }
      >
        <IconComponent className="w-6 h-10" />
        {!isCollapsed && (
          <span
            className="font-[.8125rem] font-bold"
            style={{
              color: isActive ? "#f1f1ff" : undefined,
            }}
          >
            {label}
          </span>
        )}
      </Link>
    </li>
  );
};
