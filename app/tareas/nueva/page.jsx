'use client'
import { useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap'

export default function NuevaTareaPage() {
  const [titulo, setTitulo] = useState('')
  const [estado, setEstado] = useState('Pendiente')

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(`Tarea creada: ${titulo} - ${estado}`)
  }

  return (
    <Container className="mt-5">
      <h2>Nueva Tarea</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Título</Form.Label>
          <Form.Control value={titulo} onChange={(e) => setTitulo(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Estado</Form.Label>
          <Form.Select value={estado} onChange={(e) => setEstado(e.target.value)}>
            <option>Pendiente</option>
            <option>Completada</option>
          </Form.Select>
        </Form.Group>
        <Button type="submit">Guardar</Button>
      </Form>
    </Container>
  )
}
