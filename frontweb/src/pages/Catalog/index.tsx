import Navbar from 'components/Navbar';
import ProductCard from 'components/ProductCard';

const Catalog = () => {
  return (
    <>
      <Navbar />

      {/* my-4: Mesma coisa de por o padding na vertical(bootstrap) */}
      {/* container: Delimita uma área na esquerda e direita(bootstrap) */}
      {/* row: Permite configurações de layout de grad(bootstrap) */}
      {/* Naturalmente é um card por linha */}
      {/* col-sm-6: Small ≥576px, 6 é a mesma coisa da metade da tela quantidade de colunas, no total do bootstrap é 12(bootstrap) */}
      {/* col-lg-4: Large ≥992px, sempre divide pela quantidade que deseja por linha ex: 12/3=3 são 3 card por linha(bootstrap) */}
      {/* col-xl-3: Extra large ≥1200px, 4 card por linha(bootstrap) */}

      <div className="container my-4">
        <div className="row">
          <div className="col-sm-6 col-lg-4 col-xl-3">
            <ProductCard />
          </div>
          <div className="col-sm-6 col-lg-4 col-xl-3">
            <ProductCard />
          </div>
          <div className="col-sm-6 col-lg-4 col-xl-3">
            <ProductCard />
          </div>
          <div className="col-sm-6 col-lg-4 col-xl-3">
            <ProductCard />
          </div>
          <div className="col-sm-6 col-lg-4 col-xl-3">
            <ProductCard />
          </div>
        </div>
      </div>
    </>
  );
};

export default Catalog;
