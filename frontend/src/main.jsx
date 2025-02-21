import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'
import Home from './home'
import Contact from './contact'
import Profile from './Profile'
import AddListing from './add-listing'
import SearchByCategory from './search/[category]/SearchByCategory'
import SearchByOptions from './search/SearchByOptions'
import ListingDetail from './listing-details/[id]/listingDetail'
import Chat from './ChatApp/Chat'
import { ChatProvider } from './ChatApp/Context/ChatProvider'

//yha se clerk ka h
// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {

  throw new Error("Missing Publishable Key")
}
//yha tak sab clerk ka h

///yha par is function mai sare routes ha jo ek array of object mai save h...
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/contact',
    element: <Contact />
  },
  {
    path: '/profile',
    element: <ChatProvider><Profile /></ChatProvider>
  },
  {
    path: '/add-listing',
    element: <AddListing />
  },
  {
    path: '/search/:category',
    element: <SearchByCategory />
  },
  {
    path: '/listing-details/:id',
    element: <ChatProvider>< ListingDetail /></ChatProvider>
  },
  {
    path: '/search',
    element: <SearchByOptions />
  },
  {
    path: '/chat',
    element: <ChatProvider>< Chat /></ChatProvider>
  },
])


createRoot(document.getElementById('root')).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
    <RouterProvider router={router} />
  </ClerkProvider>
)
