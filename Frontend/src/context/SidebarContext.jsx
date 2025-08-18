import React, { createContext, useContext, useState, useEffect } from 'react'

const SidebarContext = createContext()

export const useSidebar = () => {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }
  return context
}

export const SidebarProvider = ({ children }) => {
  // Default to false initially, then check screen size after mount
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Set initial state based on screen size after component mounts
    const checkScreenSize = () => {
      setIsOpen(window.innerWidth >= 768)
    }
    
    checkScreenSize()
    
    // Add event listener for window resize
    window.addEventListener('resize', checkScreenSize)
    
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  )
}
