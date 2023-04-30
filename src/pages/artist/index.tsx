import { UserProfile } from "@clerk/nextjs"
export default function ArtistPage() {
  return (
    <div className={'w-full h-full justify-center items-center flex p-6'}>
    <UserProfile />
    </div>
  )
}
