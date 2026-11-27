/* eslint-disable @next/next/no-img-element */
/**
 * A plain <img> for the static export. Images are not optimised on Hostinger
 * anyway (images.unoptimized), and next/image adds inline style attributes
 * to every image; this keeps the HTML clean.
 * `fill` makes the image cover its positioned parent.
 */
export default function Img({
    src,
    alt,
    fill,
    priority,
    sizes,
    width,
    height,
    className = "",
    ...rest
}: {
    src: string;
    alt: string;
    fill?: boolean;
    priority?: boolean;
    sizes?: string;
    width?: number;
    height?: number;
    className?: string;
} & Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src" | "alt" | "width" | "height">) {
    return (
        <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            sizes={sizes}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            {...(priority ? { fetchPriority: "high" as const } : {})}
            className={`${fill ? "absolute inset-0 h-full w-full " : ""}${className}`}
            {...rest}
        />
    );
}
