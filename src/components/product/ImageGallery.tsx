"use client";

import Image from "next/image";
import { useState } from "react";

export function ImageGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [selected, setSelected] = useState(0);

  return (
    <div className="flex flex-col gap-3 sm:flex-row-reverse">
      <div className="relative aspect-square w-full overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
        <Image
          src={images[selected]}
          alt={alt}
          fill
          loading="eager"
          fetchPriority="high"
          sizes="(max-width: 640px) 100vw, 480px"
          className="object-cover"
        />
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 sm:flex-col">
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => setSelected(index)}
              aria-label={`Show image ${index + 1} of ${images.length}`}
              aria-pressed={index === selected}
              className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-md border-2 bg-gray-50 ${
                index === selected ? "border-link" : "border-transparent"
              }`}
            >
              <Image
                src={image}
                alt=""
                fill
                sizes="64px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
