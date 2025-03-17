import { RiGitPullRequestFill } from "react-icons/ri";
import { MdDashboard } from "react-icons/md";
import { MdOutlineExplore } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";
import Image from "next/image";
interface SidebarLinkItem {
  href: string;
  icon: React.ComponentType;
  label: string;
  iconColor: string;
  pattern: RegExp;
}

const sidebarLinks: SidebarLinkItem[] = [
  {
    href: "/home",
    icon: MdDashboard,
    label: "Home",
    iconColor: "",
    pattern: /^\/home/,
  },
  {
    href: "/explore",
    icon: MdOutlineExplore,
    label: "Explore",
    iconColor: "#54ffff",
    pattern: /^\/explore/,
  },
  {
    href: "/pullrequests",
    icon: RiGitPullRequestFill,
    label: "PullRequests",
    iconColor: "#fc8c14",
    pattern: /^\/pullrequests/,
  },
  {
    href: "/settings",
    icon: IoSettingsSharp,
    label: "Settings",
    iconColor: "#54ffff",
    pattern: /^\/settings/,
  },
];

export default sidebarLinks;
