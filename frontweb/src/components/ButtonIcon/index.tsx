import './styles.css';

import { ReactComponent as ArrowIcon } from 'assets/images/arrow.svg';


type Props = {
  text: string;
}

const ButtonIcon = ({ text }: Props) => {
  return (
    <>
      {/* btn - efeito de opacidade ao passar o mouse(bootstrap) */}
      <div className="btn-container">
        <button className="btn btn-primary">
          <h6>{text}</h6>
        </button>

        <div className="btn-icon-container">
          {/* data-testid - id unico para o teste automazado (encontrar o componente na hora de testar)*/}
          <ArrowIcon data-testid="arrow" />
        </div>
      </div>
    </>
  );
};

export default ButtonIcon;
