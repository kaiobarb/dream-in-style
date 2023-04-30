import axios from 'axios';
import React, { useState, ChangeEvent } from 'react';

const StyleCreate: React.FC = () => {
  const [styleName, setStyleName] = useState('');
  const [keywords, setKeywords] = useState('');
  const [description, setDescription] = useState('');
  const [zipFile, setZipFile] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setZipFile(e.target.files ? e.target.files[0] : null);
  };

  const handleUpload = async (zipFile: File): Promise<string> => {
    const formData = new FormData();
    formData.append('zipFile', zipFile);
    const response = await axios.post('/api/image/archive', formData);
  
    return response.data.serving_url;
  };
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!zipFile) return;
    let servingUrl = '';

    try {
      console.log('uploading image archive');
      servingUrl = await handleUpload(zipFile);

      try {
        const response = await axios.post('/api/style/create', {
          styleName,
          keywords,
          description,
          servingUrl,
        });

        console.log('Style created:', response.data);
      } catch (error: any) {
        console.error('Error creating style:', error.message);
      }
    } catch (error: any) {
      console.error('Error uploading image archive: ', error.message);
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl mb-6">Create a New Style</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="styleName" className="block mb-2">
          Style Name
        </label>
        <input
          id="styleName"
          type="text"
          className="border-2 border-gray-300 p-2 mb-4 w-full"
          value={styleName}
          onChange={(e) => setStyleName(e.target.value)}
        />

        <label htmlFor="description" className="block mb-2">
          Description
        </label>
        <textarea
          id="description"
          className="border-2 border-gray-300 p-2 mb-4 w-full"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <label htmlFor="category" className="block mb-2">
          Keywords
        </label>
        <input
          id="category"
          className="border-2 border-gray-300 p-2 mb-4 w-full"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
        >
        </input>

        <label htmlFor="zip" className="block mb-2">
          Upload Zip Folder with Images
        </label>
        <input
          id="images"
          type="file"
          className="border-2 border-gray-300 p-2 mb-4"
          accept="application/zip"
          onChange={handleFileChange}
        />

        <button
          type="submit"
          className="block bg-blue-500 text-white py-2 px-4 rounded"
          disabled={!styleName || !keywords || !description || !zipFile}
        >
          Create Style
        </button>
      </form>
    </div>
  );
};

export default StyleCreate;
