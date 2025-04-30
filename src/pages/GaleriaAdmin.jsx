// src/pages/GaleriaAdmin.jsx

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

export default function GaleriaAdmin() {
  const [tipo, setTipo] = useState('par');
  const [antesFile, setAntesFile] = useState(null);
  const [depoisFile, setDepoisFile] = useState(null);
  const [outroFile, setOutroFile] = useState(null);
  const [galeria, setGaleria] = useState([]);
  const navigate = useNavigate();

  // Proteção de rota e carregamento inicial
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) navigate('/login');
      else fetchGaleria();
    });
  }, [navigate]);

  async function fetchGaleria() {
    const { data, error } = await supabase
      .from('galeria')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error) setGaleria(data);
  }

  function makeName(file) {
    return `${Date.now()}-${file.name
      .replace(/\s+/g, '-')
      .replace(/[^a-zA-Z0-9.\-_]/g, '')}`;
  }

  async function uploadToBucket(bucket, file, name) {
    const { error } = await supabase.storage.from(bucket).upload(name, file);
    if (error) throw error;
    const raw = `https://tejfxzohagfhevpwefdh.supabase.co/storage/v1/object/public/${bucket}/${name}`;
    const u = new URL(raw);
    u.pathname = u.pathname.replace(/\/{2,}/g, '/');
    return u.toString();
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let data = { tipo };

      if (tipo === 'par') {
        if (!antesFile || !depoisFile) {
          alert('Selecione as duas imagens (antes e depois)!');
          return;
        }
        const nameA = makeName(antesFile);
        const nameD = makeName(depoisFile);
        data.imagem_antes = await uploadToBucket('galeria', antesFile, nameA);
        data.imagem_depois = await uploadToBucket('galeria', depoisFile, nameD);
      } else {
        if (!outroFile) {
          alert('Selecione uma imagem!');
          return;
        }
        const nameO = makeName(outroFile);
        data.imagem = await uploadToBucket('galeria', outroFile, nameO);
      }

      await supabase.from('galeria').insert([data]);
      alert('Enviado com sucesso!');
      setAntesFile(null);
      setDepoisFile(null);
      setOutroFile(null);
      fetchGaleria();
    } catch (err) {
      console.error(err);
      alert('Erro: ' + err.message);
    }
  };

  // Novo handleDelete: remove do Storage e do banco
  const handleDelete = async (item) => {
    if (!confirm('Deseja realmente excluir este item?')) return;

    try {
      // 1) Apagar do storage
      const bucket = supabase.storage.from('galeria');
      const pathsToRemove = [];

      if (item.tipo === 'par') {
        // extrai somente o nome do arquivo da URL
        const antesKey = item.imagem_antes.split('/').pop();
        const depoisKey = item.imagem_depois.split('/').pop();
        pathsToRemove.push(antesKey, depoisKey);
      } else {
        const key = item.imagem.split('/').pop();
        pathsToRemove.push(key);
      }

      const { error: storageError } = await bucket.remove(pathsToRemove);
      if (storageError) throw storageError;

      // 2) Deletar registro no banco
      const { error: dbError } = await supabase
        .from('galeria')
        .delete()
        .eq('id', item.id);
      if (dbError) throw dbError;

      // 3) Atualizar estado local
      setGaleria((g) => g.filter((gItem) => gItem.id !== item.id));
    } catch (err) {
      console.error('Erro ao excluir:', err);
      alert('Não foi possível excluir: ' + err.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl mb-4 font-semibold text-rose-700">Gerenciar Galeria</h2>
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-8">
        <label className="block mb-2">
          Tipo de upload:
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            className="ml-2 border rounded p-1"
          >
            <option value="par">Antes & Depois</option>
            <option value="outros">Outros</option>
          </select>
        </label>

        {tipo === 'par' ? (
          <>
            <label className="block mb-2">
              Imagem “Antes”:
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setAntesFile(e.target.files[0])}
                className="block mt-1"
              />
            </label>
            <label className="block mb-4">
              Imagem “Depois”:
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setDepoisFile(e.target.files[0])}
                className="block mt-1"
              />
            </label>
          </>
        ) : (
          <label className="block mb-4">
            Imagem:
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setOutroFile(e.target.files[0])}
              className="block mt-1"
            />
          </label>
        )}

        <button
          type="submit"
          className="bg-rose-600 text-white py-2 px-4 rounded hover:bg-rose-700 transition"
        >
          Enviar
        </button>
      </form>

      <h3 className="text-xl mb-3">Itens cadastrados</h3>
      <div className="space-y-4">
        {galeria.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded shadow flex items-start">
            {item.tipo === 'par' ? (
              <div className="flex space-x-4">
                <img
                  src={item.imagem_antes}
                  alt="Antes"
                  className="w-32 h-32 object-cover rounded"
                />
                <img
                  src={item.imagem_depois}
                  alt="Depois"
                  className="w-32 h-32 object-cover rounded"
                />
              </div>
            ) : (
              <img
                src={item.imagem}
                alt="Resultado"
                className="w-32 h-32 object-cover rounded"
              />
            )}
            <button
              onClick={() => handleDelete(item)}
              className="ml-auto text-red-500 hover:underline"
            >
              Excluir
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
