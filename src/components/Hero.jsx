// src/components/Hero.jsx

import React from 'react';
import promoBg from '../assets/promo.png';

export default function Hero() {
  return (
    <section id="hero" className="relative w-full md:-mt-16">
      {/* 1) Imagem full-width sem corte */}
      <img
        src={promoBg}
        alt="Mulheres bronzeando ao sol"
        className="w-full h-auto block"
      />

      {/* 2) Overlay de texto */}
      <div className="static md:absolute md:inset-0 flex items-center justify-center px-6">
        <div className="max-w-3xl bg-white bg-opacity-80 p-10 rounded">
          <h2 className="text-5xl font-bold text-rose-700 mb-4">
            Marquinha de Respeito
          </h2>
          <p className="text-gray-800 mb-6">
            Bronzeamento natural e artificial com técnica, cuidado e resultado.
            Atendimento profissional e personalizado.
          </p>
          <a
            href="https://wa.me/5516992115919"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-rose-600 text-white py-3 px-6 rounded-full hover:bg-rose-700 transition"
          >
            Agendar pelo WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
