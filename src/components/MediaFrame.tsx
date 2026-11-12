import Image from "next/image";
import type { MediaItem } from "../config/site";

/**
 * Fills its box with a photo or video. Boxes are given the media's own shape
 * (aspect-ratio from `w`/`h` in the config), so filling = showing the whole
 * picture with nothing cut off and no empty padding.
 *
 * `fit="contain"` is for the rare box that can't take the photo's shape (the
 * full-screen hero halves): the whole photo is shown and the box's own
 * background shows around it.
 */
export default function MediaFrame({
  item,
  className = "",
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
  fit = "fill"
}: {
  item: MediaItem;
  className?: string;
  priority?: boolean;
  sizes?: string;
  fit?: "fill" | "contain";
}) {
  const objectFit = fit === "contain" ? "object-contain" : "object-cover";

  if (item.type === "video") {
    return (
      <video
        // React doesn't always render the `muted` attribute, and iOS Safari
        // refuses to autoplay unless the element is actually muted.
        ref={(el) => {
          if (el) {
            el.muted = true;
            el.defaultMuted = true;
          }
        }}
        className={`h-full w-full ${objectFit} ${className}`}
        src={item.path}
        autoPlay
        muted
        loop
        playsInline
        disablePictureInPicture
        preload="auto"
        aria-label={item.alt}
      />
    );
  }

  return (
    <Image
      src={item.path}
      alt={item.alt}
      fill
      sizes={sizes}
      priority={priority}
      className={`${objectFit} ${className}`}
    />
  );
}
