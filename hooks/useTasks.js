export async function getTasks(projectId){
const res = await fetch(`/api/projects/${projectId}/tasks`)
if(!res.ok) throw new Error('Error al cargar tareas')
return res.json()
}