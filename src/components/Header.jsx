// src/components/Header.jsx
import React from 'react'
import { Link } from 'react-scroll'
import logo from '../assets/logo.png'

export default function Header() {
  return (
    <header className="fixed top-0 w-full bg-pink-600 z-50 shadow">
      <div className="container mx-auto px-6 flex items-center h-16">
        {/* 
          Logo sempre visível.
          Ajustes de posição:
            - Mobile (padrão): relative, deslocado para a esquerda e para cima.
                •-left-2  → move 0.5rem para a esquerda
                •-top-2   → move 0.5rem para cima
            - Desktop (md+): volta ao fluxo normal (static) e sem offset.
        */}
      <img
        src={logo}
        alt="Logo Marta Murari Bronze"
        className="
          relative
            -left-4       /* mobile: 1rem para a esquerda */
            top-2         /* mobile: 0.5rem para baixo */
          h-20           /* mobile: 5rem de altura */
          mr-2
          md:-left-4     /* desktop: 2rem para a esquerda */
          md:top-1.5       /* desktop: sem offset vertical, centralizado */
          md:h-17        /* desktop: 4rem de altura */
        "
      />

        {/* Texto só no desktop */}
        <div className="hidden md:block text-white font-bold text-2xl">
          Marta Murari Bronze
        </div>

        <nav className="ml-auto flex space-x-6 text-white">
          <Link to="sobre" smooth className="cursor-pointer hover:text-pink-200">
            Sobre
          </Link>
          <Link to="servicos" smooth className="cursor-pointer hover:text-pink-200">
            Serviços
          </Link>
          <Link to="galeria" smooth className="cursor-pointer hover:text-pink-200">
            Galeria
          </Link>
          <Link to="contato" smooth className="cursor-pointer hover:text-pink-200">
            Contato
          </Link>
        </nav>
      </div>
    </header>
  )
}
