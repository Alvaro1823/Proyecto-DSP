export async function getProjects(){
const res = await fetch('/api/projects')
if(!res.ok) throw new Error('Error al cargar proyectos')
return res.json()
}