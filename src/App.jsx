import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Gallery from './components/Gallery';

function App() {
  return (
    <div className="text-gray-800 font-body">
      <Header />
      <main className="pt-24">
        <Hero />
        <Services />
        <Gallery /> {/* <-- Aqui está a Galeria agora renderizada */}
        {/* Próximas: Depoimentos, Contato, etc */}
      </main>
    </div>
  );
}

export default App;
