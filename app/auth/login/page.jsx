


'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Form, Button, Card, Container } from 'react-bootstrap'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      // Modificamos el endpoint para conectarnos a la API de JSON Server
      const res = await fetch('http://localhost:3001/users')
      const users = await res.json()

      // Buscamos un usuario que coincida con el nombre de usuario y la contraseña
      const user = users.find(u => u.username === username && u.password === password)

      if (user) {
        // Guardamos los datos del usuario en el almacenamiento local
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
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="p-4 shadow" style={{ width: '24rem' }}>
        <h2 className="text-center mb-4">Iniciar sesión</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Usuario</Form.Label>
            <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} required />
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

