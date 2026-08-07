import {
  AudioWaveform,
  BookOpen,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  TrendingUp,
  ShoppingCart,
  Users,
  Package,
} from "lucide-react"

export const sidebarConfig = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shaedcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: SquareTerminal,
      isActive: false,
      items: [],
    },
    {
      title: "Sales",
      url: "/dashboard/sales/estimate",
      icon: TrendingUp,
      isActive: true,
      items: [
        {
          title: "Estimate",
          url: "/dashboard/sales/estimate",
        },
        {
          title: "Order",
          url: "/dashboard/sales/order",
        },
        {
          title: "Invoice",
          url: "/dashboard/sales/invoice",
        },
        {
          title: "Return",
          url: "/dashboard/sales/return",
        },
      ],
    },
    {
      title: "Purchase",
      url: "/valyron/purchase/invoice",
      icon: ShoppingCart,
      isActive: false,
      items: [
        {
          title: "Invoice",
          url: "/valyron/purchase/invoice",
        },
        {
          title: "Order",
          url: "/valyron/purchase/order",
        },
        {
          title: "Return",
          url: "/valyron/purchase/return",
        },
      ],
    },
    {
      title: "Party",
      url: "/valyron/party/customer",
      icon: Users,
      isActive: false,
      items: [
        {
          title: "Customer",
          url: "/valyron/party/customer",
        },
        {
          title: "Supplier",
          url: "/valyron/party/supplier",
        },
      ],
    },
    {
      title: "Products",
      url: "/valyron/products",
      icon: Package,
      items: [],
    },
    {
      title: "Reports",
      url: "/valyron/reports",
      icon: PieChart,
      items: [],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
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