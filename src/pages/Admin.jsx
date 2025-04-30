import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

function Admin() {
  const [user, setUser] = useState(null);
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [imagem, setImagem] = useState(null);
  const [servicos, setServicos] = useState([]);
  const [sucesso, setSucesso] = useState(null);
  const navigate = useNavigate();

  async function fetchServicos() {
    const { data, error } = await supabase.from('servicos').select('*');
    if (!error) setServicos(data);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imagemUrl = null;

    if (imagem) {
      const nomeUnico = `${Date.now()}-${imagem.name}`;
      const { error: uploadError } = await supabase.storage
        .from('servicos')
        .upload(nomeUnico, imagem);

      if (uploadError) {
        alert('Erro ao fazer upload da imagem');
        return;
      }

      imagemUrl = supabase.storage
        .from('servicos')
        .getPublicUrl(nomeUnico).data.publicUrl;
    }

    const { error } = await supabase.from('servicos').insert([
      { titulo, descricao, preco, imagem: imagemUrl },
    ]);

    if (error) {
      alert('Erro ao adicionar serviço');
    } else {
      setSucesso('Serviço cadastrado!');
      setTitulo('');
      setDescricao('');
      setPreco('');
      setImagem(null);
      fetchServicos();
    }
  };

  const excluirServico = async (id) => {
    const confirmar = confirm('Tem certeza que deseja excluir este serviço?');
    if (!confirmar) return;

    const { error } = await supabase.from('servicos').delete().eq('id', id);
    if (!error) {
      setServicos(servicos.filter((s) => s.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-rose-50 px-4 py-10 flex flex-col items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-xl mb-10"
      >
        <h2 className="text-2xl font-bold text-rose-700 mb-6 text-center">Cadastrar Novo Serviço</h2>

        {sucesso && <p className="text-green-600 mb-4">{sucesso}</p>}

        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className="w-full mb-4 p-3 border rounded"
          required
        />

        <textarea
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          className="w-full mb-4 p-3 border rounded"
        />

        <input
          type="text"
          placeholder="Preço"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          className="w-full mb-4 p-3 border rounded"
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImagem(e.target.files[0])}
          className="w-full mb-6"
        />

        <button className="w-full bg-rose-600 text-white py-2 rounded hover:bg-rose-700 transition">
          Salvar Serviço
        </button>
      </form>

      <div className="w-full max-w-4xl">
        <h3 className="text-xl font-semibold mb-4 text-center text-rose-600">Serviços Cadastrados</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {servicos.map((s) => (
            <div key={s.id} className="bg-white p-4 rounded shadow relative">
              {s.imagem && (
                <img src={s.imagem} alt="Imagem do serviço" className="mb-3 rounded" />
              )}
              <h4 className="text-lg font-bold text-rose-700">{s.titulo}</h4>
              <p className="text-gray-600 text-sm mb-2">{s.descricao}</p>
              <p className="text-sm font-semibold text-rose-600">{s.preco}</p>
              <button
                onClick={() => excluirServico(s.id)}
                className="absolute top-2 right-2 text-sm text-red-500 hover:underline"
              >
                Excluir
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Admin;
