export function getImageSrc(
  img: string | File | null | undefined,
  fallback: string
): string {
  if (!img) return fallback;

  if (typeof img !== 'string' && img instanceof File) {
    return URL.createObjectURL(img);
  }

  if (typeof img === 'string') return img;

  return fallback;
}
