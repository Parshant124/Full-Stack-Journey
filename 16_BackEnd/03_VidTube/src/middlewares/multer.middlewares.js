import multer from "multer"
import path from "path"
import fs from "fs"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const tempDir = path.join(process.cwd(), "public", "temp")
fs.mkdirSync(tempDir, { recursive: true })

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, tempDir)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e8)
    cb(null, file.originalname + "-" + uniqueSuffix)
  },
})

export const upload = multer({
  storage,
})
