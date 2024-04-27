const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const sourceDir = path.resolve(__dirname, "src/public/images");
const destinationDir = path.resolve(__dirname, "dist/images");

if (!fs.existsSync(destinationDir)) {
  fs.mkdirSync(destinationDir, { recursive: true });
}

const processImage = async (imagePath) => {
  const imageName = path.basename(imagePath, path.extname(imagePath));
  const imageDir = path.dirname(imagePath).replace(sourceDir, destinationDir);

  if (!fs.existsSync(imageDir)) {
    fs.mkdirSync(imageDir, { recursive: true });
  }

  await Promise.all([
    sharp(imagePath)
      .resize(800)
      .toFormat("webp")
      .toFile(path.join(imageDir, `${imageName}-large.webp`)),

    sharp(imagePath)
      .resize(480)
      .toFormat("webp")
      .toFile(path.join(imageDir, `${imageName}-small.webp`)),
  ]);
};

const processImagesInDir = async (dirPath) => {
  const items = fs.readdirSync(dirPath);

  for (const item of items) {
    const itemPath = path.join(dirPath, item);
    const stat = fs.statSync(itemPath);

    if (stat.isDirectory()) {
      await processImagesInDir(itemPath);
    } else if (item.endsWith(".png") || item.endsWith(".jpg")) {
      await processImage(itemPath);
    }
  }
};

processImagesInDir(sourceDir)
  .then(() => console.log("Image processing completed."))
  .catch((err) => console.error("Error processing images:", err));
