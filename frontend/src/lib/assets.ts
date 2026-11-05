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

/**
 * Comprime y redimensiona una imagen en el navegador a máximo 1600px en WebP/JPEG
 * para que pese entre 50KB y 150KB y quepa sin problemas en el almacenamiento local.
 */
export async function compressImageToDataUrl(file: File, maxDim = 1600, quality = 0.82): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        try {
          const webpData = canvas.toDataURL("image/webp", quality);
          resolve(webpData);
        } catch {
          const jpegData = canvas.toDataURL("image/jpeg", quality);
          resolve(jpegData);
        }
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
}
