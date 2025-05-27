import React from 'react'
import { Outlet } from '@tanstack/react-router'
import Navbar from './components/NavBar'

const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  )
}

export default RootLayout