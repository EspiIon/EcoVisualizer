import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fixe la racine du workspace (un lockfile pnpm existe dans un dossier parent).
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
