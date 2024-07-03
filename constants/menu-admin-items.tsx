import { IoMusicalNoteSharp, IoAlbumsSharp } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { BiSolidCategoryAlt } from "react-icons/bi";

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
    title: "Manage album",
    icon: <IoAlbumsSharp className="w-7 h-7" />,
    href: "/admin/albums",
  },
  {
    title: "Manage Category",
    icon: <BiSolidCategoryAlt className="w-7 h-7" />,
    href: "/admin/categories",
  },
];
