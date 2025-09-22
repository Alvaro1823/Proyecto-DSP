'use client'

import Link from 'next/link'
import { Container, Button, Table, Form, Row, Col } from 'react-bootstrap'
import { useState, useEffect } from 'react'

export default function TareasPage() {
  const [usuarioId, setUsuarioId] = useState(null)
  const [mostrar, setMostrar] = useState(false)
  const [tareas, setTareas] = useState([
    { id: 1, titulo: 'Tarea 1', estado: 'Pendiente', asignadoA: 1 },
    { id: 2, titulo: 'Tarea 2', estado: 'Completada', asignadoA: 2 },
    { id: 3, titulo: 'Tarea 3', estado: 'Pendiente', asignadoA: 1 }
  ])
  const [nuevoTitulo, setNuevoTitulo] = useState('')
  const [nuevoEstado, setNuevoEstado] = useState('Pendiente')

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      const { id } = JSON.parse(user)
      setUsuarioId(id)
    }
  }, [])

  const tareasAsignadas = usuarioId
    ? tareas.filter(t => t.asignadoA === usuarioId)
    : []

  const handleAgregarTarea = (e) => {
    e.preventDefault()
    if (!nuevoTitulo.trim()) return
    const nuevaTarea = {
      id: tareas.length + 1,
      titulo: nuevoTitulo,
      estado: nuevoEstado,
      asignadoA: usuarioId
    }
    setTareas([...tareas, nuevaTarea])
    setNuevoTitulo('')
    setNuevoEstado('Pendiente')
    setMostrar(true)
  }

  return (
    <Container className="mt-5">
      <h2>Tareas</h2>
      <Form onSubmit={handleAgregarTarea} className="mb-4">
        <Row>
          <Col md={5}>
            <Form.Control
              type="text"
              placeholder="Nombre de la nueva tarea"
              value={nuevoTitulo}
              onChange={e => setNuevoTitulo(e.target.value)}
              disabled={!usuarioId}
              required
            />
          </Col>
          <Col md={4}>
            <Form.Select
              value={nuevoEstado}
              onChange={e => setNuevoEstado(e.target.value)}
              disabled={!usuarioId}
            >
              <option value="Pendiente">Pendiente</option>
              <option value="Completada">Completada</option>
            </Form.Select>
          </Col>
          <Col md={3}>
            <Button type="submit" variant="success" disabled={!usuarioId}>
              Agregar Tarea
            </Button>
          </Col>
        </Row>
      </Form>
      <Button
        style={{
          backgroundColor: '#1976d2',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '5px',
          border: 'none',
          marginBottom: '20px'
        }}
        onClick={() => setMostrar(!mostrar)}
        disabled={!usuarioId}
      >
        Ver tareas asignadas
      </Button>
      {mostrar && usuarioId && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Título</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {tareasAsignadas.map((t) => (
              <tr key={t.id}>
                <td>{t.id}</td>
                <td>{t.titulo}</td>
                <td>{t.estado}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      {!usuarioId && (
        <div className="text-danger mt-3">
          Debes iniciar sesión para ver tus tareas asignadas y agregar nuevas.
        </div>
      )}
    </Container>
  )
}