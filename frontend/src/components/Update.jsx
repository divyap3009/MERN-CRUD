import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Update = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  const [error, setError] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  // get single user data
  const getSingleUser = async () => {
    const response = await fetch(`https://mern-crud-yk61.onrender.com/${id}`);

    const result = await response.json();

    if (!response.ok) {
      console.log(result.error);
      setError(result.error);
    }

    if (response.ok) {
      setError("");
      console.log("Updated User", result);
      setName(result.name);
      setAge(result.age);
      setEmail(result.email);
    }
  };

  // send updated user to backend
  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedUser = { name, email, age };

    const response = await fetch(`https://mern-crud-yk61.onrender.com/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updatedUser),
      headers: {
        "content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (!response.ok) {
      setError(result.error);
      console.log(result.error);
    }

    if (response.ok) {
      setError("");
      navigate("/all");
    }
  };

  useEffect(() => {
    getSingleUser();
  }, []);

  return (
    <div className="container my-2">
      <h2 className="text-center">Edit the date</h2>

      {error && <div class="alert alert-danger"> {error} </div>}
      <form className="form" onSubmit={handleUpdate}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input
            type="number"
            className="form-control"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Update;
