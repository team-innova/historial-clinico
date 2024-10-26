import { useState } from 'react'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../../components/ui/select"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card"

export default function ProfessionalRegistrationForm() {
  const [formData, setFormData] = useState({
    nombreUsuario: '',
    contraseña: '',
    confirmarContraseña: '',
    ramasPsicologia: [],
  })

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleMultiSelectChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: prev[name].includes(value)
        ? prev[name].filter(item => item !== value)
        : [...prev[name], value],
    }))
  }

  const handleSubmit = (e) => {

    if (formData.contraseña !== formData.confirmarContraseña) {
      alert("Las contraseñas no coinciden")
      return
    }

    e.preventDefault()
    console.log(formData)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center m-4">Registro de Profesional</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
            <Input
                name="nombreUsuario"
                placeholder="Nombre de Usuario"
                maxLength={50}
                pattern="^[a-zA-Z0-9_-]{3,16}$"
                required
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              />
              <Input
                type="password"
                name="contraseña"
                placeholder="Contraseña"
                minLength={8}
                required
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              />
              <Input
                type="password"
                name="confirmarContraseña"
                placeholder="Confirmar Contraseña"
                minLength={8}
                required
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              />
              <Input
                name="nombreCompleto"
                placeholder="Nombre Completo"
                maxLength={100}
                pattern="[A-Za-z\s]+"
                required
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              />

              <Input
                name="numeroIdentificacionProfesional"
                placeholder="Número de Identificación Profesional"
                maxLength={20}
                required
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              />

              <Select onValueChange={(value) => handleChange('especialidad', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione Especialidad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="psicologia_clinica">Psicología Clínica</SelectItem>
                  <SelectItem value="psicoterapia">Psicoterapia</SelectItem>
                  <SelectItem value="psiquiatria">Psiquiatría</SelectItem>
                </SelectContent>
              </Select>

              <Select onValueChange={(value) => handleMultiSelectChange('ramasPsicologia', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione Ramas de la Psicología" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cognitivo_conductual">Cognitivo Conductual</SelectItem>
                  <SelectItem value="gestalt">Gestalt</SelectItem>
                  <SelectItem value="psicoanalisis">Psicoanálisis</SelectItem>
                  <SelectItem value="terapia_sistemica">Terapia Sistémica</SelectItem>
                  <SelectItem value="humanista">Humanista</SelectItem>
                  <SelectItem value="otra">Otra</SelectItem>
                </SelectContent>
              </Select>

              {formData.ramasPsicologia.length > 0 && (
                <div className="mt-2">
                  <strong>Selecciones actuales:</strong>
                  <ul className="list-disc pl-5 mt-1">
                    {formData.ramasPsicologia.map((item, index) => (
                      <li key={index}>{item.replace('_', ' ')}</li>
                    ))}
                  </ul>
                </div>
              )}

              <Input
                type="email"
                name="correoElectronico"
                placeholder="Correo Electrónico Profesional"
                maxLength={100}
                required
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              />

              <Input
                type="tel"
                name="telefonoProfesional"
                placeholder="Teléfono Profesional"
                pattern="[0-9]{10,15}"
                required
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              />

              <Input
                name="direccionConsultorio"
                placeholder="Dirección de Consultorio"
                maxLength={150}
                required
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              />

              <Input
                type="date"
                name="fechaRegistroProfesional"
                required
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              />

              <Input
                type="file"
                name="firmaDigital"
                accept="image/jpeg,image/png"
                required
                onChange={(e) => handleChange(e.target.name, e.target.files[0])}
              />
            </div>
            <Button type="submit">Registrarse</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}