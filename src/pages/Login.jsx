import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: senha
    });

    if (error) {
      setErro(error.message);
    } else {
      navigate('/admin');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-rose-50 px-4">
      <form onSubmit={handleLogin} className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-rose-700 mb-6 text-center">Login da Marta</h2>
        {erro && <p className="text-red-600 text-sm mb-4">{erro}</p>}

        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full mb-4 p-3 border rounded"
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
          className="w-full mb-6 p-3 border rounded"
        />

        <button
          type="submit"
          className="w-full bg-rose-600 text-white py-2 rounded hover:bg-rose-700 transition"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
