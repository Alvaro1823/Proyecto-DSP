'use client'
import { useState } from 'react'


export default function NewProject(){
const [name,setName]=useState('')
const [description,setDescription]=useState('')
const handleSubmit = (e) => { e.preventDefault(); alert('Crear proyecto (por implementar)') }
return (
<div>
<h1>Crear Proyecto</h1>
<form onSubmit={handleSubmit}>
<label>Nombre<input value={name} onChange={e=>setName(e.target.value)} /></label>
<label>Descripción<input value={description} onChange={e=>setDescription(e.target.value)} /></label>
<button type="submit">Crear</button>
</form>
</div>
)
}