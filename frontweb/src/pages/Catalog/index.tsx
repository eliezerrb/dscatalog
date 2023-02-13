import Navbar from "components/Navbar";

const Catalog = () => {
  return (
    <>
    <Navbar />

      {/* my-4: Mesma coisa de por o padding na vertical(bootstrap) */}
      {/* container: Delimita uma área na esquerda e direita(bootstrap) */}
      
      <div className="container my-4">
        <h1>Tela de Catalog</h1>
      </div>
    </>
  );
};

export default Catalog;
