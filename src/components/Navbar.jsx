import { Link } from "react-router-dom";
import logo from "../assets/icon.svg";
import { Button, buttonVariants } from "./Button";
import { cn } from "../lib/utils";
import { Plus } from "lucide-react";
import Avatar from "../assets/cat.png";

const Navbar = () => {
  const user = "jessjelly"
  return (
    <div className="fixed inset-x-0 top-0 z-[10] h-fit border-zinc-300 bg-zinc-100 py-2">
      <div className="container mx-auto flex h-full max-w-7xl items-center justify-between gap-2 ">
        <Link to="/" className="flex items-center gap-2">
          <img
            src={logo}
            alt="news icon"
            className="h-8 w-8 sm:h-6 sm:w-6"
          ></img>
          <p className="hidden text-lg font-medium text-zinc-700 md:block">
            NC News
          </p>
        </Link>

     
        <div className="flex items-center justify-between gap-4">
          <Link
            to="/post"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            <Plus className="mr-1 size-4" />
            <p>Create</p>
          </Link>
          <Link to={`/profile/${user}`}>
            <img
              src={Avatar}
              className="border-gray-300-100 w-8 rounded-full border-2 border-solid hover:bg-gray-200"
              alt="avatar"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
