import { type FileRouter, createUploadthing } from "uploadthing/next";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  brandImageUploader: f({
    image: { maxFileSize: "2MB" },
  }).onUploadComplete(async ({ metadata, file }) => {}),
  productImageUploader: f({
    image: { maxFileCount: 10, maxFileSize: "4MB" },
  })
    .onUploadError(async ({ error }) => {
      console.log(error);
    })
    .onUploadComplete(async ({ metadata, file }) => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
