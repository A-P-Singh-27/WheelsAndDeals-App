import Header from '@/components/Header'
import React from 'react'
import MyListing from './comonents/MyListing'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Inbox from './comonents/Inbox'


function Profile() {
  return (
    <div>
      <Header />
      <div className='px-10 md:px-20 mt-10 '>
        <Tabs defaultValue="my-listing" className="w-full h-[83vh]">
  <TabsList className="flex justify-start w-full bg-gray-100">
    <TabsTrigger value="my-listing">Mylisting</TabsTrigger>
    <TabsTrigger value="inbox">Inbox</TabsTrigger>
    <TabsTrigger value="profile">Profile</TabsTrigger>
  </TabsList>
  <TabsContent value="my-listing"><MyListing/></TabsContent>
  <TabsContent value="inbox"><Inbox/></TabsContent>
  <TabsContent value="profile">Profile Tab</TabsContent>
</Tabs>

      </div>
    </div>
  )
}

export default Profile