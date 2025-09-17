import Link from 'next/link'


export default function ProjectsPage(){
return (
<div>
<h1>Proyectos</h1>
<p><Link href="/projects/new">Crear proyecto</Link></p>
<div id="projects-list">{/* Aquí irá la lista de proyectos */}</div>
</div>
)
}