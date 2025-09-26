'use client'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { Container, Card, Form, Button, Alert, Row, Col } from 'react-bootstrap'

export default function TareasPage() {
  const router = useRouter()
  const { projectId } = router.query // Get projectId from the URL
  
  const [tareas, setTareas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [nuevaDescripcion, setNuevaDescripcion] = useState('')
  const [loadingNuevo, setLoadingNuevo] = useState(false)
  const [errorNuevo, setErrorNuevo] = useState(null)

  useEffect(() => {
    if (projectId) {
      fetchTareas()
    }
  }, [projectId])

  const fetchTareas = async () => {
    try {
      setLoading(true)
      const res = await fetch(`http://localhost:3001/tasks?projectId=${projectId}`)
      if (!res.ok) {
        throw new Error('Error al obtener las tareas.')
      }
      const data = await res.json()
      setTareas(data)
    } catch (err) {
      setError(err.message || 'Error de conexión con el servidor.')
    } finally {
      setLoading(false)
    }
  }

  const handleCrearTarea = async (e) => {
    e.preventDefault()
    setLoadingNuevo(true)
    setErrorNuevo(null)

    try {
      const nuevaTarea = {
        description: nuevaDescripcion,
        projectId: parseInt(projectId),
        completed: false,
        priority: 'media'
      }

      const res = await fetch('http://localhost:3001/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevaTarea)
      })

      if (res.ok) {
        alert('Tarea creada con éxito!')
        setNuevaDescripcion('')
        fetchTareas() // Refresh the list
      } else {
        throw new Error('Error al crear la tarea.')
      }
    } catch (err) {
      setErrorNuevo(err.message || 'Error de conexión.')
    } finally {
      setLoadingNuevo(false)
      fetchTareas() // This will refresh the task list after creation, regardless of success.
    }
  }

  if (loading) return <Container className="mt-5 text-center">Cargando tareas...</Container>
  if (error) return <Container className="mt-5"><Alert variant="danger">{error}</Alert></Container>

  return (
    <Container className="my-5">
      <Row className="mb-4 text-center">
        <Col>
          <h1 className="fw-bold text-primary">Tareas del Proyecto #{projectId}</h1>
          <p className="lead text-muted">Aquí puedes gestionar las tareas de este proyecto.</p>
        </Col>
      </Row>

      ---

      {/* Sección para crear nueva tarea */}
      <Row className="mb-5">
        <Col md={{ span: 8, offset: 2 }}>
          <Card className="shadow-sm">
            <Card.Body>
              <h4 className="card-title text-center">Nueva Tarea</h4>
              {errorNuevo && <Alert variant="danger">{errorNuevo}</Alert>}
              <Form onSubmit={handleCrearTarea}>
                <Form.Group className="mb-3">
                  <Form.Label>Descripción de la Tarea</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={nuevaDescripcion}
                    onChange={(e) => setNuevaDescripcion(e.target.value)}
                    required
                    placeholder="Describe la tarea aquí..."
                  />
                </Form.Group>
                <div className="d-grid">
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={loadingNuevo}
                  >
                    {loadingNuevo ? 'Guardando...' : 'Crear Tarea'}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      ---

      {/* Sección de Lista de Tareas */}
      <Row className="mb-4">
        <Col>
          <h2 className="text-center mb-4">Lista de Tareas</h2>
        </Col>
      </Row>
      {tareas.length === 0 ? (
        <Alert variant="info" className="text-center">No hay tareas para este proyecto. ¡Crea una!</Alert>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {tareas.map((t) => (
            <Col key={t.id}>
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Text>{t.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  )
}