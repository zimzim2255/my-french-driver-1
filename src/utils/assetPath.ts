import { getAssetPath } from "./assetPath";
export function getAssetPath(path: string): string {
  // Remove any leading /src/assets/ or /assets/ and ensure clean path
  const cleanPath = path.replace(/^\/?(src\/)?assets\//, '');
  // Prefix with Vite base URL so it works under GitHub Pages subpath
  const base = (import.meta as any).env?.BASE_URL || '/';
  return `${base}assets/${cleanPath}`;
}

export default getAssetPath;
