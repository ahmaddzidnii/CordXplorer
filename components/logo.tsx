import Link from "next/link";

export const Logo = () => {
  return (
    <Link
      href="/"
      className="font-[800] text-3xl tracking-tighter text-violet-600"
    >
      Cord<span className="text-4xl text-fuchsia-400">X</span>plorer
    </Link>
  );
};
