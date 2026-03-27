import { Product } from "@prisma/client";
import { unstable_cache as nextCache } from "next/cache"//!For ServerSide Cacheing
import { cache as reactCache } from "react"//!ForInternalCacheing

type Callback = (...args: unknown[]) => Promise<Product[]>
export function cache<T extends Callback>(
  cb: T,
  keyParts: string[],
  options: { revalidate?: number | false; tags?: string[] } = {}
) {
  return nextCache(reactCache(cb), keyParts, options)
}