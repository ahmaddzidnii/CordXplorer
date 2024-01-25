import Link from "next/link";

export const Logo = () => {
  return (
    <Link
      href="/"
      className="font-[800] text-3xl tracking-tighter"
    >
      Cord<span className="text-4xl">X</span>plorer
    </Link>
  );
};
