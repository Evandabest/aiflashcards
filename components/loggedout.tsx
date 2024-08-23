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


export function FloatingDockDemo1() {
  const links = [
    {
      title: "Home",
      icon: (
        <i className='bx bx-home bx-sm' style={{ color: '#ffffff' }}></i>
      ),
      href: "/login",
    },
    {
      title: "Add",
      icon: (
        <i className='bx bx-sm bx-plus' style={{ color: '#ffffff' }} ></i>
      ),
      href: "/login",
    },
    {
      title: "Profile",
      icon: (
        <i className='bx bx-sm bx-user' ></i>
      ),
      href: "/login",
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
