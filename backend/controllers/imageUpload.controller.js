import bucket from "../firebase.js";

export const uploadImage = async (imageBase64, id) => {
  try {
    const base64Image = imageBase64.split(';base64,').pop();
    const buffer = Buffer.from(base64Image, 'base64');
    const fileName = `image/${id}.png`;
    const file = bucket.file(fileName);

    await file.save(buffer, {
      metadata: {
        contentType: 'image/png',
      },
      public: true,
    })

    const imageUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`
    return imageUrl

  } catch (error) {
    console.error('Error uploading image:', error);
    throw new Error('Failed to upload image');
  }
} 