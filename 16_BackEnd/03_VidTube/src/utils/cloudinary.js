import { v2 as cloudinary } from "cloudinary"
import fs from "fs"

const uploadOnCloudinary = async (localFilePath) => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    })

    if (!localFilePath) return null

    const response = await cloudinary.uploader
      .upload(localFilePath, {
        resource_type: "auto",
      })
      .catch((error) => {
        console.log("File uploading error", error)
      })

    fs.unlinkSync(localFilePath)

    console.log("Cloudinary : ", response)

    return response
  } catch (error) {
    console.log("File uploading errorsss : ", error)
    fs.unlinkSync(localFilePath)
    return null
  }
}

const deleteFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId)    
    console.log("Deleted from cloudinary, Public id : ",publicId)
  } catch (error) {
    console.log("Error deleting from cloudinary", error)
    return null
  }
}

export { uploadOnCloudinary, deleteFromCloudinary }
