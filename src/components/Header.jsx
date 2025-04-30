function Header() {
    return (
      <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-display text-rose-700 font-bold">Marta Murari Bronze</h1>
          <nav className="space-x-6 hidden md:flex text-sm font-medium text-gray-700">
            <a href="#sobre" className="hover:text-rose-600 transition">Sobre</a>
            <a href="#servicos" className="hover:text-rose-600 transition">Serviços</a>
            <a href="#galeria" className="hover:text-rose-600 transition">Galeria</a>
            <a href="#contato" className="hover:text-rose-600 transition">Contato</a>
          </nav>
        </div>
      </header>
    );
  }
  
  export default Header;
  