import { SignInButton, SignOutButton, UserButton, useUser } from '@clerk/clerk-react';
import React from 'react'
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

function Header() {
  const { user, isSignedIn } = useUser();
  console.log(isSignedIn);
  console.log(user);



  return (
    <div className='flex justify-between items-center shadow-sm p-5 w-full'>
    <Link to={'/'}><img src="/logo.svg" alt="" width={30} height={20} /></Link>
      <ul className='hidden md:flex gap-16 '>
      <Link to={'/'}><li className='font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary'>Home</li></Link>
      <Link to={'/search'}><li className='font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary'>Search</li></Link>
      <a href="#new"><li className='font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary'>New</li></a>
      <Link to={'/'}><li className='font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary'>Preowned</li></Link>
      </ul>


      {
        isSignedIn ?
          <div className='flex gap-5 items-center'>
            {/* <UserButton/> */}
            <UserButton style={{ border: "1px solid red", backgroundColor: "lightyellow" }} />
            <Link to={'/profile'}>
            <Button className='rounded-3xl'>Submit Listing</Button>
            </Link>
          </div>
          :
          <div>
            <SignInButton mode='modal' forceRedirectUrl='/' className='px-2 rounded-full py-1.5 mx-2'>
              <Button>Sign-In</Button>
            </SignInButton>
            {/* <Link to={'/profile'}>
            <Button className='rounded-3xl'>Submit Listing</Button>
            </Link> */}
          </div>

      }

    </div>
  )
}

export default Header