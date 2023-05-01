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
      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-3">
          Fill out the form to create a new style. You will need to upload a zip file containing the images to train the dreambooth model.
          <br />
          <br />
          <b>Style Name</b> - Choose a descriptive name that encapsulates the style.
          <br /><i className='text-gray-400'> "Abstract Geometric"</i>
          <br />
          <br />
          <b>Description</b> - Describe the main characteristics of the style.
          <br /><i className='text-gray-400'> "This style is characterized by abstract shapes and bright colors."</i>
          <br />
          <br />
          <b>Keywords</b> - Comma separated. Used to help users find the style in the gallery.
          <br /><i className='text-gray-400'> "abstract, colorful, geometric"</i>
          <br />
          <br />
          <b>Image Archive</b> - A zip file containing the images to train the dreambooth model. The archive should <i>only</i> contain images.
          <br /><i className='text-gray-400'> It is recomended to include 10-20 images</i>
        </div>
        <div className="sm:col-span-3">
          <form onSubmit={handleSubmit}>
            <label htmlFor="styleName" className="block text-sm font-medium leading-6 mb-2">
              Style Name
            </label>
            <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
              <input
                id="styleName"
                type="text"
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                value={styleName}
                onChange={(e) => setStyleName(e.target.value)}
              />
            </div>

            <label htmlFor="description" className="block text-sm font-medium leading-6 mb-2">
              Description
            </label>
            <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
              <textarea
                id="description"
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <label htmlFor="category" className="block text-sm font-medium leading-6 mb-2">
              Keywords
            </label>
            <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
              <input
                id="category"
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
              >
              </input>
            </div>

            <label htmlFor="zip" className="block text-sm font-medium leading-6 mb-2">
              Upload Zip Folder with Images
            </label>
            {!zipFile ? (
              <div className="my-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 sm:max-w-md">
                <div className="text-center">
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-gray-900 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-700">
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        accept="application/zip"
                        onChange={handleFileChange} />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">.ZIP up to 10MB</p>
                </div>
              </div>
            ) : (
              <div className="my-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 sm:max-w-md">
                <div className='text-center'>
                  {zipFile.name}
                  <br />
                  <b className='text-sm'> {Math.round(zipFile.size / 1000)/1000} MB </b>  
                </div>
                <button type="button" className="ml-4 text-sm font-medium text-red-600 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500" onClick={() => setZipFile(null)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>

                </button>
              </div>
            )
            }
            <button
              type="submit"
              className="block mt-5 bg-blue-500 text-white py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-500"
              disabled={!styleName || !keywords || !description || !zipFile}
            >
              Create Style
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StyleCreate;
