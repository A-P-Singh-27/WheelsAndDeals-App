import { ChatState } from '@/ChatApp/Context/ChatProvider';
import { Button } from '@/components/ui/button'
import { SignInButton, useUser } from '@clerk/clerk-react';
import React from 'react'
import { Link } from 'react-router-dom'

export default function OwnerDetail({ carDetail }) {
  const {isSignedIn , user} = useUser();
  console.log(user);
  
  return (
    <div className='p-10 border rounded-xl shadow-md'>
      <h2 className='font-medium text-2xl mb-3'>Owner/ Dealer</h2>
      <img src={carDetail?.userImageUrl} className='w-[50px] h-[50px] rounded-full' alt="user image" />
      <h2 className='mt-2 font-bold text-xl'>{carDetail?.username}</h2>
      <h2 className='mt-2 text-gray-500 w-full break-words'>{carDetail?.createdby}</h2>
      {
        isSignedIn ?
          <Link to="/chat"
            state={{
              ownerName: carDetail?.username,
              ownerEmail: carDetail?.createdby,
            }}><Button className='mt-6 text-white rounded-full'
            >Message Owner</Button></Link>
          :
          <div>
            <SignInButton
              mode="modal"
              afterSignInCallback={() => {
                // Programmatically navigate to /chat
                navigate("/chat", {
                  state: {
                    ownerName: carDetail?.username,
                    ownerEmail: carDetail?.createdby,
                  },
                });
              }}
              className="px-4 rounded-full py-1.5 mx-2"
            >
              <Button>Sign-In</Button>
            </SignInButton>
          </div>

      }
    </div>
  )
}

{/* <Link to="/chat"
  state={{
    ownerName: carDetail?.username,
    ownerEmail: carDetail?.createdby,
  }}><Button className='mt-6 text-white rounded-full'
    // onClick={CreateChat}
  >Message Owner</Button></Link> */}