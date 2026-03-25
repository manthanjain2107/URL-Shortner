import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
const Navbar = () => {
  return (
    <nav className='bg-purple-700 h-9 md:h-13 flex justify-between  px-2 md:px-15 items-center text-white'>
      <div className='logo text-lg font-bold'>
        <Link href="/">URLite</Link>
      </div>
      <ul className='flex justify-center items-center gap-4'>
        {/* <Link href="/"><li>Home</li></Link>
        <Link href="/about"><li>About</li></Link>
        <Link href="/generate"><li>Shortner</li></Link>
        <Link href="/contact"><li>Contact Us</li></Link> */}
        <div className="flex  justify-center gap-2">
        <a href="https://github.com/manthanjain2107" target="/"><Image height={33} width={33} className="invert px-2  w-11 cursor-pointer" src="/github.png" alt="github" title="Github" /></a>
        <a href="https://www.linkedin.com/in/manthan-jain-66a37a305?utm_source=share_via&utm_content=profile&utm_medium=member_android"target="/"><Image width={33} height={33} className="invert px-2  w-11 cursor-pointer" src="/linkedin.png" alt="linkedin" title="Linkedin"/></a>
      </div>
      </ul>
    </nav>
  )
}

export default Navbar
