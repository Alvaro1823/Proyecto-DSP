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

  const [nuevoNombre, setNuevoNombre] = useState('')
  const [nuevaDescripcion, setNuevaDescripcion] = useState('')
  const [loadingNuevo, setLoadingNuevo] = useState(false)
  const [errorNuevo, setErrorNuevo] = useState(null)

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
    if (!window.confirm('¿Estás seguro de que quieres eliminar este proyecto?')) {
      return
    }
    try {
      const res = await fetch(`http://localhost:3001/projects/${id}`, {
        method: 'DELETE',
      })
      if (!res.ok) {
        throw new Error('Error al eliminar el proyecto.')
      }
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

      setProyectos(proyectos.map(p => p.id === id ? updatedProject : p))
      setEditingId(null)
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

  const handleSubmitNuevoProyecto = async (e) => {
    e.preventDefault()
    setLoadingNuevo(true)
    setErrorNuevo(null)

    try {
      const nuevoProyecto = {
        name: nuevoNombre,
        description: nuevaDescripcion,
        managerId: 1,
        generalProgress: 0
      }

      const res = await fetch('http://localhost:3001/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevoProyecto)
      })

      if (res.ok) {
        alert('Proyecto creado con éxito!')
        setNuevoNombre('')
        setNuevaDescripcion('')
        fetchProyectos()
      } else {
        throw new Error('Error al crear el proyecto.')
      }
    } catch (err) {
      setErrorNuevo(err.message || 'Error de conexión con el servidor.')
    } finally {
      setLoadingNuevo(false)
    }
  }

  if (loading) return <Container className="mt-5 text-center">Cargando proyectos...</Container>
  if (error) return <Container className="mt-5"><Alert variant="danger">{error}</Alert></Container>

  return (
    <Container className="my-5">
      <Row className="mb-4 text-center">
        <Col>
          <h1 className="fw-bold text-primary">Gestor de Proyectos</h1>
          <p className="lead text-muted">Crea y administra tus proyectos y tareas fácilmente.</p>
        </Col>
      </Row>

      ---

      {/* Sección de Creación de Nuevo Proyecto */}
      <Row className="mb-5">
        <Col md={{ span: 8, offset: 2 }}>
          <Card className="shadow-sm">
            <Card.Body>
              <h4 className="card-title text-center">Nuevo Proyecto</h4>
              {errorNuevo && <Alert variant="danger">{errorNuevo}</Alert>}
              <Form onSubmit={handleSubmitNuevoProyecto}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control 
                    value={nuevoNombre} 
                    onChange={(e) => setNuevoNombre(e.target.value)} 
                    required 
                    placeholder="Nombre del proyecto"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Descripción</Form.Label>
                  <Form.Control 
                    as="textarea" 
                    rows={3} 
                    value={nuevaDescripcion} 
                    onChange={(e) => setNuevaDescripcion(e.target.value)} 
                    required 
                    placeholder="Describe el proyecto aquí..."
                  />
                </Form.Group>
                <div className="d-grid">
                  <Button 
                    type="submit" 
                    variant="primary" 
                    disabled={loadingNuevo}
                  >
                    {loadingNuevo ? 'Guardando...' : 'Crear Proyecto'}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      ---

      {/* Sección de Lista de Proyectos */}
      <Row className="mb-4">
        <Col>
          <h2 className="text-center mb-4">Lista de Proyectos</h2>
        </Col>
      </Row>
      {proyectos.length === 0 ? (
        <Alert variant="info" className="text-center">No hay proyectos para mostrar. ¡Crea uno!</Alert>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {proyectos.map((p) => (
            <Col key={p.id}>
              <Card className="h-100 shadow-sm transition-all hover-shadow-lg">
                <Card.Body className="d-flex flex-column">
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
                      <div className="d-flex justify-content-end">
                        <Button type="submit" variant="success" size="sm" className="me-2">Guardar</Button>
                        <Button variant="secondary" size="sm" onClick={() => setEditingId(null)}>Cancelar</Button>
                      </div>
                    </Form>
                  ) : (
                    <>
                      <Card.Title className="text-truncate">{p.name}</Card.Title>
                      <Card.Text className="text-muted flex-grow-1">{p.description}</Card.Text>
                      <div className="mt-auto d-flex justify-content-between align-items-center">
                        <Link href={`/proyectos/${p.id}`} passHref>
                          <Button variant="info" size="sm">Ver Tareas</Button>
                        </Link>
                        <div>
                          <Button variant="outline-secondary" size="sm" className="me-2" onClick={() => startEditing(p)}>
                            Editar
                          </Button>
                          <Button variant="outline-danger" size="sm" onClick={() => handleDelete(p.id)}>
                            Eliminar
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  )
}