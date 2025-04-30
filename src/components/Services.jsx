import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Services() {
  const [servicos, setServicos] = useState([]);

  useEffect(() => {
    async function fetchServicos() {
      const { data, error } = await supabase
        .from('servicos')
        .select('*');

      if (error) {
        console.error('Erro ao buscar serviços:', error);
      } else {
        console.log('Serviços recebidos:', data);
        setServicos(data);
      }
    }

    fetchServicos();
  }, []);

  return (
    <section id="servicos" className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        <h3 className="text-3xl font-semibold text-rose-700 mb-10">
          Nossos Serviços
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          {servicos.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-6 cursor-pointer"
            >
              {item.imagem ? (
                <img
                  src={item.imagem}
                  alt={item.titulo}
                  className="w-full h-48 object-cover rounded mb-4"
                />
              ) : (
                <div className="w-full h-48 bg-gray-100 rounded mb-4 flex items-center justify-center">
                  <span className="text-gray-400">Sem imagem</span>
                </div>
              )}

              <h4 className="text-xl font-semibold text-rose-600 mb-2">
                {item.titulo}
              </h4>
              <p className="text-gray-700 mb-4">{item.descricao}</p>
              <span className="block text-rose-700 font-bold text-lg">
                {item.preco}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}