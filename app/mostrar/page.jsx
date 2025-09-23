'use client'
import { useEffect, useState } from 'react'
import { Container, Card, Button, Form, Row, Col, Alert } from 'react-bootstrap'
import Link from 'next/link'

export default function ProyectosPage() {
  const [proyectos, setProyectos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editingId, setEditingId] = useState(null)
  const [editedTitle, setEditedTitle] = useState('')
  const [editedDescription, setEditedDescription] = useState('')

  useEffect(() => {
    fetchProyectos()
  }, [])

  const fetchProyectos = async () => {
    try {
      setLoading(true)
      const res = await fetch('http://localhost:3001/projects')
      if (!res.ok) {
        throw new Error('Error al obtener los proyectos.')
      }
      const data = await res.json()
      setProyectos(data)
    } catch (err) {
      setError(err.message || 'Error de conexión con el servidor.')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:3001/projects/${id}`, {
        method: 'DELETE',
      })
      if (!res.ok) {
        throw new Error('Error al eliminar el proyecto.')
      }
      // Actualiza la UI eliminando el proyecto del estado local
      setProyectos(proyectos.filter(p => p.id !== id))
      alert('Proyecto eliminado con éxito.')
    } catch (err) {
      setError(err.message || 'Hubo un problema al eliminar el proyecto.')
    }
  }

  const handleUpdate = async (e, id) => {
    e.preventDefault()
    try {
      const projectToUpdate = proyectos.find(p => p.id === id)
      const updatedProject = { 
        ...projectToUpdate, 
        name: editedTitle, 
        description: editedDescription 
      }

      const res = await fetch(`http://localhost:3001/projects/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProject),
      })

      if (!res.ok) {
        throw new Error('Error al actualizar el proyecto.')
      }

      // Actualiza la UI con los nuevos datos
      setProyectos(proyectos.map(p => p.id === id ? updatedProject : p))
      setEditingId(null) // Sale del modo de edición
      alert('Proyecto actualizado con éxito.')
    } catch (err) {
      setError(err.message || 'Hubo un problema al actualizar el proyecto.')
    }
  }

  const startEditing = (project) => {
    setEditingId(project.id)
    setEditedTitle(project.name)
    setEditedDescription(project.description)
  }

  if (loading) return <Container className="mt-5">Cargando proyectos...</Container>
  if (error) return <Container className="mt-5"><Alert variant="danger">{error}</Alert></Container>

  return (
    <Container className="mt-5">
      <Row className="mb-3">
      <Col>
        <Link href="/dashboard">
          <Button variant="secondary">⬅ Volver al Panel de Control</Button>
        </Link>
      </Col>
    </Row>
      <Row className="mb-3">
        <Col>
          <h2>Lista de Proyectos</h2>
        </Col>
      </Row>

      {proyectos.length === 0 ? (
        <Alert variant="info">No hay proyectos para mostrar. <Link href="/nuevo-proyecto">Crea uno</Link>.</Alert>
      ) : (
        proyectos.map((p) => (
          <Card key={p.id} className="mb-3">
            <Card.Body>
              {editingId === p.id ? (
                <Form onSubmit={(e) => handleUpdate(e, p.id)}>
                  <Form.Group className="mb-2">
                    <Form.Control
                      type="text"
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={editedDescription}
                      onChange={(e) => setEditedDescription(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Button type="submit" variant="success" className="me-2">Guardar</Button>
                  <Button variant="secondary" onClick={() => setEditingId(null)}>Cancelar</Button>
                </Form>
              ) : (
                <>
                  <Card.Title>{p.name}</Card.Title>
                  <Card.Text>{p.description}</Card.Text>
                  <Button variant="primary" className="me-2" onClick={() => startEditing(p)}>
                    Editar
                  </Button>
                  <Button variant="danger" onClick={() => handleDelete(p.id)}>
                    Eliminar
                  </Button>
                  <Link href={`/proyectos/${p.id}`} className="text-decoration-none">
                  <Button variant="info">Ver Tareas</Button>
                </Link>
                </>
              )}
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
  )
}