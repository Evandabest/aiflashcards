"use client"
import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconBrandGithub,
  IconBrandX,
  IconExchange,
  IconHome,
  IconNewSection,
  IconTerminal2,
} from "@tabler/icons-react";
import 'boxicons/css/boxicons.min.css';


export function FloatingDockDemo() {
  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/home",
    },
    {
      title: "Add",
      icon: (
        <IconNewSection className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/add",
    },
    {
      title: "Profile",
      icon: (
        <i className='bx bx-sm bx-user' ></i>
      ),
      href: "/profile",
    }
  ];
  return (
    <div className="flex items-center justify-center w-full">
      <FloatingDock
        items={links}
      />
    </div>
  );
}
