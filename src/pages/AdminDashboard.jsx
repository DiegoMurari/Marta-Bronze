// src/pages/AdminDashboard.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-rose-50 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold text-rose-700 mb-8">Painel Administrativo</h1>
      <div className="w-full max-w-sm space-y-4">
        <button
          onClick={() => navigate('/admin/servicos')}
          className="w-full bg-rose-600 text-white py-2 rounded hover:bg-rose-700 transition"
        >
          Gerenciar Serviços
        </button>
        <button
          onClick={() => navigate('/admin/espaco')}
          className="w-full bg-rose-600 text-white py-2 rounded hover:bg-rose-700 transition"
        >
          Gerenciar Fotos do Espaço
        </button>
        <button
          onClick={() => navigate('/admin/galeria')}
          className="w-full bg-rose-600 text-white py-2 rounded hover:bg-rose-700 transition"
        >
          Gerenciar Galeria
        </button>
      </div>
    </div>
  );
}
