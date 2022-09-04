import React from "react";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import Wrapper from "../assets/wrappers/PageBtnContainer";
function PageBtnContainer() {
  const { numOfPages, page } = useGlobalContext();

  function nextPage() {
    console.log("next page");
  }

  function prevPage() {
    console.log("prev page");
  }

  //crear un array
  const pages = [];
  for (let i = 1; i < numOfPages + 1; i++) {
    pages.push(i);
  }

  return (
    <Wrapper>
      <button className="prev-btn" onClick={prevPage}>
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
              onClick={() => console.log("change page")}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>
      <button className="next-btn" onClick={nextPage}>
        <HiChevronDoubleRight />
        next
      </button>
    </Wrapper>
  );
}

export default PageBtnContainer;
