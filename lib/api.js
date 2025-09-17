export async function fetcher(url, options){
const res = await fetch(url, options)
if(!res.ok) throw new Error('Network error')
return res.json()
}