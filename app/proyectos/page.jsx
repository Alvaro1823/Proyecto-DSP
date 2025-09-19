'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Container, Card, Button, Form, Row, Col } from 'react-bootstrap'

export default function ProyectosPage() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [newTitle, setNewTitle] = useState('')

  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then(json => {
        setData(json)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) return <Container className="mt-5">Cargando...</Container>
  if (!data) return <Container className="mt-5">No hay datos</Container>

  const addProject = (e) => {
    e.preventDefault()
    if (!newTitle) return
    const newProject = { id: Date.now(), nombre: newTitle, descripcion: '' }
    // actualizamos solo en memoria
    setData({ ...data, proyectos: [...data.proyectos, newProject] })
    setNewTitle('')
  }

  return (
    <Container className="mt-5">
      <Row className="mb-3">
        <Col>
          <h2>Proyectos</h2>
        </Col>
      </Row>

      <Form onSubmit={addProject} className="d-flex mb-3">
        <Form.Control
          type="text"
          placeholder="Nuevo proyecto"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <Button type="submit" variant="success" className="ms-2">Agregar</Button>
      </Form>

      {data.proyectos.map((p) => (
        <Card key={p.id} className="mb-2 p-2">
          <Card.Body>
            <Card.Title>{p.nombre}</Card.Title>
            <Card.Text>{p.descripcion}</Card.Text>
            <Link href={`/proyectos/${p.id}`} className="text-decoration-none">
              <Button variant="primary">Ver Tareas</Button>
            </Link>
          </Card.Body>
        </Card>
      ))}
    </Container>
  )
}
