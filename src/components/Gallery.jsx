// src/components/Gallery.jsx

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

/** Remove barras duplas do pathname sem tocar no protocolo */
function cleanUrl(raw) {
  try {
    const u = new URL(raw);
    u.pathname = u.pathname.replace(/\/{2,}/g, '/');
    return u.toString();
  } catch {
    return raw;
  }
}

export default function Gallery() {
  const [fotos, setFotos] = useState([]);

  useEffect(() => {
    async function fetchGaleria() {
      const { data, error } = await supabase
        .from('galeria')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) {
        console.error('Erro ao carregar galeria:', error);
      } else {
        setFotos(data);
      }
    }
    fetchGaleria();
  }, []);

  return (
    <section id="galeria" className="py-20 bg-white px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h3 className="text-3xl font-display font-semibold text-rose-700 mb-10">
          Resultados
        </h3>
        <p className="text-gray-600 mb-12 max-w-xl mx-auto">
          Veja o bronzeamento finalizado de nossas clientes.
        </p>

        {fotos.length === 0 && (
          <p className="text-gray-400">Nenhuma imagem na galeria ainda.</p>
        )}

        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
          {fotos.map((f) => (
            <div key={f.id} className="bg-pink-50 p-6 rounded-lg shadow">
              {f.tipo === 'par' ? (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <img
                      src={cleanUrl(f.imagem_antes)}
                      alt="Antes"
                      className="w-full h-64 object-cover rounded"
                    />
                    <p className="mt-2 text-sm font-medium text-rose-700">Antes</p>
                  </div>
                  <div>
                    <img
                      src={cleanUrl(f.imagem_depois)}
                      alt="Depois"
                      className="w-full h-64 object-cover rounded"
                    />
                    <p className="mt-2 text-sm font-medium text-rose-700">Depois</p>
                  </div>
                </div>
              ) : (
                <div>
                  <img
                    src={cleanUrl(f.imagem)}
                    alt="Resultado"
                    className="w-full h-64 object-cover rounded"
                  />
                  {/* opcional: caso queira legenda para "outros", adicione aqui */}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
