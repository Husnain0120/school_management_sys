import cloudinary from "./cloudinary";
import fs from "fs";
import path from "path";

export const UploadImage = async (file, folder) => {
  const uploadPath = path.join(process.cwd(), "uploads", file.name);

  // 1️⃣ Write the file locally
  const buffer = await file.arrayBuffer();
  fs.writeFileSync(uploadPath, Buffer.from(buffer));

  try {
    // 2️⃣ Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "auto",
          folder: folder,
        },
        (error, result) => {
          if (error) return reject(error);
          return resolve(result);
        }
      );

      fs.createReadStream(uploadPath).pipe(uploadStream);
    });

    return result;
  } catch (error) {
    throw new Error("Cloudinary Upload Failed: " + error.message);
  } finally {
    // 3️⃣ Always delete the local file
    fs.unlink(uploadPath, (err) => {
      if (err) console.error("Error deleting temp file:", err.message);
      else console.log("🗑️ Temp file deleted:", uploadPath);
    });
  }
};
