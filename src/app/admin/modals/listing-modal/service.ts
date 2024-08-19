export async function postImages(cloudName: any, formData: any) {
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "Post",
        body: formData,
      }
    );
    const data = await res.json();
    const imageUrl=data["secure_url"]
    return imageUrl;
  }
  