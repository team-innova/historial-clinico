import { useState } from 'react'
import { Link } from 'react-router-dom'

import { User, LogOut, Settings } from 'lucide-react'
import { Button } from "./ui/button"

export default function Layout({ children }) {
  const [user, setUser] = useState({ name: 'John Doe', image: '/placeholder.svg' })
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen)

  return (

      <nav className="bg-primary text-primary-foreground p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">
          <img src="" alt="Logo" className="h-12 w-auto" />
          </Link>
          {user ? (
            <div className="relative">
              <Button 
                variant="ghost" 
                className="flex items-center space-x-2"
                onClick={toggleDropdown}
              >

                <span>{user.name}</span>
              </Button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-10">
                  <Link href="/profile">
                    <a className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <User className="mr-2 h-4 w-4" />
                      <span>Perfil</span>
                    </a>
                  </Link>
                  <button 
                    onClick={() => console.log("Cerrar sesión")} 
                    className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Cerrar sesión</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login">
              <Button variant="secondary">Iniciar sesión</Button>
            </Link>
          )}
        </div>
      </nav>
  )
}