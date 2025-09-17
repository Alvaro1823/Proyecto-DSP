import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Header from '@/components/Header'


export const metadata = {
title: 'Gestor de Proyectos'
}


export default function RootLayout({ children }) {
return (
<html lang="es">
<body>
<Header />
<main className="container mx-auto p-4">{children}</main>
</body>
</html>
)
}