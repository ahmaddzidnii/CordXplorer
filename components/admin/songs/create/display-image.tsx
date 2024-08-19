import Image from "next/image";

export const DisplayImage = ({ imgUrl }: { imgUrl?: string }) => {
  return (
    <>
      {!imgUrl && (
        <div className="flex aspect-square w-full items-center justify-center rounded-sm shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
          <span className="text-xl font-extrabold text-muted-foreground">
            NO IMG LOADED
          </span>
        </div>
      )}

      {imgUrl && (
        <div className="relative aspect-square w-full overflow-hidden rounded-sm shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
          <Image
            fill
            className="object-cover"
            src={imgUrl}
            alt="preview-cover"
          />
        </div>
      )}
    </>
  );
};
