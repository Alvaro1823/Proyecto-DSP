'use client'
import { useState } from 'react'
import { Form, Button, Card, Container } from 'react-bootstrap'

export default function RegisterPage() {
  const [usuario, setUsuario] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if(password !== confirmPassword) {
      alert('Las contraseñas no coinciden')
      return
    }
    alert(`Registrar usuario: ${usuario} (por implementar)`)
  }

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="p-4 shadow" style={{ width: '24rem' }}>
        <h2 className="text-center mb-4">Crear cuenta</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Usuario</Form.Label>
            <Form.Control type="text" value={usuario} onChange={e => setUsuario(e.target.value)} required/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} required/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Confirmar contraseña</Form.Label>
            <Form.Control type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required/>
          </Form.Group>
          <Button type="submit" variant="success" className="w-100">Registrarse</Button>
        </Form>
      </Card>
    </Container>
  )
}
