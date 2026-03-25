import React from 'react'
import Image from "next/image";


const Footer = () => {
  return (
    <footer className='text-white fixed left-0 w-full bottom-0 bg-purple-700 h-5 md:h-8 text-xs md:text-[14px] flex justify-center items-center gap-1'>
        <div>Created with </div>
        <Image alt='Heart' src={"/heart.png"} width={20} height={20}></Image>
        <div> by Jeel Patel</div>
    </footer>
  )
}

export default Footer
