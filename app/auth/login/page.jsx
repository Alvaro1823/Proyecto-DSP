'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('http://localhost:3001/users')
      const users = await res.json()

      const user = users.find(u => u.username === username && u.password === password)

      if (user) {
        localStorage.setItem('user', JSON.stringify({ id: user.id, username: user.username, role: user.role }))
        router.push('/dashboard')
      } else {
        alert('Usuario o contraseña incorrectos')
      }
    } catch (err) {
      console.error('Error al autenticar:', err)
      alert('Error al conectar con el servidor')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div 
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={4}>
            <Card className="p-4 shadow-lg border-0 rounded-4" style={{ backgroundColor: '#ffffffdd' }}>
              <div className="text-center mb-4">
                <h2 className="fw-bold mt-2" style={{ color: '#2575fc' }}>Bienvenido</h2>
                <p className="text-muted" style={{ fontSize: '0.9rem' }}>Ingrese sus credenciales para continuar</p>
              </div>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Usuario</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Ingrese su usuario"
                    value={username} 
                    onChange={e => setUsername(e.target.value)} 
                    required 
                  />
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label className="fw-semibold">Contraseña</Form.Label>
                  <Form.Control 
                    type="password" 
                    placeholder="Ingrese su contraseña"
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    required 
                  />
                </Form.Group>
                <Button 
                  type="submit" 
                  variant="primary" 
                  className="w-100 py-2 fw-bold rounded-pill"
                  style={{ background: 'linear-gradient(45deg, #2575fc, #6a11cb)', border: 'none' }}
                  disabled={loading}
                >
                  {loading ? 'Validando...' : 'Entrar'}
                </Button>
              </Form>
              <p className="text-center mt-3 mb-0" style={{ fontSize: '0.85rem', color: '#6c757d' }}>
                ¿Olvidó su contraseña? <a href="#" style={{ color: '#2575fc', textDecoration: 'none' }}>Recupérela aquí</a>
              </p>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
