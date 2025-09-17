export default function TaskItem({task}){
return (
<div style={{border:'1px solid #eee',padding:8,borderRadius:6}}>
<strong>{task?.title || 'Tarea demo'}</strong>
<p>{task?.status || 'todo'}</p>
</div>
)
}