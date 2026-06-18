import {
  Home,
  Camera,
  UtensilsCrossed,
  Activity,
  PlusCircle,
  Shield,
  FileText,
  LucideIcon,
} from "lucide-react";

export type NavPath = "/" | "/scan" | "/results" | "/profile" | "/privacy" | "/terms";

export interface NavSection {
  path: NavPath;
  label: string;
  icon: LucideIcon;
}

export const PRIMARY_NAV: NavSection[] = [
  { path: "/", label: "Home", icon: Home },
  { path: "/scan", label: "Scan", icon: Camera },
  { path: "/results", label: "Plate", icon: UtensilsCrossed },
  { path: "/profile", label: "Profile", icon: Activity },
];

export interface DrawerLink {
  id: string;
  label: string;
  description?: string;
  icon: LucideIcon;
  path?: NavPath;
  action?: "manual-add";
}

export const DRAWER_LINKS: DrawerLink[] = [
  {
    id: "home",
    label: "Home",
    icon: Home,
    path: "/",
  },
  {
    id: "scan",
    label: "Scan plate",
    icon: Camera,
    path: "/scan",
  },
  {
    id: "results",
    label: "My plate",
    icon: UtensilsCrossed,
    path: "/results",
  },
  {
    id: "profile",
    label: "Health profile",
    icon: Activity,
    path: "/profile",
  },
  {
    id: "manual",
    label: "Add item manually",
    icon: PlusCircle,
    action: "manual-add",
  },
];

export const DRAWER_LEGAL: DrawerLink[] = [
  {
    id: "privacy",
    label: "Privacy",
    icon: Shield,
    path: "/privacy",
  },
  {
    id: "terms",
    label: "Terms",
    icon: FileText,
    path: "/terms",
  },
];

export const ALL_PATHS: NavPath[] = [
  "/",
  "/profile",
  "/scan",
  "/results",
];

