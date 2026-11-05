import type { NextConfig } from "next";

const basePath = process.env.NODE_ENV === "production" ? "/samm_nailstudio" : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  // Los archivos de /public no reciben el basePath solos: los componentes lo leen de aqui.
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
