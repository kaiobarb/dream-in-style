import React, { useState, ChangeEvent } from 'react';

const StyleCreate: React.FC = () => {
  const [styleName, setStyleName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<File[]>([]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Add your API integration code here to create the style and upload images
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

        <label htmlFor="category" className="block mb-2">
          Category
        </label>
        <select
          id="category"
          className="border-2 border-gray-300 p-2 mb-4 w-full"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select a category</option>
          {/* Add your categories here */}
          <option value="abstract">Abstract</option>
          <option value="nature">Nature</option>
        </select>

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

        <label htmlFor="images" className="block mb-2">
          Upload Images (10-20)
        </label>
        <input
          id="images"
          type="file"
          className="border-2 border-gray-300 p-2 mb-4 w-full"
          multiple
          accept="image/*"
          onChange={handleFileChange}
        />

        <div className="grid grid-cols-4 gap-4 mb-4">
          {images.map((image, index) => (
            <div key={index} className="border-2 border-gray-300 p-2">
              {image.name}
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
          disabled={!styleName || !category || !description || images.length < 10}
        >
          Create Style
        </button>
      </form>
    </div>
  );
};

export default StyleCreate;
