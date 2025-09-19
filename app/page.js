'use client'
import Link from 'next/link'
import { Container, Row, Col, Button, Card } from 'react-bootstrap'

export default function HomePage() {
  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row>
        <Col>
          <Card className="text-center p-5 shadow-lg">
            <Card.Body>
              <Card.Title as="h1" className="mb-4">
                Gestor de Proyectos
              </Card.Title>
              <Card.Text className="mb-4">
                Bienvenido al sistema de gestión de proyectos y tareas. 
                Inicia sesión o regístrate para comenzar.
              </Card.Text>
              <div>
                <Link href="/auth/login">
                  <Button variant="primary" className="me-3">
                    Iniciar Sesión
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button variant="success">
                    Registrarse
                  </Button>
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
