import React, { useState } from 'react'
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./ui/select";

export default function PatientForm({ patient, onSave, onCancel }) {
  const [formData, setFormData] = useState(patient || {
    nombreCompleto: '',
    fechaNacimiento: '',
    sexo: '',
    genero: '',
    estadoCivil: '',
    domicilio: '',
    telefono: '',
    correoElectronico: '',
    ocupacion: '',
    numeroIdentificacion: '',
    contactoEmergencia: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <Input
        name="nombreCompleto"
        value={formData.nombreCompleto}
        onChange={handleChange}
        placeholder="Nombre Completo"
        maxLength={100}
        required
      />
      <Input
        name="fechaNacimiento"
        type="date"
        value={formData.fechaNacimiento}
        onChange={handleChange}
        required
      />
      <Select onValueChange={(value) => setFormData({ ...formData, sexo: value })}>
        <SelectTrigger>
          <SelectValue placeholder="Seleccione Sexo" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Masculino">Masculino</SelectItem>
          <SelectItem value="Femenino">Femenino</SelectItem>
          <SelectItem value="Otro">Otro</SelectItem>
        </SelectContent>
      </Select>
      <Input
        name="genero"
        value={formData.genero}
        onChange={handleChange}
        placeholder="Género"
        maxLength={50}
      />
      <Select onValueChange={(value) => setFormData({ ...formData, estadoCivil: value })}>
        <SelectTrigger>
          <SelectValue placeholder="Seleccione Estado Civil" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Soltero">Soltero</SelectItem>
          <SelectItem value="Casado">Casado</SelectItem>
          <SelectItem value="Divorciado">Divorciado</SelectItem>
          <SelectItem value="Viudo">Viudo</SelectItem>
          <SelectItem value="Otro">Otro</SelectItem>
        </SelectContent>
      </Select>
      <Textarea
        name="domicilio"
        value={formData.domicilio}
        onChange={handleChange}
        placeholder="Domicilio"
        maxLength={150}
        required
        className="md:col-span-2"
      />
      <Input
        name="telefono"
        type="tel"
        value={formData.telefono}
        onChange={handleChange}
        placeholder="Teléfono"
        pattern="[0-9]{10,15}"
        required
      />
      <Input
        name="correoElectronico"
        type="email"
        value={formData.correoElectronico}
        onChange={handleChange}
        placeholder="Correo Electrónico"
        maxLength={100}
        required
      />
      <Input
        name="ocupacion"
        value={formData.ocupacion}
        onChange={handleChange}
        placeholder="Ocupación"
        maxLength={100}
      />
      <Input
        name="numeroIdentificacion"
        value={formData.numeroIdentificacion}
        onChange={handleChange}
        placeholder="Número de Identificación"
        maxLength={20}
        required
      />
      <Input
        name="contactoEmergencia"
        value={formData.contactoEmergencia}
        onChange={handleChange}
        placeholder="Contacto de Emergencia"
        maxLength={100}
        className="md:col-span-2"
      />
      <div className="flex justify-end space-x-2 md:col-span-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">
          Guardar
        </Button>
      </div>
    </form>
  )
}