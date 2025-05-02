// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import App               from './App.jsx'
import Login             from './pages/Login.jsx'
import AdminDashboard    from './pages/AdminDashboard.jsx'
import Admin             from './pages/Admin.jsx'
import EspacoAdmin       from './pages/EspacoAdmin.jsx'
import GaleriaAdmin      from './pages/GaleriaAdmin.jsx'
import ProtectedRoute    from './components/ProtectedRoute.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* agora o App “pega” todas as rotas que não forem /login ou /admin* */}
        <Route path="/*" element={<App />} />

        {/* público e dashboard (fica acima do wildcard ou pelo ranking de rotas) */}
        <Route path="/login" element={<Login />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/servicos"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/espaco"
          element={
            <ProtectedRoute>
              <EspacoAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/galeria"
          element={
            <ProtectedRoute>
              <GaleriaAdmin />
            </ProtectedRoute>
          }
        />

        {/* fallback genérico */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
