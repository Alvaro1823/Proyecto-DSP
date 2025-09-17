'use client'
import { useState } from 'react'
import Link from 'next/link'


export default function LoginPage() {
const [email,setEmail]=useState('')
const [password,setPassword]=useState('')
const handleSubmit = (e) => { e.preventDefault(); alert('Enviar login (por implementar)') }
return (
<div>
<h2>Iniciar sesión</h2>
<form onSubmit={handleSubmit}>
<label style={{display:'block',margin:'8px 0'}}>Email <input value={email} onChange={e=>setEmail(e.target.value)} /></label>
<label style={{display:'block',margin:'8px 0'}}>Contraseña <input type="password" value={password} onChange={e=>setPassword(e.target.value)} /></label>
<button type="submit">Entrar</button>
</form>
<p>¿No tienes cuenta? <Link href="/auth/register">Regístrate</Link></p>
</div>
)
}