import './styles.css';

import { ReactComponent as ArrowIcon } from 'assets/images/arrow.svg';

const ButtonIcon = () => {
  return (
    <>
      {/* btn - efeito de opacidade ao passar o mouse(bootstrap) */}
      <div className="btn-container">
        <button className="btn btn-primary">
          <h6>Inicie agora sua busca</h6>
        </button>

        <div className="btn-icon-container">
          <ArrowIcon />
        </div>
      </div>
    </>
  );
};

export default ButtonIcon;
