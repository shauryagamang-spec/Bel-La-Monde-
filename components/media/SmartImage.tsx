import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";

type SmartImageProps = Omit<ImageProps, "fill"> & {
  /** Aspect ratio for the locked frame, e.g. "16/9", "4/5". Kills layout shift. */
  ratio?: string;
  frameClassName?: string;
  /** Scale the image inside the fixed frame on hover (§4.4). */
  hover?: boolean;
};

/**
 * next/image wrapped in a locked-ratio, overflow-hidden frame. AVIF/WebP and
 * blur-up come from next/image; static imports also supply blurDataURL.
 */
export function SmartImage({
  ratio = "16/9",
  frameClassName,
  hover = false,
  className,
  alt,
  sizes,
  ...props
}: SmartImageProps) {
  return (
    <div
      className={cn("relative overflow-hidden", frameClassName)}
      style={{ aspectRatio: ratio }}
    >
      <Image
        alt={alt}
        fill
        sizes={sizes ?? "100vw"}
        className={cn(
          "object-cover",
          hover &&
            "transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform hover:scale-[1.05]",
          className,
        )}
        {...props}
      />
    </div>
  );
}
