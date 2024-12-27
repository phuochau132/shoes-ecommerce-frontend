import { RcFile } from 'antd/es/upload';

export const uploadFile = async ({ file }: { file: RcFile }) => {
  const formData = new FormData();

  // Cloudinary upload preset and cloud name
  const cloudName = import.meta.env.VITE_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET;

  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);
  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: formData
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Upload to Cloudinary failed', error);
  }
};
