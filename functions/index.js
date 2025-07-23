const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cloudinary = require("cloudinary").v2
admin.initializeApp();

cloudinary.config({
  cloud_name: "ddvf141hb",
  api_key: "627784367818346",
  api_secret: "luIwzx9FLarg2DAPTbhklCWs3PU"
});

exports.deleteAllPhotos = functions.https.onCall(async (data, context) => {
  const db = admin.database();
  const snapshot = await db.ref("locations").once("value");
  const deletions = [];

  snapshot.forEach(child => {
    const publicId = child.val().publicId;
    if (publicId) {
      deletions.push(cloudinary.uploader.destroy(publicId));
    }
  });

  await Promise.all(deletions);
  await db.ref("locations").remove();
  return { success: true };
});

