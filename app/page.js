'use client'
import Link from 'next/link'
import { Container, Row, Col, Button, Card } from 'react-bootstrap'

export default function HomePage() {
  return (

    <main className="d-flex align-items-center justify-content-center vh-100">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow-lg text-center p-5">
              <h1 className="display-5 mb-3">Gestor de Proyectos</h1>
              <p className="lead mb-4">
                Bienvenido al sistema de gestión de proyectos y tareas. 
                Inicia sesión o regístrate.
              </p>
              <div className="d-flex justify-content-center">
                <Link href="/auth/login" className="btn btn-primary btn-lg me-3">
                  Iniciar sesión
                </Link>
                <Link href="/auth/register" className="btn btn-success btn-lg">
                  Registrarse
                </Link>
              </div>
          
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

//import Link from 'next/link'

//export default function Home() {
//return (
//<div>
//<h1>Gestor de Proyectos</h1>
//<p>Bienvenido. <Link href="/auth/login">Iniciar sesión</Link> o <Link href="/auth/register">Registrarse</Link></p>
//</div>
//)
//}=======
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
main
