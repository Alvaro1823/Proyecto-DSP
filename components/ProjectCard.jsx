export default function ProjectCard({project}){
return (
<article style={{border:'1px solid #ddd',padding:12,borderRadius:6}}>
<h3>{project?.name || 'Proyecto demo'}</h3>
<p>{project?.description || ''}</p>
</article>
)
}