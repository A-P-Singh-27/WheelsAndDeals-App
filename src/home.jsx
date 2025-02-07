import React from 'react'
import { Button } from './components/ui/button'
import { SignInButton } from '@clerk/clerk-react'
import Header from './components/header'
import Hero from './components/Hero'
import Category from './components/Category'
import MostSearchedCar from './components/MostSearchedCar'
import InfoSection from './components/InfoSection'
import Footer from './components/Footer'

const Home = () => {
  return (
    <>
      {/* Header */}
      <Header />
      {/* Hero */}
      <Hero />
      {/* category */}
      <Category />
      {/* Most searched car */}
      <MostSearchedCar />
      {/* InfoSection */}
      <InfoSection />
      {/* Footer */}
      <Footer />
    </>
  )
}

export default Home