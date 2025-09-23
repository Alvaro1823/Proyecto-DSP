'use client'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Container, Card, Button, Row, Col, Alert } from 'react-bootstrap'
import Link from 'next/link'

export default function ProyectoDetallePage() {
  const { id } = useParams()
  const [proyecto, setProyecto] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchProyecto()
  }, [id])

  const fetchProyecto = async () => {
    try {
      const res = await fetch(`http://localhost:3001/projects/${id}`)
      if (!res.ok) throw new Error('Proyecto no encontrado')
      const data = await res.json()
      setProyecto(data)
    } catch (err) {
      setError(err.message || 'Error al obtener proyecto')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <Container className="mt-5 text-center">Cargando proyecto...</Container>
  if (error) return <Container className="mt-5"><Alert variant="danger">{error}</Alert></Container>

  return (
    <Container className="my-5">
      <Row className="mb-4">
        <Col>
          <h2>{proyecto.name}</h2>
          <p>{proyecto.description}</p>
          <Link href="/proyectos">
            <Button variant="secondary">⬅ Volver a Proyectos</Button>
          </Link>
        </Col>
      </Row>

      {/* Aquí luego podemos agregar la sección de Tareas del proyecto */}
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <p>Aquí aparecerán las tareas asignadas a este proyecto (próximo paso).</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
