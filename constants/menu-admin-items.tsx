import { IoMusicalNoteSharp, IoAlbumsSharp } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { FaMicrophoneLines } from "react-icons/fa6";

export const menuItems = [
  {
    title: "Dashboard",
    icon: <MdDashboard className="w-7 h-7 " />,
    href: "/admin",
  },
  {
    title: "Manage music",
    icon: <IoMusicalNoteSharp className="w-7 h-7" />,
    href: "/admin/songs",
  },
  {
    title: "Manage artist",
    icon: <FaMicrophoneLines className="w-7 h-7" />,
    href: "/admin/artists",
  },
  {
    title: "Manage category",
    icon: <BiSolidCategoryAlt className="w-7 h-7" />,
    href: "/admin/categories",
  },
];
