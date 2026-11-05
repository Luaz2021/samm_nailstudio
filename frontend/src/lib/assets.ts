/**
 * Helper para resolver rutas de assets estaticos alojados en /public,
 * garantizando compatibilidad tanto en desarrollo local como en produccion con basePath
 * (como GitHub Pages) y respetando URLs externas absolutas (Unsplash, Cloudinary, etc.).
 */
export function getAssetPath(path: string | undefined | null): string {
  if (!path) return "";
  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("data:") ||
    path.startsWith("blob:")
  ) {
    return path;
  }

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${basePath}${cleanPath}`;
}
