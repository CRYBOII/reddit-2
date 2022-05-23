import Image from 'next/image'
import React from 'react'
import {
  ChevronDownIcon,
  ChevronRightIcon,
  HomeIcon,
  MenuIcon,
  SearchIcon,
} from '@heroicons/react/solid'
import {
  BellIcon,
  ChatIcon,
  GlobeIcon,
  PlusIcon,
  SparklesIcon,
  SpeakerphoneIcon,
  VideoCameraIcon,
} from '@heroicons/react/outline'
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

function Header() {
  const { data: session } = useSession()
  return (
    <div className=" sticky top-0 z-50 flex  justify-center bg-white px-4 py-2 shadow-sm">
      <div className="h-15 relative w-20 flex-shrink-0 cursor-pointer items-center">
        <Link href="/">
          <Image
            objectFit="contain"
            src="https://links.papareact.com/fqy"
            layout="fill"
          />
        </Link>
      </div>

      <div className="mx-7 flex items-center xl:min-w-[300px]">
        <HomeIcon className="h-5 w-5" />
        <p className="ml-2 hidden flex-1 lg:inline">Home</p>
        <ChevronDownIcon className="h-5 w-5" />
      </div>

      {/* seach box */}

      <form className="flex flex-1 items-center space-x-2 rounded-sm border-gray-200 bg-gray-100  px-3">
        <SearchIcon className="h-6 w-6 to-gray-400" />
        <input
          type="text"
          placeholder="Search Reddit"
          className=" flex-1 bg-transparent outline-none"
        />
        <button hidden type="submit" />
      </form>
      <div className="mx-5  hidden items-center space-x-2 text-gray-500 lg:inline-flex ">
        <SparklesIcon className="icon" />
        <GlobeIcon className="icon" />
        <VideoCameraIcon className="icon" />
        <hr className="bdg-gray-100 h-10 border" />

        <ChatIcon className="icon" />
        <BellIcon className="icon" />
        <PlusIcon className="icon" />
        <SparklesIcon className="icon" />
      </div>
      <div className=" ml-5 flex items-center lg:hidden">
        <MenuIcon className="icon" />
      </div>

      {/* signin signout */}

      {session ? (
        <div
          onClick={() => signOut()}
          className=" hidden cursor-pointer  items-center space-x-2 border border-gray-100 p-2 lg:flex"
        >
          <div className=" relative h-5 w-5 flex-shrink-0">
            <Image
              src="https://links.papareact.com/23l"
              layout="fill"
              alt=""
              objectFit="contain"
            />
          </div>
          <div className="flex-1 text-xs">
            <p className=" truncate">{session?.user?.name}</p>
            <p className="text-gray-400">I Krama</p>
          </div>
          <ChevronDownIcon className=" h-5 flex-shrink-0 text-gray-400" />
        </div>
      ) : (
        <div
          onClick={() => signIn()}
          className=" hidden cursor-pointer  items-center space-x-2 border border-gray-100 p-2 lg:flex"
        >
          <div className=" relative h-5 w-5 flex-shrink-0">
            <Image
              src="https://links.papareact.com/23l"
              layout="fill"
              alt=""
              objectFit="contain"
            />
          </div>
          <p className="text-gray-400">Sign In</p>
        </div>
      )}
    </div>
  )
}

export default Header
