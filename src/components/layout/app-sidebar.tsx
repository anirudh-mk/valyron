import {NavMain} from "@/components/layout/nav-main"
import {NavProjects} from "@/components/layout/nav-projects"
import {NavUser} from "@/components/layout/nav-user"
import {TeamSwitcher} from "@/components/layout/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/base/sidebar"
import {sidebarConfig} from "@/shared/config/navigation/sidebar.config.ts";
import type {ComponentProps} from "react";


export function AppSidebar({...props}: ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={sidebarConfig.teams}/>
      </SidebarHeader>
      <SidebarContent>
        <NavMain groups={sidebarConfig.groups}/>
        <NavProjects projects={sidebarConfig.projects}/>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={sidebarConfig.user}/>
      </SidebarFooter>
      <SidebarRail/>
    </Sidebar>
  )
}
