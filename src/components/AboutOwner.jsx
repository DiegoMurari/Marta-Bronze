// src/components/AboutOwner.jsx
import React from 'react'
import ownerPhoto from '../assets/owner.png' // sua foto aqui

export default function AboutOwner() {
  return (
    <section id="sobre" className="py-20 px-6 bg-pink-600">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-start md:items-center md:space-x-8">
        {/* Foto à esquerda em todos os tamanhos */}
        <div className="w-40 h-40 md:w-56 md:h-56 mb-6 md:mb-0 flex-shrink-0">
          <img
            src={ownerPhoto}
            alt="Marta Murari"
            className="w-full h-full object-cover rounded-full border-4 border-white"
          />
        </div>

        {/* Texto */}
        <div className="text-white text-left">
          <h3 className="text-3xl font-semibold mb-4">
            Sobre a Marta Murari
          </h3>
          <p className="mb-4 leading-relaxed">
            Com mais de 10 anos de experiência em bronzeamento natural e artificial,  
            Marta Murari alia técnica, segurança e cuidado personalizado para entregar  
            resultados impecáveis. Apaixonada pelo que faz, ela transforma cada atendimento  
            em uma experiência única de bem-estar e autoestima.
          </p>
          <a
            href="https://www.instagram.com/martambronze/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-pink-600 font-medium py-2 px-6 rounded-full hover:bg-pink-100 transition"
          >
            Siga no Instagram
          </a>
        </div>
      </div>
    </section>
  )
}
