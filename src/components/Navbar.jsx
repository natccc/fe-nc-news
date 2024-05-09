import { Link } from "react-router-dom";
import logo from "../assets/icon.svg";
import { Button, buttonVariants } from "./Button";
import { cn } from "../lib/utils";
import { Plus } from "lucide-react";
import { useContext } from "react";
import { UserContext } from "../contexts/User";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const { username, avatarUrl } = useContext(UserContext);
  const handleHomeClick = (e) => {
    navigate(`/`);
  };

  return (
    <div className="fixed inset-x-0 top-0 z-[10] h-fit border-zinc-300 bg-zinc-100 py-2">
      <div className="container mx-auto flex h-full max-w-7xl items-center justify-between gap-2 ">
        <div className="flex items-center gap-2 hover:cursor-pointer" onClick={handleHomeClick} >
          <img
            src={logo}
            alt="news icon"
            className="h-8 w-8 object-contain sm:h-6 sm:w-6"
          ></img>
          <p className="hidden text-lg font-medium text-zinc-700 md:block">
            NC News
          </p>
        </div>

        <div className="flex items-center justify-between gap-4">
          <Link to="/t" className={cn(buttonVariants({ variant: "outline" }))}>
            <p>Topics</p>{" "}
          </Link>

          <Link
            to="/submit"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            <Plus className="mr-1 size-4" />
            <p>Create</p>
          </Link>

          <Link to={`/user/${username}`} className={cn(buttonVariants({ variant: "outline" }))}>
            <p>My profile</p>{" "}
          </Link>

          <Link to={`/login`}>
            <img
              src={avatarUrl}
              className="border-gray-300-100 h-10 w-10 rounded-full border-2 border-solid object-contain hover:bg-gray-200"
              alt="avatar"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
