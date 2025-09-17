'use client'
import { useState } from 'react'
import Link from 'next/link'


export default function RegisterPage(){
const [name,setName]=useState('')
const [email,setEmail]=useState('')
const [password,setPassword]=useState('')
const handleSubmit = (e) => { e.preventDefault(); alert('Enviar registro (por implementar)') }
return (
<div>
<h2>Registro</h2>
<form onSubmit={handleSubmit}>
<label style={{display:'block',margin:'8px 0'}}>Nombre <input value={name} onChange={e=>setName(e.target.value)} /></label>
<label style={{display:'block',margin:'8px 0'}}>Email <input value={email} onChange={e=>setEmail(e.target.value)} /></label>
<label style={{display:'block',margin:'8px 0'}}>Contraseña <input type="password" value={password} onChange={e=>setPassword(e.target.value)} /></label>
<button type="submit">Crear cuenta</button>
</form>
<p>¿Ya tienes cuenta? <Link href="/auth/login">Iniciar sesión</Link></p>
</div>
)
}