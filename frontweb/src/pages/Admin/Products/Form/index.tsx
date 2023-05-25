import './styles.css';

const Form = () => {
  return (
    <div className="product-crud-container">
      <div className="base-card product-crud-form-card">
        <h1 className="product-crud-form-title">DADOS DO PRODUTO</h1>

        <form action="">
          <div className="row">
            <div className="col-lg-6">
              {/* row, col-lg-6, form-control - bootstrap */}
              <input type="text" className="form-control base-imput" />
              <input type="text" className="form-control base-imput" />
              <input type="text" className="form-control base-imput" />
            </div>
            <div className="col-lg-6">
              <textarea
                rows={10}
                className="form-control base-imput"
              ></textarea>
            </div>
                <div>
                    <button className="btn btn-outline-danger">CANCELAR</button>
                    <button className="btn btn-primary">SALVAR</button>
                </div>

          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
