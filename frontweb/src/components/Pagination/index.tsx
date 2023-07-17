import { ReactComponent as ArrowIcon } from 'assets/images/arrow.svg';

import './styles.css';
import ReactPaginate from 'react-paginate';

type Props = {
  forcePage?: number;
  pageCount: number;
  range: number;
  // tipei para receber a função para ter o typeSafety, OnChange evento para disparar quando a página mudar
  OnChange?: (pageNumber: number) => void;
}

const Pagination = ( { forcePage, pageCount, range, OnChange} : Props) => {
  return (
    <ReactPaginate
      forcePage={forcePage}
      pageCount={pageCount}
      pageRangeDisplayed={range}
      marginPagesDisplayed={1}
      containerClassName="pagination-container"
      pageLinkClassName="pagination-item"
      breakClassName="pagination-item"
      previousClassName="arrow-previus"
      nextClassName="arrow-next"
      activeLinkClassName="pagination-link-active"
      disabledClassName="arrow-inactive"

      // onPageChange - dispara uma função especifica que recebe os itens da paginação que leva a minha função OnChange
      // itens.selected - número da pagina que mudou no ReactPaginate
      onPageChange={(itens) => (OnChange) ? OnChange(itens.selected) : {}}

      previousLabel={<div className="pagination-arrow-container" data-testid="arrow-previous"><ArrowIcon /></div>}
      nextLabel={<div className="pagination-arrow-container" data-testid="arrow-next"><ArrowIcon /></div>}
    />  
  );
};

export default Pagination;
