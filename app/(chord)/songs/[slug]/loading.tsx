import { TbLoader2 } from "react-icons/tb";

export default function PageSlugLoading() {
  return (
    <div className="flex h-[100dvh] items-center justify-center">
      <TbLoader2 className="size-20 animate-spin" />
    </div>
  );
}
