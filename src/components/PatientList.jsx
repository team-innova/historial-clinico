import React from 'react'
import { Button } from "./ui/button"
import { TrashIcon } from 'lucide-react'

export default function PatientList({ patients, onSelectPatient, onDeletePatient }) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <ul className="divide-y divide-gray-200">
        {patients.map(patient => (
          <li key={patient.id} className="flex justify-between items-center p-4 hover:bg-gray-50">
            <button
              onClick={() => onSelectPatient(patient)}
              className="flex-grow text-left"
            >
              <p className="font-semibold">{patient.nombreCompleto}</p>
              <p className="text-sm text-gray-500">{patient.numeroIdentificacion}</p>
            </button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDeletePatient(patient.id)}
              className="text-red-500 hover:text-red-700"
            >
              <TrashIcon className="h-5 w-5" />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  )
}