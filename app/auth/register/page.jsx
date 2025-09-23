'use client'
import { useState } from 'react'
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden')
      setLoading(false)
      return
    }

    try {
      // Validar si existe el usuario
      const checkRes = await fetch(`http://localhost:3001/users?username=${username}`)
      const existingUsers = await checkRes.json()
      if (existingUsers.length > 0) {
        alert('El nombre de usuario ya existe')
        setLoading(false)
        return
      }

      // Crear nuevo usuario
      const newUser = {
        username,
        password,
        role: 'user'
      }

      const res = await fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
      })

      if (res.ok) {
        alert('Usuario registrado con éxito!')
        router.push('/') // Redirigir al login
      } else {
        alert('Error al registrar usuario')
      }

    } catch (err) {
      console.error('Error:', err)
      alert('Error al conectar con el servidor')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div 
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', // verde degradado
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
                <h2 className="fw-bold mt-2" style={{ color: '#11998e' }}>Crear cuenta</h2>
                <p className="text-muted" style={{ fontSize: '0.9rem' }}>Complete los campos para registrarse</p>
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
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Contraseña</Form.Label>
                  <Form.Control 
                    type="password" 
                    placeholder="Ingrese su contraseña"
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label className="fw-semibold">Confirmar contraseña</Form.Label>
                  <Form.Control 
                    type="password" 
                    placeholder="Confirme su contraseña"
                    value={confirmPassword} 
                    onChange={e => setConfirmPassword(e.target.value)} 
                    required
                  />
                </Form.Group>
                <Button 
                  type="submit" 
                  variant="success" 
                  className="w-100 py-2 fw-bold rounded-pill"
                  style={{ background: 'linear-gradient(45deg, #38ef7d, #11998e)', border: 'none' }}
                  disabled={loading}
                >
                  {loading ? 'Registrando...' : 'Registrarse'}
                </Button>
              </Form>
              <p className="text-center mt-3 mb-0" style={{ fontSize: '0.85rem', color: '#6c757d' }}>
                ¿Ya tienes cuenta? <a href="/" style={{ color: '#11998e', textDecoration: 'none' }}>Inicia sesión aquí</a>
              </p>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
