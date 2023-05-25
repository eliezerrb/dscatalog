import './styles.css';

const Form = () => {
  return (
    <div className="product-crud-container">
      <div className="base-card product-crud-form-card">
        <h1 className="product-crud-form-title">DADOS DO PRODUTO</h1>

        <form action="">
          <div className="row product-crud-inputs-container">
            <div className="col-lg-6 product-crud-inputs-left-container">
              {/* row, col-lg-6, form-control - bootstrap */}
              <div className="margin-bottom-30">
                <input type="text" className="form-control base-imput" />
              </div>
              <div className="margin-bottom-30">
                <input type="text" className="form-control base-imput" />
              </div>
              <div>
                <input type="text" className="form-control base-imput" />
              </div>
            </div>
            <div className="col-lg-6">
              <textarea
                rows={5}
                className="form-control base-imput"
              ></textarea>
            </div>
          </div>
          <div className="product-crud-buttons-container">
              <button className="btn btn-outline-danger">CANCELAR</button>
              <button className="btn btn-primary">SALVAR</button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
