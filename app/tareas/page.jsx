'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap'

export default function TareasPage() {
  const [usuarios, setUsuarios] = useState(['Juan', 'María']) // usuarios iniciales
  const [tareas, setTareas] = useState([])
  const [tarea, setTarea] = useState('')
  const [usuario, setUsuario] = useState('')
  const [nuevoUsuario, setNuevoUsuario] = useState('')

  const handleAddTarea = (e) => {
    e.preventDefault()
    let asignado = usuario
    if (nuevoUsuario) {
      setUsuarios([...usuarios, nuevoUsuario])
      asignado = nuevoUsuario
    }
    setTareas([...tareas, { nombre: tarea, asignado }])
    setTarea('')
    setUsuario('')
    setNuevoUsuario('')
  }

  return (
    <Container className="mt-5">
      <Row className="mb-4">
        <Col>
          <h2>Gestión de Tareas</h2>
        </Col>
        <Col className="text-end">
          <Link href="/dashboard">
            <Button variant="secondary">⬅ Volver al Dashboard</Button>
          </Link>
        </Col>
      </Row>

      {/* Formulario para agregar tareas */}
      <Form onSubmit={handleAddTarea} className="mb-4">
        <Row>
          <Col md={4}>
            <Form.Control
              type="text"
              placeholder="Nueva tarea"
              value={tarea}
              onChange={(e) => setTarea(e.target.value)}
              required
            />
          </Col>
          <Col md={3}>
            <Form.Select value={usuario} onChange={(e) => setUsuario(e.target.value)}>
              <option value="">-- Seleccionar Usuario --</option>
              {usuarios.map((u, idx) => (
                <option key={idx} value={u}>{u}</option>
              ))}
            </Form.Select>
          </Col>
          <Col md={3}>
            <Form.Control
              type="text"
              placeholder="Agregar nuevo usuario"
              value={nuevoUsuario}
              onChange={(e) => setNuevoUsuario(e.target.value)}
            />
          </Col>
          <Col md={2}>
            <Button type="submit" variant="success" className="w-100">
              Agregar
            </Button>
          </Col>
        </Row>
      </Form>

      {/* Tabla de tareas */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Tarea</th>
            <th>Asignado a</th>
          </tr>
        </thead>
        <tbody>
          {tareas.map((t, idx) => (
            <tr key={idx}>
              <td>{t.nombre}</td>
              <td>{t.asignado}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  )
}

