import { MicrophoneIcon, SearchIcon, XIcon } from "@heroicons/react/solid";
import Image from "next/image";
import { useRouter } from "next/router";
import { useRef } from "react";
import Avatar from "./Avatar";
import HeaderOptions from "./HeaderOptions";

function Header() {
  const router = useRouter();
  const searchInputRef = useRef(null);

  //redirects to the new search page
  const search = (e) => {
    e.preventDefault(); //to stop refreshing page
    const term = searchInputRef.current.value; //getting current search input

    if (!term) return; // nothing to do when no text in search input

    //redirecting user to new search page
    router.push(`/search?term=${term}`);
  };

  return (
    <header className="sticky top-0 bg-white">
      <div className="flex w-full p-6 items-center">
        <Image
          src="https://www.google.co.uk/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
          height={40}
          width={120}
          className="cursor-pointer"
          onClick={() => router.push("/")} //redirecting to home page
        />
        <form
          className="flex flex-grow px-6 py-3 ml-10 mr-5 border border-gray-200 
                    rounded-full shadow-lg max-w-3xl items-center"
        >
          <input
            type="text"
            ref={searchInputRef}
            className="flex-grow w-full focus:outline-none"
          />
          <XIcon
            className="h-7 sm:mr-3 text-gray-500 cursor-pointer transition
                        duration-100 transform hover:scale-125"
            onClick={() => (searchInputRef.current.value = "")}
          />
          {/*Microphone and SearchIcon are hidden until the small breakpoint is hit*/}
          <MicrophoneIcon
            className="mr-3 h-6 hidden sm:inline-flex text-blue-500
                        border-l-2 pl-4 border-gray-300"
          />
          <SearchIcon className="h-6 text-blue-500 hidden sm:inline-flex" />
          <button hidden type="submit" onClick={search}>
            Search
          </button>
        </form>
        <Avatar
          className="ml-auto" //allows form to take max width in search screen
          url="https://images.unsplash.com/photo-1504600770771-fb03a6961d33?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fHNxdWFyZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        />
      </div>

      <HeaderOptions />
    </header>
  );
}

export default Header;
