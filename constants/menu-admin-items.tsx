import { IoMusicalNoteSharp, IoAlbumsSharp } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { FaMicrophoneLines } from "react-icons/fa6";

export const menuItems = [
  {
    title: "Dashboard",
    icon: <MdDashboard className="h-7 w-7" />,
    href: "/admin",
  },
  {
    title: "Manage music",
    icon: <IoMusicalNoteSharp className="h-7 w-7" />,
    href: "/admin/songs",
  },
  {
    title: "Manage artist",
    icon: <FaMicrophoneLines className="h-7 w-7" />,
    href: "/admin/artists",
  },
  {
    title: "Manage genres",
    icon: <BiSolidCategoryAlt className="h-7 w-7" />,
    href: "/admin/genres",
  },
];
