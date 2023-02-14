import Navbar from "components/Navbar";
import ProductCard from "components/ProductCard";

const Catalog = () => {
  return (
    <>
    <Navbar />

      {/* my-4: Mesma coisa de por o padding na vertical(bootstrap) */}
      {/* container: Delimita uma área na esquerda e direita(bootstrap) */}

      <div className="container my-4">
        <ProductCard />
      </div>
    </>
  );
};

export default Catalog;
