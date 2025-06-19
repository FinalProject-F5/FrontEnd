export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = error => reject(error);
  });
}

export async function buildExperiencePayload(data) {
  let images = [];
  if (data.images && data.images.length > 0) {
    images = await Promise.all(
      Array.from(data.images).map(async (file) => ({
        base64: await fileToBase64(file),
        name: file.name,
        type: file.type,
        size: file.size,
      }))
    );
  }
  return {
    ...data,
    images,
  };
}
