// src/components/Contact.jsx
import React from 'react'
import { FaWhatsapp, FaInstagram } from 'react-icons/fa'

export default function Contact() {
  return (
    <footer id="contato" className="bg-white py-12 px-6">
      <div className="max-w-6xl mx-auto text-center space-y-4">
        <h3 className="text-2xl font-semibold text-rose-700">Contato</h3>
        <div className="flex flex-col md:flex-row justify-center items-center gap-6">
          <a
            href="https://wa.me/5516992115919"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-gray-800 hover:text-green-600"
          >
            <FaWhatsapp className="text-2xl mr-2" />
            <span>(16) 99211-5919</span>
          </a>
          <a
            href="https://instagram.com/Martambronze"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-gray-800 hover:text-pink-600"
          >
            <FaInstagram className="text-2xl mr-2" />
            <span>@Martambronze</span>
          </a>
        </div>
      </div>
    </footer>
  )
}
