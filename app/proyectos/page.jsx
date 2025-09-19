'use client'

import Link from 'next/link'
import { Container, Row, Col, Button, Card } from 'react-bootstrap'

export default function ProyectosPage() 
{
  return (
    <Container className="mt-5">
      <Row className="mb-4">
        <Col>
          <h2>Mis Proyectos</h2>
        </Col>
        <Col className="text-end">
          <Link href="/dashboard">
            <Button variant="secondary">⬅ Volver al Dashboard</Button>
          </Link>
        </Col>
      </Row>

      {/* Aquí lista de proyectos (se puede mejorar luego) */}
      <Card className="p-3 shadow-sm">
        <Card.Body>
          <Card.Title>Proyecto de Ejemplo</Card.Title>
          <Card.Text>Descripción breve del proyecto.</Card.Text>
          <Button variant="primary">Ver Detalles</Button>
        </Card.Body>
      </Card>
    </Container>
  )
}

