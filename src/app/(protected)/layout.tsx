import { ComponentWrapper } from "@/components/global/componentwrapper";

import { Sidebar } from "@/components/layout/sidebar";
import { SidebarProvider } from "@/contexts/sidebar-context";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Analytics Dashboard | Web Traffic & Insights",
  description:
    "Track and analyze website traffic with detailed insights, user behavior metrics, and performance reports.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <div className="flex bg-[#090909] h-screen overflow-hidden">
        <div className="hidden md:block">
          <Sidebar />
        </div>
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="md:hidden block">navbar</div>
          <main className="flex-1 bg-[#090909]  overflow-y-auto">
            <ComponentWrapper>{children}</ComponentWrapper>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
