import Link from 'next/link'


export default function Home() {
return (
<div>
<h1>Gestor de Proyectos</h1>
<p>Bienvenido. <Link href="/auth/login">Iniciar sesión</Link> o <Link href="/auth/register">Registrarse</Link></p>
</div>
)
}