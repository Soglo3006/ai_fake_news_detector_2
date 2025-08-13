import * as React from "react"
import { MessageSquare, LogOut } from "lucide-react";
import { SidebarMenuButton } from "@/components/ui/sidebar"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Statistiques",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Analyse effectué",
        },
        {
          title: "Fake news détéectés",
        },
        {
          title: "Précision moyen",
        },
      ],
    },
    {
      title: "Historique",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Paramètres",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Compte Utilisateur",
          url: "#",
        },
        {
          title: "Préférences d'affichage",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({SetshowFeedback,...props},) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavUser user={data.user} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter>
        <SidebarMenuButton
          onClick={() => SetshowFeedback(true)}
          tooltip="Envoyer un feedback"
          className="w-full bg-blue-600 text-white hover:bg-blue-700 font-semibold"
        >
          <MessageSquare />
          <span>Envoyer un feedback</span>
        </SidebarMenuButton>
        <SidebarMenuButton
          tooltip="Déconnexion"
          className="w-full bg-red-600 text-white hover:bg-red-700 font-semibold"
        >
          <LogOut />
          <span>Déconnexion</span>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}
