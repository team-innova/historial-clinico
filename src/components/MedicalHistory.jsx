import React, { useState } from 'react'
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion"
import { Label } from "./ui/label"
import { FileUploader } from "./ui/file-uploader"
import { PDFDownloadLink } from '@react-pdf/renderer'
import { CalendarIcon, ClockIcon } from 'lucide-react'
import { PencilIcon, XCircleIcon } from 'lucide-react'

export default function MedicalHistory({ patient, onUpdatePatient }) {
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState(patient)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onUpdatePatient(formData)
    setEditMode(false)
  }

  const renderField = (label, name, value, type = "text") => (
    <div className="mb-4">
      <Label htmlFor={name} className="text-sm font-medium text-gray-700">{label}</Label>
      {editMode ? (
        type === "textarea" ? (
          <Textarea
            id={name}
            name={name}
            value={value}
            onChange={handleChange}
            className="mt-1 w-full"
          />
        ) : (
          <Input
            id={name}
            type={type}
            name={name}
            value={value}
            onChange={handleChange}
            className="mt-1 w-full"
          />
        )
      ) : (
        <p className="mt-1 text-sm text-gray-900">{value}</p>
      )}
    </div>
  )

  return (
    <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl font-bold">{patient.nombreCompleto}</CardTitle>
            <p className="text-sm opacity-75">Último diagnóstico: {patient.ultimoDiagnostico}</p>
            <p className="text-sm opacity-75">
              <CalendarIcon className="inline-block mr-1" size={16} />
              Última fecha de tratamiento: {patient.ultimaFechaTratamiento}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            {editMode ? (
              <>
                <Button onClick={handleSubmit} variant="secondary">
                  Guardar Cambios
                </Button>
                <Button onClick={() => setEditMode(false)} variant="outline">
                  <XCircleIcon className="mr-2" size={16} />
                  Cancelar
                </Button>
              </>
            ) : (
              <Button onClick={() => setEditMode(true)} variant="secondary">
                <PencilIcon className="mr-2" size={16} />
                Editar
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList className="bg-gray-100 p-1 rounded-lg">
            <TabsTrigger value="personal" className="data-[state=active]:bg-white">Datos Personales</TabsTrigger>
            <TabsTrigger value="medical" className="data-[state=active]:bg-white">Datos Médicos</TabsTrigger>
            <TabsTrigger value="evolution" className="data-[state=active]:bg-white">Evolución</TabsTrigger>
            <TabsTrigger value="files" className="data-[state=active]:bg-white">Archivos</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {renderField("Fecha de Nacimiento", "fechaNacimiento", formData.fechaNacimiento, "date")}
            {renderField("Sexo", "sexo", formData.sexo)}
            {renderField("Género", "genero", formData.genero)}
            {renderField("Estado Civil", "estadoCivil", formData.estadoCivil)}
            {renderField("Domicilio", "domicilio", formData.domicilio, "textarea")}
            {renderField("Teléfono", "telefono", formData.telefono)}
            {renderField("Correo Electrónico", "correoElectronico", formData.correoElectronico, "email")}
            {renderField("Ocupación", "ocupacion", formData.ocupacion)}
            {renderField("Número de Identificación", "numeroIdentificacion", formData.numeroIdentificacion)}
            {renderField("Contacto de Emergencia", "contactoEmergencia", formData.contactoEmergencia)}
          </TabsContent>

          <TabsContent value="medical" className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {renderField("Fecha de Ingreso", "fechaIngreso", formData.fechaIngreso, "date")}
            {renderField("Motivo de Consulta", "motivoConsulta", formData.motivoConsulta, "textarea")}
            {renderField("Diagnóstico", "diagnostico", formData.diagnostico, "textarea")}
            {renderField("Antecedentes Médicos", "antecedentesMedicos", formData.antecedentesMedicos, "textarea")}
            {renderField("Antecedentes Psicológicos", "antecedentesPsicologicos", formData.antecedentesPsicologicos, "textarea")}
            {renderField("Medicación Actual", "medicacionActual", formData.medicacionActual, "textarea")}
            {renderField("Tratamientos Previos", "tratamientosPrevios", formData.tratamientosPrevios, "textarea")}
            {renderField("Tratamientos Psiquiátricos", "tratamientosPsiquiatricos", formData.tratamientosPsiquiatricos, "textarea")}
            {renderField("Antecedentes Familiares", "antecedentesFamiliares", formData.antecedentesFamiliares, "textarea")}
            {renderField("Experiencias", "experiencias", formData.experiencias, "textarea")}
          </TabsContent>


          <TabsContent value="evolution" className="space-y-4">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Historia Clínica</AccordionTrigger>
                <AccordionContent>
                  {renderField("Notas de Consulta", "notasConsulta", formData.notasConsulta, "textarea")}
                  {renderField("Evolución", "evolucion", formData.evolucion, "textarea")}
                  {renderField("Plan de Tratamiento", "planTratamiento", formData.planTratamiento, "textarea")}
                  {renderField("Pruebas Psicológicas", "pruebasPsicologicas", formData.pruebasPsicologicas, "textarea")}
                  {renderField("Intervenciones Realizadas", "intervencionesRealizadas", formData.intervencionesRealizadas, "textarea")}
                  {renderField("Observaciones", "observaciones", formData.observaciones, "textarea")}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Datos Administrativos</AccordionTrigger>
                <AccordionContent>
                  {renderField("Número de Historia Clínica", "numeroHistoriaClinica", formData.numeroHistoriaClinica)}
                  {renderField("Responsable o Tutor Legal", "responsableTutorLegal", formData.responsableTutorLegal)}
                  {renderField("Referencias", "referencias", formData.referencias)}
                  {renderField("Preferencias de Comunicación", "preferenciasComunicacion", formData.preferenciasComunicacion)}
                  {renderField("Consentimiento Informado", "consentimientoInformado", formData.consentimientoInformado, "checkbox")}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Evolución de Sesiones</AccordionTrigger>
                <AccordionContent>
                  {renderField("Fecha de Sesión", "fechaSesion", formData.fechaSesion, "date")}
                  {renderField("Resumen de la Sesión", "resumenSesion", formData.resumenSesion, "textarea")}
                  {renderField("Estado Emocional", "estadoEmocional", formData.estadoEmocional, "textarea")}
                  {renderField("Progreso del Tratamiento", "progresoTratamiento", formData.progresoTratamiento, "textarea")}
                  {renderField("Cambios en el Diagnóstico", "cambiosDiagnostico", formData.cambiosDiagnostico, "textarea")}
                  {renderField("Observaciones Clínicas", "observacionesClinicas", formData.observacionesClinicas, "textarea")}
                  {renderField("Ajustes en el Plan de Tratamiento", "ajustesPlanTratamiento", formData.ajustesPlanTratamiento, "textarea")}
                  {renderField("Comentarios del Paciente", "comentariosPaciente", formData.comentariosPaciente, "textarea")}
                  {renderField("Acciones o Sugerencias para la Próxima Sesión", "accionesSugerencias", formData.accionesSugerencias, "textarea")}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Notas de Consulta (Privado)</AccordionTrigger>
                <AccordionContent>
                  {renderField("Notas de Consulta (Privado)", "notasConsultaPrivadas", formData.notasConsultaPrivadas, "textarea")}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>

          <TabsContent value="files" className="space-y-4">
            <FileUploader onFileSelect={(file) => console.log('File selected:', file)} />
            {/* <PDFDownloadLink document={<MedicalHistoryPDF patient={patient} />} fileName="historial_clinico.pdf">
              {({ blob, url, loading, error }) =>
                loading ? 'Generando PDF...' : 'Descargar Historial Clínico (PDF)'
              }
            </PDFDownloadLink> */}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}