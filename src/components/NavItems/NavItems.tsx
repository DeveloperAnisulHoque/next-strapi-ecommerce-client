"use client";
import Link from "next/link";
import React from "react";
import { commonStyle } from "../Styles";
import { usePathname } from "next/navigation";
import cn from "@/utils/cn";

type NavItemsProps = {
  navList: string[];
};

const NavItems = ({ navList }: NavItemsProps) => {
  const pathName = usePathname();

  return (
    <div className="flex gap-4">
      <Link
        className={cn(`${commonStyle.nav}  `, {
          "bg-indigo-200   font-semibold  rounded-md text-indigo-600":
            pathName == `/`,
        })}
        href={`/`}
      >
        home
      </Link>
      {navList?.map((item, key) => {
        return (
          <Link
            key={key}
            className={cn(`${commonStyle.nav}  `, {
              "bg-indigo-200   font-semibold  rounded-md text-indigo-600":
                pathName == `/${item}`,
            })}
            href={`/${item}`}
          >
            {item}
          </Link>
        );
      })}
    </div>
  );
};

export default NavItems;
