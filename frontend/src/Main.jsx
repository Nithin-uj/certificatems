import React, { useState } from 'react';
import axios from 'axios';

const ImageUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    // Generate a data URL for the preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('File uploaded successfully', response.data);
    } catch (error) {
      console.error('Error uploading file', error);
    }
  };

  return (
    <div>
      <h3>Upload an Image</h3>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {imagePreview && <img src={imagePreview} alt="Preview" style={{ maxWidth: '200px' }} />}
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default ImageUploader;
