import { db } from "@/db/db";
import fs from "fs/promises";
import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

// Handle GET request for downloading a product file
export async function GET(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {

  // Fetch product from database using id
  const product = await db.product.findUnique({
    where: { id },
    select: { filePath: true, name: true },
  });

  // If product not found, return 404 page
  if (!product) return notFound();

  // Get file size
  const { size } = await fs.stat(product.filePath);

  // Read file content
  const file = await fs.readFile(product.filePath);

  // Extract file extension (e.g., pdf, jpg)
  const extension = product.filePath.split(".").pop();

  // Send file as downloadable response
  return new NextResponse(file, {
    headers: {
      // Forces download with custom file name
      "Content-Disposition": `attachment; filename="${product.name}.${extension}"`,
      
      // Set file size
      "Content-Length": size.toString(),
    },
  });
}