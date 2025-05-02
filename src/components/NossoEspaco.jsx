// src/components/NossoEspaco.jsx

import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function NossoEspaco() {
  const [fotos, setFotos] = useState([])
  const [lightboxImg, setLightboxImg] = useState(null)

  useEffect(() => {
    async function fetchEspaco() {
      const { data, error } = await supabase
        .from('espacos')
        .select('id, imagem')
        .order('created_at', { ascending: false })
      if (error) console.error('Erro ao buscar fotos do espaço:', error)
      else setFotos(data)
    }
    fetchEspaco()
  }, [])

  return (
    <section id="espaco" className="py-20 px-6 bg-pink-50">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h3 className="text-3xl font-semibold text-rose-700">Nosso Espaço</h3>
        <p className="mt-2 text-gray-700">
          Conheça o ambiente onde oferecemos nossos serviços com todo conforto e
          segurança.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-6 mb-16">
        {fotos.length > 0 ? (
          fotos.map((foto) => (
            <button
              key={foto.id}
              onClick={() => setLightboxImg(foto.imagem)}
              className="overflow-hidden rounded-lg shadow focus:outline-none"
            >
              <img
                src={foto.imagem}
                alt="Espaço Marta Bronze"
                className="w-full h-48 object-cover transform hover:scale-105 transition"
              />
            </button>
          ))
        ) : (
          <p className="text-gray-500 col-span-full">
            Não há fotos do espaço cadastradas.
          </p>
        )}
      </div>

      {/* Lightbox */}
      {lightboxImg && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
          onClick={() => setLightboxImg(null)}
        >
          <img
            src={lightboxImg}
            alt="Visualização ampliada do espaço"
            className="max-h-full max-w-full rounded-lg shadow-lg"
          />
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        <h3 className="text-3xl font-semibold text-rose-700 mb-4 text-center">
          Nossa Localização
        </h3>
        <div className="aspect-video w-full rounded-lg overflow-hidden shadow">
          <iframe
            title="Localização Marta Bronze"
            src="https://www.google.com/maps/embed?pb=!4v1746142580691!6m8!1m7!1sKtDOE9GjcARX_jA9CSwq2Q!2m2!1d-20.54865110063763!2d-47.37319080310605!3f256.6245784263526!4f-1.146465331605981!5f0.7820865974627469"
            className="w-full h-full border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  )
}
