import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useNavigate } from 'react-router-dom'
import AdminNav from '../components/AdminNav'

export default function EspacoAdmin() {
  const [file, setFile] = useState(null)
  const [espaco, setEspaco] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) navigate('/login')
      else fetchEspaco()
    })
  }, [navigate])

  async function fetchEspaco() {
    const { data, error } = await supabase
      .from('espacos')
      .select('*')
      .order('created_at', { ascending: false })
    if (!error) setEspaco(data)
  }

  const handleUpload = async (e) => {
    e.preventDefault()
    if (!file) return alert('Selecione um arquivo!')
    const nomeLimpo = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`
    const { error: uploadError } = await supabase.storage
      .from('espacos')
      .upload(nomeLimpo, file)
    if (uploadError) return alert('Erro ao subir imagem: ' + uploadError.message)

    const {
      data: { publicUrl },
    } = supabase.storage.from('espacos').getPublicUrl(nomeLimpo)

    const { error } = await supabase.from('espacos').insert([{ imagem: publicUrl }])
    if (error) alert('Erro ao salvar no banco: ' + error.message)
    else {
      alert('Foto do espaço adicionada!')
      setFile(null)
      fetchEspaco()
    }
  }

  const handleDelete = async (item) => {
    if (!confirm('Excluir esta foto?')) return
    const key = item.imagem.split('/').pop()
    const { error: remErr } = await supabase.storage.from('espacos').remove([key])
    if (remErr) return alert('Erro ao remover do storage: ' + remErr.message)
    await supabase.from('espacos').delete().eq('id', item.id)
    fetchEspaco()
  }

  return (
    <div className="min-h-screen bg-rose-50 p-6">
      {/* ← Submenu de navegação */}
      <AdminNav />

      <h2 className="text-2xl font-semibold text-rose-700 mb-6 text-center">
        Gerenciar Fotos do Espaço
      </h2>
      <form onSubmit={handleUpload} className="max-w-lg mx-auto bg-white p-6 rounded shadow mb-8">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-4 w-full"
        />
        <button
          type="submit"
          className="w-full bg-rose-600 text-white py-2 rounded hover:bg-rose-700 transition"
        >
          Enviar Foto
        </button>
      </form>

      <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-6">
        {espaco.map((item) => (
          <div key={item.id} className="relative">
            <img
              src={item.imagem}
              alt="Foto do Espaço"
              className="w-full h-48 object-cover rounded shadow"
            />
            <button
              onClick={() => handleDelete(item)}
              className="absolute top-2 right-2 bg-white bg-opacity-80 text-red-500 p-1 rounded-full hover:bg-opacity-100"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
