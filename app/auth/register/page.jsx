'use client'
import { useState } from 'react'
import { Form, Button, Card, Container } from 'react-bootstrap'
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
      // Validamos si el nombre de usuario ya existe
      const checkRes = await fetch(`http://localhost:3001/users?username=${username}`)
      const existingUsers = await checkRes.json()
      if (existingUsers.length > 0) {
        alert('El nombre de usuario ya existe')
        setLoading(false)
        return
      }

      // Creamos el nuevo usuario
      const newUser = {
        username,
        password,
        role: 'user' // Por defecto, el rol es 'user'
      }

      // Enviamos la solicitud POST a la API
      const res = await fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
      })

      if (res.ok) {
        alert('Usuario registrado con éxito!')
        router.push('/') // Redirige al login después de un registro exitoso
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
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="p-4 shadow" style={{ width: '24rem' }}>
        <h2 className="text-center mb-4">Crear cuenta</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Usuario</Form.Label>
            <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} required/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} required/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Confirmar contraseña</Form.Label>
            <Form.Control type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required/>
          </Form.Group>
          <Button type="submit" variant="success" className="w-100" disabled={loading}>
            {loading ? 'Registrando...' : 'Registrarse'}
          </Button>
        </Form>
      </Card>
    </Container>
  )
}