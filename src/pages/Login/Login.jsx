import { useState } from 'react'
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Card, CardContent, CardFooter } from "../../components/ui/card"
import { Link } from 'react-router-dom'

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md md:max-w-2xl bg-white flex flex-col md:flex-row">
        <div className="flex justify-center md:justify-start items-center md:w-1/2">
          <img src="/public/logo1 (2).jpg" alt="Logo" className="w-auto md:h-auto" />
        </div>
        <div className="md:w-1/2">
          <CardContent className="m-4 p-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="nombre@ejemplo.com"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  required
                  onChange={handleChange}
                />
              </div>
              <Button type="submit" className="w-full">Iniciar Sesión</Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link to="/register" className="text-sm text-primary hover:underline">
              ¿No tienes una cuenta? Regístrate
            </Link>
          </CardFooter>
        </div>
      </Card>
    </div>
  )
}