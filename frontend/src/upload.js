// Upload function to Cloudinary
export const uploadToCloudinary = async (file, preset) => {
    const data = new FormData();
    data.append('file', file); // Image file
    data.append('upload_preset', preset); // Unsigned preset
  
    try {
      const response = await fetch(
        'https://api.cloudinary.com/v1_1/your-cloud-name/image/upload',
        {
          method: 'POST',
          body: data,
        }
      );
  
      if (!response.ok) {
        throw new Error('Failed to upload image');
      }
  
      const result = await response.json();
      return result.secure_url; // Return the secure URL
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      throw error;
    }
  };
  