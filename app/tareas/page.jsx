'use client'

import Link from 'next/link'
import { Container, Button, Table } from 'react-bootstrap'
import { useState, useEffect } from 'react'

export default function TareasPage() {
  const [usuarioId, setUsuarioId] = useState(null)
  const [mostrar, setMostrar] = useState(false)

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      const { id } = JSON.parse(user)
      setUsuarioId(id)
    }
  }, [])

  const todasLasTareas = [
    { id: 1, titulo: 'Tarea 1', estado: 'Pendiente', asignadoA: 1 },
    { id: 2, titulo: 'Tarea 2', estado: 'Completada', asignadoA: 2 },
    { id: 3, titulo: 'Tarea 3', estado: 'Pendiente', asignadoA: 1 }
  ]

  const tareasAsignadas = usuarioId
    ? todasLasTareas.filter(t => t.asignadoA === usuarioId)
    : []

  return (
    <Container className="mt-5">
      <h2>Tareas</h2>
      <Link href="/tareas/nueva">
        <Button className="mb-3">Nueva Tarea</Button>
      </Link>
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
          Debes iniciar sesión para ver tus tareas asignadas.
        </div>
      )}
    </Container>
  )
}