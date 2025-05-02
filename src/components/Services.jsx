import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Services() {
  const [servicos, setServicos] = useState([])
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    async function fetchServicos() {
      const { data, error } = await supabase.from('servicos').select('*')
      if (error) console.error(error)
      else setServicos(data)
    }
    fetchServicos()
  }, [])

  const formatPrice = (value) => {
    const num =
      typeof value === 'string'
        ? parseFloat(value.replace(',', '.')) || 0
        : value
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(num)
  }

  const truncate = (text, max = 80) =>
    text.length > max ? text.slice(0, max).trimEnd() + '...' : text

  return (
    <section id="servicos" className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto text-center mb-8">
        <h2 className="text-3xl font-semibold text-rose-700">Nossos Serviços</h2>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {servicos.map((item) => {
          const isLong = item.descricao.length > 80
          return (
            <button
              key={item.id}
              onClick={() => setSelected(item)}
              className="
                flex flex-col 
                bg-white rounded-xl shadow-md hover:shadow-lg transition 
                p-4 md:p-6 
                text-left
              "
            >
              {/* altura menor no mobile, maior a partir de md */}
              {item.imagem ? (
                <img
                  src={item.imagem}
                  alt={item.titulo}
                  className="
                    w-full 
                    h-32 md:h-48 
                    object-cover rounded mb-4
                  "
                />
              ) : (
                <div className="w-full h-32 md:h-48 bg-gray-100 rounded mb-4 flex items-center justify-center">
                  <span className="text-gray-400">Sem imagem</span>
                </div>
              )}

              <h3 className="text-lg font-semibold text-rose-600 mb-2 text-center">
                {item.titulo}
              </h3>

              <p
                className="text-gray-700 mb-4 text-center overflow-hidden"
                style={{
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: window.innerWidth < 768 ? 1 : 2,
                }}
              >
                {truncate(item.descricao, 80)}
                {isLong && <span className="font-medium"> Veja mais</span>}
              </p>

              <span className="block text-rose-700 font-bold text-lg text-center">
                {formatPrice(item.preco)}
              </span>
            </button>
          )
        })}
      </div>

      {selected && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-lg overflow-hidden max-w-3xl w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-3 right-3 text-white bg-red-600 rounded-full p-1 hover:bg-red-700"
            >
              ✕
            </button>

            {selected.imagem && (
              <img
                src={selected.imagem}
                alt={selected.titulo}
                className="w-full h-64 md:h-96 object-cover"
              />
            )}

            <div className="p-6">
              <h4 className="text-2xl font-bold text-rose-700 mb-3 text-center">
                {selected.titulo}
              </h4>
              <p className="text-gray-800 mb-4 whitespace-pre-wrap break-words">
                {selected.descricao}
              </p>
              <span className="text-rose-700 font-bold text-xl block text-center">
                {formatPrice(selected.preco)}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
