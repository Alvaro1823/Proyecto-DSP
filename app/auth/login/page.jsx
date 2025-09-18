'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Form, Button, Card, Container } from 'react-bootstrap'

export default function LoginPage() {
  const [usuario, setUsuario] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/data.json')
      const json = await res.json()
      const user = json.usuarios.find(u => u.usuario === usuario && u.password === password)
      if (user) {
        // aquí podrías setear un "session" en localStorage o context (demo)
        localStorage.setItem('user', JSON.stringify({ id: user.id, usuario: user.usuario }))
        router.push('/dashboard')
      } else {
        alert('Usuario o contraseña incorrectos')
      }
    } catch (err) {
      alert('Error al autenticar')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="p-4 shadow" style={{ width: '24rem' }}>
        <h2 className="text-center mb-4">Iniciar sesión</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Usuario</Form.Label>
            <Form.Control type="text" value={usuario} onChange={e => setUsuario(e.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          </Form.Group>
          <Button type="submit" variant="primary" className="w-100" disabled={loading}>
            {loading ? 'Validando...' : 'Entrar'}
          </Button>
        </Form>
      </Card>
    </Container>
  )
}

