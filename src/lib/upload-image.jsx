import cloudinary from "./cloudinary";

export const UploadImage = async (file, folder) => {
  try {
    // Convert file to buffer
    const buffer = await file.arrayBuffer();

    // Upload directly to Cloudinary using buffer
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "auto",
            folder: folder,
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        )
        .end(Buffer.from(buffer));
    });

    return result;
  } catch (error) {
    throw new Error("Upload failed: " + error.message);
  }
};
