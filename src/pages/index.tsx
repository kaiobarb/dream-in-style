import Image from 'next/image'
import { Inter } from 'next/font/google'
import Navbar from '../components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>
      <main
        className={`flex min-h-full flex-col items-center justify-between p-24 ${inter.className}`}
      >
        <h1 className='lg:text-9xl md:text-7xl sm:text-5xl text-3xl font-black mb-14'>Dream In Style</h1>
        <h3 className='lg:text-3xl md:text-2xl sm:text-xl text-sm mb-14'>Create and share styles trained on Dreambooth</h3>
      </main>
    </div>
  )
}
