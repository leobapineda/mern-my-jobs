import React, { useEffect, useState } from "react";
import { Alert, FormRow } from "../../components";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
// import useG
import { useGlobalContext } from "../../hooks/useGlobalContext";
function Profile() {
  const { user, updateUser, showAlert, displayAlert, isLoading, clearAlert } =
    useGlobalContext();
  const [localUser, setLocalUser] = useState({
    name: user?.name,
    email: user?.email,
    lastName: user?.lastName,
    location: user?.location,
  });

  function handleChange(e) {
    setLocalUser((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (isLoading) return;
    const { name, email, lastName, location } = localUser;
    if (!name.trim() || !email.trim() || !lastName.trim() || !location.trim()) {
      displayAlert();
      return;
    }
    updateUser({ name, email, lastName, location });
  }


  return (
    <Wrapper>
      <form className="form" onSubmit={(e) => handleSubmit(e)}>
        <h3>Profile</h3>
        {showAlert && <Alert />}
        {/*  NAME */}
        <div className="form-center">
          <FormRow
            type="name"
            name="name"
            value={localUser.name}
            handleChange={(e) => handleChange(e)}
            NotuseFocusComponent={true}
          />
          {/* LAST NAME */}

          <FormRow
            type="name"
            name="lastName"
            value={localUser.lastName}
            handleChange={(e) => handleChange(e)}
            labelText="last name"
          />
          {/* EMAIL */}

          <FormRow
            focusElement={true}
            type="email"
            name="email"
            value={localUser.email}
            handleChange={(e) => handleChange(e)}
            NotuseFocusComponent={true}
          />
          {/* LOCATION */}

          <FormRow
            type="name"
            name="location"
            value={localUser.location}
            handleChange={(e) => handleChange(e)}
          />
          <button className="btn btn-block" disabled={isLoading} type="submit">
            Save changes
          </button>
        </div>
      </form>
    </Wrapper>
  );
}

export default Profile;
