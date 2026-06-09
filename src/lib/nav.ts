import {
  Home,
  Camera,
  UtensilsCrossed,
  Activity,
  PlusCircle,
  Info,
  Shield,
  FileText,
  LucideIcon,
} from "lucide-react";

export type NavSectionId = "home" | "scan" | "results" | "profile";

export interface NavSection {
  id: NavSectionId;
  label: string;
  icon: LucideIcon;
}

export const PRIMARY_NAV: NavSection[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "scan", label: "Scan", icon: Camera },
  { id: "results", label: "Plate", icon: UtensilsCrossed },
  { id: "profile", label: "Profile", icon: Activity },
];

export interface DrawerLink {
  id: string;
  label: string;
  description?: string;
  icon: LucideIcon;
  sectionId?: NavSectionId | "about";
  action?: "manual-add";
}

export const DRAWER_LINKS: DrawerLink[] = [
  {
    id: "home",
    label: "Home",
    description: "Overview & stats",
    icon: Home,
    sectionId: "home",
  },
  {
    id: "scan",
    label: "Scan Plate",
    description: "Camera or upload",
    icon: Camera,
    sectionId: "scan",
  },
  {
    id: "results",
    label: "My Plate",
    description: "Nutrition & items",
    icon: UtensilsCrossed,
    sectionId: "results",
  },
  {
    id: "profile",
    label: "Health Profile",
    description: "Diabetic, child, general",
    icon: Activity,
    sectionId: "profile",
  },
  {
    id: "manual",
    label: "Add Item Manually",
    description: "Quick-add for testing",
    icon: PlusCircle,
    action: "manual-add",
  },
  {
    id: "about",
    label: "How It Works",
    description: "AI pipeline & architecture",
    icon: Info,
    sectionId: "about",
  },
];

export const DRAWER_LEGAL: DrawerLink[] = [
  {
    id: "privacy",
    label: "Privacy Policy",
    icon: Shield,
  },
  {
    id: "terms",
    label: "Terms of Service",
    icon: FileText,
  },
];

export const ALL_SECTION_IDS: (NavSectionId | "about")[] = [
  "home",
  "profile",
  "scan",
  "results",
  "about",
];
