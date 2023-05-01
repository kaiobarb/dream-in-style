import axios from 'axios';
import { useEffect, useState } from 'react';
import { Style } from '@prisma/client';

export default function GalleryPage() {
  const [styles, setStyles] = useState([]);

  useEffect(() => {
    axios.get('/api/style/list').then((response) => {
      setStyles(response.data.styles);
    });
  }, []);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <main className='flex flex-col flex-1 px-20 text-center'>
        <h1 className='text-6xl font-bold'>
          Gallery
        </h1>
        <div className='flex flex-wrap justify-center items-center max-w-4xl mt-6 sm:w-full'>
          {styles.map((style: Style) => (
            <div className='block m-4 border-2 border-gray-300 rounded-lg p-4 w-64'>
              <div className='text-xl font-bold'>{style.name}</div>
              <div>{style.description}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
