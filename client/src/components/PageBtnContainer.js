import React from "react";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import Wrapper from "../assets/wrappers/PageBtnContainer";
function PageBtnContainer() {
  const { numOfPages, page, nextPageGlobal, prevPageGlobal, changePage } =
    useGlobalContext();

  function nextPage() {
    // llamar a mi global context, aumentar uno a la pagina y modificar codigo en reducer
    nextPageGlobal();
  }

  function prevPage() {
    prevPageGlobal();
  }

  //crear un array
  const pages = [];
  for (let i = 1; i < numOfPages + 1; i++) {
    pages.push(i);
  }

  return (
    <Wrapper>
      <button
        className="prev-btn"
        disabled={page === numOfPages}
        onClick={prevPage}
      >
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className="btn-container">
        {pages.map((pageNumber) => {
          return (
            <button
              key={pageNumber}
              type="button"
              className={pageNumber === page ? "pageBtn active" : "pageBtn"}
              onClick={() => changePage(pageNumber)}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>
      <button
        className="next-btn"
        onClick={nextPage}
        disabled={page === numOfPages}
      >
        <HiChevronDoubleRight />
        next
      </button>
    </Wrapper>
  );
}

export default PageBtnContainer;
