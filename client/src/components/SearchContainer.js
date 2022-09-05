import React from "react";
import { useGlobalContext } from "../hooks/useGlobalContext";
import Wrapper from "../assets/wrappers/SearchContainer";
import { FormRow, FormSelect } from "../components";

function SearchContainer() {
  const {
    search,
    searchStatus,
    searchType,
    sort,
    statusOptions,
    jobTypeOptions,
    getJobs,
    clearFilters,
    isLoading,
  } = useGlobalContext();

  function handleSubmit(e) {
    e.preventDefault();
  }

  function handleChange(e) {
    //to prevent the user for searching while the previous search is still happening
    if (isLoading) return;
    let name = e.target.name;
    let value = e.target.value;
    getJobs(name, value);
  }

  return (
    <Wrapper>
      <form className="form" onSubmit={(e) => handleSubmit(e)}>
        <div className="form-center">
          {/* COMPANY */}
          <FormRow
            type="text"
            name="search"
            value={search}
            handleChange={(e) => handleChange(e)}
            //buscar por ciudad, position, company
          />
          {/* COMPANY */}
          {/* JOB STATUS */}
          <FormSelect
            labelText={"status"}
            value={searchStatus}
            name={"searchStatus"}
            options={["all", ...statusOptions]}
            handleChange={handleChange}
          />
          {/* JOB STATUS */}
          {/* JOB TYPE */}
          <FormSelect
            labelText={"job type"}
            value={searchType}
            name={"searchType"}
            options={["all", ...jobTypeOptions]}
            handleChange={handleChange}
          />
          <FormSelect
            labelText={"sort"}
            value={sort}
            name={"sort"}
            options={["latest", "oldest", "a-z", "z-a"]}
            handleChange={handleChange}
          />
          <button
            disabled={isLoading}
            type="button"
            onClick={clearFilters}
            className="btn btn-block btn-danger"
          >
            Clear Filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
}

export default SearchContainer;

//actualizar mi estado global segun cambie el valor de mi estado local
