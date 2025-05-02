// src/App.jsx
import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import Header from './components/Header'
import Hero from './components/Hero'
import Services from './components/Services'
import AboutOwner from './components/AboutOwner'
import NossoEspaco from './components/NossoEspaco'
import Gallery from './components/Gallery'
import Contact from './components/Contact'

import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard'
import Admin from './pages/Admin'
import EspacoAdmin from './pages/EspacoAdmin'
import GaleriaAdmin from './pages/GaleriaAdmin'
import ProtectedRoute from './components/ProtectedRoute'

function Home() {
  return (
    <>
      <Hero />
      <Services />
      <AboutOwner />
      <NossoEspaco />
      <Gallery />
      <Contact />
    </>
  )
}

export default function App() {
  return (
    <>
      <Header />
      {/*
        Aqui ajustamos o padding-top para 
        exatamente a altura do header (h-16 = 4rem),
        eliminando o gap branco.
      */}
      <main className="pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
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

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </>
  )
}
