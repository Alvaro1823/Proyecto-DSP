'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

export default function DashboardPage() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    fetch('/data.json')
      .then((res) => {
        if (!res.ok) throw new Error('Error al cargar data.json')
        return res.json()
      })
      .then((json) => {
        setData(json)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" />
      </Container>
    )
  }

  if (error) {
    return (
      <Container className="mt-5">
        <p className="text-danger">Error: {error}</p>
      </Container>
    )
  }

  // conteos para el gráfico
  const pendientes = data.tareas.filter((t) => t.estado === 'Pendiente').length
  const completadas = data.tareas.filter((t) => t.estado === 'Completada').length

  const chartData = [
    { name: 'Pendientes', value: pendientes },
    { name: 'Completadas', value: completadas }
  ]

  return (
    <Container className="mt-4">
      <h2>Panel de Control</h2>

      <Row className="mt-4">
        <Col md={6} className="mb-3">
          <Card>
            <Card.Body>
              <Card.Title>Proyectos</Card.Title>
              <Card.Text>Tienes {data.proyectos.length} proyecto(s)</Card.Text>
              <Link href="/proyectos/" className="text-decoration-none">
                <Button variant="primary">Ver proyectos</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} className="mb-3">
          <Card>
            <Card.Body>
              <Card.Title>Tareas</Card.Title>
              <Card.Text>
                {pendientes} pendientes · {completadas} completadas
              </Card.Text>
              <Link href="/mostrar/" className="text-decoration-none">
                <Button variant="success">Ver tareas</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <h4>Progreso de Tareas</h4>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#0d6efd" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Col>
      </Row>
    </Container>
  )
}
