import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { PencilIcon } from 'lucide-react'

export default function PostIt({ onSave }) {
  const [note, setNote] = useState('')

  const handleSave = () => {
    if (note.trim()) {
      onSave(note)
      setNote('')
    }
  }

  return (
    <Card className="bg-yellow-200 shadow-lg rounded-lg  relative my-8">
      <CardHeader>
        <CardTitle>
        <PencilIcon className="absolute top-2 right-2 text-black" size={16} />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Escribe tus notas aquí..."
          className="w-full bg-transparent border-none mt-8"
        />
        <Button onClick={handleSave} className="mt-2">Guardar Nota</Button>
      </CardContent>
    </Card>
  )
}
