'use client'

import Link from 'next/link'
import { Container, Button, Table } from 'react-bootstrap'

export default function TareasPage() {
  const tareas = [
    { id: 1, titulo: 'Tarea 1', estado: 'Pendiente' },
    { id: 2, titulo: 'Tarea 2', estado: 'Completada' }
  ]

  return (
    <Container className="mt-5">
      <h2>Tareas</h2>
      <Link href="/tareas/nueva">
        <Button className="mb-3">Nueva Tarea</Button>
      </Link>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Título</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {tareas.map((t) => (
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>{t.titulo}</td>
              <td>{t.estado}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  )
}

