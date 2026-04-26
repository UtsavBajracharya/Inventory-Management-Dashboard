"use client";

import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapsed, toggleDarkMode } from "@/app/state";
import { Bell, Menu, Moon, Settings, Sun } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );
  
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };

  const handleToggleDarkMode = () => {
    dispatch(toggleDarkMode());
  };

  return (
    <div className="mb-7 flex w-full items-center justify-between">
      <div className="flex items-center justify-between gap-5">
        <button
          className="rounded-full bg-gray-100 px-3 py-3 text-gray-700 transition-colors hover:bg-blue-100 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
          onClick={toggleSidebar}
        >
          <Menu className="h-4 w-4" />
        </button>

        <div className="relative">
          <input
            type="search"
            placeholder="Search"
            className="w-50 rounded-lg border-2 border-gray-300 bg-white py-2 pr-4 pl-10 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-500 md:w-60"
          />

          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Bell className="text-gray-500 dark:text-gray-400" size={20} />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-5">
        <div className="hidden items-center justify-between gap-5 md:flex">
          <div>
            <button onClick={handleToggleDarkMode}>
              {isDarkMode ? (
                <Sun className="cursor-pointer text-gray-500 dark:text-yellow-300" size={24} />
              ) : (
                <Moon className="cursor-pointer text-gray-500 dark:text-gray-300" size={24} />
              )}
            </button>
          </div>

          <div className="relative">
            <Bell className="cursor-pointer text-gray-500 dark:text-gray-300" size={24} />
            <span className="absolute -top-2 -right-2 inline-flex items-center justify-center rounded-full bg-red-400 px-[0.4rem] py-1 text-xs leading-none font-semibold text-red-100">
              3
            </span>
          </div>

          <hr className="mx-3 h-7 w-0 border border-l border-gray-300 dark:border-gray-700" />

          <div className="flex cursor-pointer items-center gap-3">
            <Image
              src="https://s3-inventorymanagement.s3.us-east-2.amazonaws.com/profile.jpg"
              alt="Profile"
              width={50}
              height={50}
              className="h-full rounded-full object-cover"
            />
            <span className="font-semibold text-gray-800 dark:text-gray-100">Utsav</span>
          </div>
        </div>

        <Link href="/settings">
          <Settings className="cursor-pointer text-gray-500 dark:text-gray-300" size={24} />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;