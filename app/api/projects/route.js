import { NextResponse } from 'next/server'


export async function GET(){
const sample = [{ id: '1', name: 'Proyecto demo' }]
return NextResponse.json(sample)
}


export async function POST(request){
const data = await request.json()
return NextResponse.json({ message: 'Proyecto creado', project: data }, { status: 201 })
}