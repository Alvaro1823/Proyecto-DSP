import Link from 'next/link'


export default function Header(){
return (
<header style={{borderBottom:'1px solid #ddd',padding:'12px 0'}}>
<nav style={{display:'flex',gap:'12px'}}>
<Link href="/">Home</Link>
<Link href="/dashboard">Dashboard</Link>
<Link href="/projects">Proyectos</Link>
<Link href="/auth/login">Login</Link>
</nav>
</header>
)
}