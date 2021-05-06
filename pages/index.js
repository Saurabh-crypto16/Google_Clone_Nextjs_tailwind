import Head from 'next/head'
import Avatar from '../components/Avatar'
import {MicrophoneIcon, SearchIcon, ViewGridIcon} from "@heroicons/react/solid"
import Image from 'next/image'
import Footer from '../components/Footer'
import { useRef } from 'react'
import { useRouter } from 'next/router'

export default function Home() {

  const router = useRouter();

  const searchInputRef = useRef(null);  //to get input text from search input

  const search = e => {
    e.preventDefault(); //to stop refreshing page
    const term = searchInputRef.current.value;  //getting current search input
    
    if(!term) return;// nothing to do when no text in search input

    //redirecting user to search page
    router.push(`/search?term=${term}`);
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Head>
        <title>Google</title>
        <link rel="icon" href="/google.png" />
      </Head>

      <header className="flex w-full p-5 justify-between text-sm text-gray-700">
        <div className="flex space-x-4 items-center">
          <p className="link">About</p>
          <p className="link">Store</p>
        </div>
        <div className="flex space-x-4 items-center">
          <p className="link">Gmail</p>
          <p className="link">Images</p>

          <ViewGridIcon className="h-10 w-10 p-2 rounded-full hover:bg-gray-100" 
            cursor="pointer"/>

          <Avatar url="https://images.unsplash.com/photo-1504600770771-fb03a6961d33?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fHNxdWFyZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"/>
        </div>
      </header>
      
      <form className="flex flex-col items-center mt-44 flex-grow w-4/5">
        <Image 
          src="https://www.google.co.uk/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
          height={100} width={300}
        />
        
        <div className="flex w-full mt-5 hover:shadow-lg focus-within:shadow-lg
          max-w-md rounded-full border border-gray-200 px-5 py-5 items-center
          sm:max-w-xl lg:max-w-2xl">
          <SearchIcon className="h-5 mr-3 text-gray-500 " />
          <input ref={searchInputRef} type="text" className="flex-grow focus:outline-none" />
          <MicrophoneIcon className="h-5"/>
        </div>
        
        <div className="flex flex-col w-1/2 space-y-2 justify-center mt-8
        sm:space-y-0 sm:flex-row sm:space-x-4">
          <button onClick={search} className="btn">Google Search</button>
          <button onClick={search} className="btn">I'm Feeling Lucky</button>
        </div>
      </form>
      
      <Footer />
    </div>
  )
}
