import React, { useCallback, useReducer, useState } from "react";
import ImageViewer from "react-simple-image-viewer";

import { Skeleton } from "@/components/ui/skeleton";

interface PreviewImageProps {
  images: string[];
  onError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

const PreviewImage = React.memo(({ images, onError }: PreviewImageProps) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [isError, setIsError] = useState(false);

  const openImageViewer = useCallback((index: number) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setIsError(true);
    onError && onError(e);
  };

  return (
    <div>
      {images?.length > 0 ? (
        images.map((src, index) => (
          <img
            onError={handleImageError}
            onLoad={() => {
              isError && setIsError(false);
            }}
            src={src}
            onClick={() => !isError && openImageViewer(index)}
            className="aspect-square rounded-lg size-36 cursor-pointer"
            key={index}
            alt={`Image ${index}`}
          />
        ))
      ) : (
        <FallbackImage />
      )}

      {isViewerOpen && (
        <ImageViewer
          src={images}
          currentIndex={currentImage}
          disableScroll={false}
          closeOnClickOutside={true}
          onClose={closeImageViewer}
        />
      )}
    </div>
  );
});

function FallbackImage() {
  return <Skeleton className="animate-none aspect-square rounded-lg size-36" />;
}

export { PreviewImage };
