import React, { useState } from 'react'
import { PlusIcon, SearchIcon } from 'lucide-react'
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import PatientList from '../../components/PatientList'
import PatientForm from '../../components/PatientForm'
import MedicalHistory from '../../components/MedicalHistory'
import NavBar from '../../components/NavBar'
import PostIt from '../../components/PostIt'

// Datos de ejemplo hardcodeados
const initialPatients = [
  {
    id: 1,
    nombreCompleto: 'Juan Pérez',
    fechaNacimiento: '1985-05-15',
    sexo: 'Masculino',
    genero: 'Masculino',
    estadoCivil: 'Casado',
    domicilio: 'Calle Principal 123, Ciudad',
    telefono: '1234567890',
    correoElectronico: 'juan.perez@email.com',
    ocupacion: 'Ingeniero',
    numeroIdentificacion: 'A1234567',
    contactoEmergencia: 'María Pérez - 0987654321',
    fechaIngreso: '2023-01-10',
    motivoConsulta: 'Estrés laboral',
    diagnostico: 'Trastorno de ansiedad',
    antecedentesMedicos: 'Hipertensión controlada',
    antecedentesPsicologicos: 'Sin antecedentes relevantes',
    medicacionActual: 'Enalapril 10mg',
    tratamientosPrevios: 'Terapia cognitivo-conductual en 2020',
    tratamientosPsiquiatricos: 'Ninguno',
    antecedentesFamiliares: 'Padre con depresión',
    experiencias: 'Divorcio de los padres en la adolescencia'
  },
  {
    id: 2,
    nombreCompleto: 'Ana García',
    fechaNacimiento: '1990-08-22',
    sexo: 'Femenino',
    genero: 'Femenino',
    estadoCivil: 'Soltera',
    domicilio: 'Avenida Central 456, Pueblo',
    telefono: '9876543210',
    correoElectronico: 'ana.garcia@email.com',
    ocupacion: 'Profesora',
    numeroIdentificacion: 'B9876543',
    contactoEmergencia: 'Carlos García - 1122334455',
    fechaIngreso: '2023-03-05',
    motivoConsulta: 'Problemas de sueño',
    diagnostico: 'Insomnio crónico',
    antecedentesMedicos: 'Migraña ocasional',
    antecedentesPsicologicos: 'Episodio depresivo leve en 2018',
    medicacionActual: 'Ninguna',
    tratamientosPrevios: 'Terapia de relajación en 2019',
    tratamientosPsiquiatricos: 'Tratamiento con antidepresivos en 2018 (discontinuado)',
    antecedentesFamiliares: 'Madre con trastorno bipolar',
    experiencias: 'Cambio de trabajo reciente'
  }
]
export default function App() {
  const [patients, setPatients] = useState(initialPatients)

  const [selectedPatient, setSelectedPatient] = useState(null)
  const [isAddingPatient, setIsAddingPatient] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const addPatient = (newPatient) => {
    setPatients([...patients, { ...newPatient, id: Date.now() }])
    setIsAddingPatient(false)
  }

  const updatePatient = (updatedPatient) => {
    setPatients(patients.map(p => p.id === updatedPatient.id ? updatedPatient : p))
    setSelectedPatient(updatedPatient)
  }

  const deletePatient = (patientId) => {
    if (window.confirm('¿Está seguro de que desea eliminar este paciente?')) {
      setPatients(patients.filter(p => p.id !== patientId))
      setSelectedPatient(null)
    }
  }

  const filteredPatients = patients.filter(patient =>
    patient.nombreCompleto.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.numeroIdentificacion.includes(searchTerm)
  )

  const handleSaveNote = (newNote) => {
    setFormData(prevData => ({
      ...prevData,
      notasConsulta: (prevData.notasConsulta || '') + '\n' + newNote
    }))
  }

  return (

    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow container mx-auto py-8">
        <div className="flex mb-4 space-x-4">
          <Input
            type="text"
            placeholder="Buscar paciente..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow"
          />
          <Button onClick={() => setIsAddingPatient(true)}>
            <PlusIcon className="mr-2 h-4 w-4" /> Agregar Paciente
          </Button>
        </div>
        <div className="flex flex-col-reverse lg:flex-row lg:space-x-4">
          <div className="lg:w-2/3 w-full">
            {isAddingPatient ? (
              <PatientForm onSave={addPatient} onCancel={() => setIsAddingPatient(false)} />
            ) : selectedPatient ? (
              <MedicalHistory
                patient={selectedPatient}
                onUpdatePatient={updatePatient}
              />
            ) : (
              <p className="text-center text-gray-500 mt-10">Seleccione un paciente o agregue uno nuevo</p>
            )}
          </div>
          <div className="lg:w-1/3 w-full">
            <PatientList
              patients={filteredPatients}
              onSelectPatient={setSelectedPatient}
              onDeletePatient={deletePatient}
            />
            <PostIt onSave={handleSaveNote} />
          </div>
        </div>
      </main>
    </div>
  )
}