import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import AdminNav from '../components/AdminNav'

export default function Admin() {
  const [editingId, setEditingId] = useState(null)
  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [preco, setPreco] = useState('')
  const [imagem, setImagem] = useState(null)
  const [servicos, setServicos] = useState([])
  const [sucesso, setSucesso] = useState(null)
  const navigate = useNavigate()

  // 1) Auth + fetch
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return navigate('/login')
      fetchServicos()
    })
  }, [navigate])

  // 2) Fetch all
  async function fetchServicos() {
    const { data, error } = await supabase.from('servicos').select('*')
    if (error) console.error('Erro ao buscar:', error)
    else setServicos(data)
  }

  // 3) Price formatting
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

  // 4) Prepare form to edit
  const startEdit = (s) => {
    setEditingId(s.id)
    setTitulo(s.titulo)
    setDescricao(s.descricao)
    setPreco(s.preco)
    setImagem(null) // troca só se carregar nova imagem
    setSucesso(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // 5) Create or update
  const handleSubmit = async (e) => {
    e.preventDefault()
    let urlImagem = null

    if (imagem) {
      const nome = `${Date.now()}-${imagem.name}`
      const { error: upErr } = await supabase
        .storage
        .from('servicos')
        .upload(nome, imagem)
      if (upErr) {
        alert('Erro no upload: ' + upErr.message)
        return
      }
      urlImagem = supabase
        .storage
        .from('servicos')
        .getPublicUrl(nome).data.publicUrl
    }

    const payload = { titulo, descricao, preco, ...(urlImagem && { imagem: urlImagem }) }

    if (editingId) {
      const { error } = await supabase
        .from('servicos')
        .update(payload)
        .eq('id', editingId)
      if (error) alert('Erro ao atualizar: ' + error.message)
      else setSucesso('Serviço atualizado!')
    } else {
      const { error } = await supabase.from('servicos').insert([payload])
      if (error) alert('Erro ao cadastrar: ' + error.message)
      else setSucesso('Serviço cadastrado!')
    }

    setTitulo('')
    setDescricao('')
    setPreco('')
    setImagem(null)
    setEditingId(null)
    fetchServicos()
  }

  // 6) Delete
  const excluirServico = async (id) => {
    if (!confirm('Deseja mesmo excluir?')) return
    const { error } = await supabase.from('servicos').delete().eq('id', id)
    if (error) alert('Erro ao excluir: ' + error.message)
    else setServicos((cur) => cur.filter((s) => s.id !== id))
  }

  return (
    <div className="min-h-screen bg-rose-50 p-6">
      {/* ← Submenu de navegação */}
      <AdminNav />

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow p-6 max-w-xl mx-auto mb-10"
      >
        <h2 className="text-2xl font-bold text-rose-700 mb-4 text-center">
          {editingId ? 'Editar Serviço' : 'Cadastrar Serviço'}
        </h2>

        {sucesso && <p className="text-green-600 mb-4 text-center">{sucesso}</p>}

        <input
          className="w-full mb-3 p-2 border rounded"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />

        <textarea
          className="w-full mb-3 p-2 border rounded whitespace-pre-wrap break-words"
          placeholder="Descrição"
          rows={4}
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
        />

        <input
          className="w-full mb-3 p-2 border rounded"
          placeholder="Preço (ex: 120.00)"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImagem(e.target.files[0])}
          className="w-full mb-4"
        />

        <button className="w-full bg-rose-600 text-white py-2 rounded hover:bg-rose-700 transition">
          {editingId ? 'Atualizar' : 'Salvar'}
        </button>
      </form>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
        {servicos.map((s) => (
          <div
            key={s.id}
            className="bg-white rounded-lg shadow p-3 md:p-4 relative flex flex-col"
          >
            {s.imagem && (
              <img
                src={s.imagem}
                alt={s.titulo}
                className="w-full h-24 md:h-32 object-cover rounded mb-3"
              />
            )}
            <h3 className="text-lg font-semibold text-rose-700 mb-1 text-center">
              {s.titulo}
            </h3>
            <p className="text-gray-600 text-sm mb-2 break-words whitespace-pre-wrap">
              {s.descricao}
            </p>
            <p className="text-rose-600 font-bold text-lg text-center mb-2">
              {formatPrice(s.preco)}
            </p>

            <div className="absolute top-2 right-2 flex space-x-2">
              <button
                onClick={() => startEdit(s)}
                className="text-blue-500 text-sm hover:underline"
              >
                Editar
              </button>
              <button
                onClick={() => excluirServico(s.id)}
                className="text-red-500 text-sm hover:underline"
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
