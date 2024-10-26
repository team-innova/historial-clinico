import React, { useState, useRef } from 'react'
import { Button } from "./button"
import { Input } from "./input"
import { Label } from "./label"
import { UploadIcon } from "lucide-react"

export const FileUploader = ({
  onFileSelect,
  accept = "*",
  multiple = false
}) => {
  const [selectedFile, setSelectedFile] = useState(null)
  const fileInputRef = useRef(null)

  const handleFileChange = (event) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      onFileSelect(file)
    }
  }

  const handleDragOver = (event) => {
    event.preventDefault()
  }

  const handleDrop = (event) => {
    event.preventDefault()
    const file = event.dataTransfer.files?.[0]
    if (file) {
      setSelectedFile(file)
      onFileSelect(file)
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="space-y-2">
      <Label htmlFor="file-upload">Subir archivo</Label>
      <div
        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400 transition-colors"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">
          Arrastra y suelta un archivo aquí, o haz clic para seleccionar
        </p>
        {selectedFile && (
          <p className="mt-2 text-sm text-gray-500">
            Archivo seleccionado: {selectedFile.name}
          </p>
        )}
      </div>
      <Input
        id="file-upload"
        type="file"
        className="hidden"
        onChange={handleFileChange}
        accept={accept}
        multiple={multiple}
        ref={fileInputRef}
      />
      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={handleClick}
      >
        Seleccionar archivo
      </Button>
    </div>
  )
}