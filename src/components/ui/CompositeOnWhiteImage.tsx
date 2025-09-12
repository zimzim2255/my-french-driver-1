import React, { useEffect, useState } from "react";

export type CompositeOnWhiteImageProps = React.ImgHTMLAttributes<HTMLImageElement>;

export function CompositeOnWhiteImage(props: CompositeOnWhiteImageProps) {
  const { src, alt, className, style, ...rest } = props;
  const [compositedSrc, setCompositedSrc] = useState<string | null>(null);

  useEffect(() => {
    if (!src) return;

    const img = new Image();
    // Important: allow local images without cross origin; remote might need it but we stick to local assets
    img.onload = () => {
      try {
        const width = img.naturalWidth || img.width;
        const height = img.naturalHeight || img.height;
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          setCompositedSrc(typeof src === "string" ? src : null);
          return;
        }
        // Paint white background then draw original image (respecting alpha)
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL("image/png");
        setCompositedSrc(dataUrl);
      } catch (e) {
        setCompositedSrc(typeof src === "string" ? src : null);
      }
    };
    img.onerror = () => setCompositedSrc(typeof src === "string" ? src : null);
    img.src = typeof src === "string" ? src : "";

    return () => {
      // no-op cleanup
    };
  }, [src]);

  return (
    <img
      src={compositedSrc || (typeof src === "string" ? src : undefined)}
      alt={alt}
      className={className}
      style={style}
      {...rest}
    />
  );
}
