import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/icon.svg";
import {Button, buttonVariants} from "./Button2";
import { cn } from "../lib/utils";
import { Plus } from 'lucide-react';

const Navbar = () => {
  return (
    <div className="fixed inset-x-0 top-0 z-[10] h-fit border-zinc-300 bg-zinc-100 py-2">
      <div className="container mx-auto flex h-full max-w-7xl items-center justify-between gap-2 ">
        <Link href="/" className="flex items-center gap-2">
          <img
            src={logo}
            alt="news icon"
            className="h-8 w-8 sm:h-6 sm:w-6"
          ></img>
          <p className="hidden text-sm font-medium text-zinc-700 md:block">
            NC News
          </p>
        </Link>

        {/* search bar */}

       <Link href="/sign-in" className={cn(buttonVariants({variant: "default"}))}><Plus className="size-4 mr-1"/><p>Create</p></Link>
      </div>
    </div>
  );
};

export default Navbar;
