// src/components/AdminNav.jsx
import React from 'react'
import { NavLink } from 'react-router-dom'

export default function AdminNav() {
  const tabs = [
    { to: '/admin', label: 'Painel Admnistrativo' },
    { to: '/galeria-admin', label: 'Home' }
  ]

  return (
    <nav className="bg-white shadow rounded-lg mb-6">
      <ul className="flex">
        {tabs.map(({ to, label }) => (
          <li key={to} className="flex-1">
            <NavLink
              to={to}
              end
              className={({ isActive }) =>
                `block text-center py-3 font-medium
                 ${isActive
                   ? 'text-rose-700 border-b-4 border-rose-700'
                   : 'text-gray-600 hover:text-rose-700 hover:border-b-4 hover:border-rose-200'}`
              }
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
