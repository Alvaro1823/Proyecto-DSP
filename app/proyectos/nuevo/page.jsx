'use client'
import { useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap'

export default function NuevoProyectoPage() {
  const [nombre, setNombre] = useState('')
  const [descripcion, setDescripcion] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(`Proyecto creado: ${nombre} - ${descripcion}`)
  }

  return (
    <Container className="mt-5">
      <h2>Nuevo Proyecto</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control value={nombre} onChange={(e) => setNombre(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Descripción</Form.Label>
          <Form.Control value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
        </Form.Group>
        <Button type="submit">Guardar</Button>
      </Form>
    </Container>
  )
}
