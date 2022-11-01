import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_PET } from "../../utils/mutations";
import Auth from "../../utils/auth";

const PetForm = () => {
  const [petName, setPetName] = useState("");
  const [petBreed, setPetBreed] = useState("");
  const [petAge, setPetAge] = useState();
  const [petWeight, setPetWeight] = useState();
  const [petInstruction, setPetInstructions] = useState("");
  const [petEmergency, setPetEmergency] = useState("");

  const [characterCount, setCharacterCount] = useState(0);

  const [addPet, { error }] = useMutation(ADD_PET);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addPet({
        variables: {
          petName,
          petBreed,
          petAge,
          petWeight,
          petInstruction,
          petEmergency,
        },
      });

      setPetName("");
      setPetBreed("");
      setPetAge("");
      setPetWeight("");
      setPetInstructions("");
      setPetEmergency("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "petName" && value.length <= 280) {
      setPetName(value);
      setCharacterCount(value.length);
    }
    if (name === "petBreed" && value.length <= 280) {
      setPetBreed(value);
    }
    if (name === "petAge" && value.length <= 280) {
      setPetAge(parseInt(value));
    }
    if (name === "petWeight" && value.length <= 280) {
      setPetWeight(parseInt(value));
    }
    if (name === "petInstructions" && value.length <= 280) {
      setPetInstructions(value);
    }
    if (name === "petEmergency" && value.length <= 280) {
      setPetEmergency(value);
    }
  };

  return (
    <div>
      <h4>Register a New Pet!</h4>

      {Auth.loggedIn() ? (
        <>
         
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="petName"
                placeholder="My dog's name is..."
                value={petName}
                className="form-input w-100"
                style={{ lineHeight: "1.5", resize: "vertical" }}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="col-12 col-lg-9">
              <textarea
                name="petBreed"
                placeholder="Breed of Dog?"
                value={petBreed}
                className="form-input w-100"
                style={{ lineHeight: "1.5", resize: "vertical" }}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="col-12 col-lg-9">
              <textarea
                name="petAge"
                placeholder="Age of Dog?"
                value={petAge}
                className="form-input w-100"
                style={{ lineHeight: "1.5", resize: "vertical" }}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="col-12 col-lg-9">
              <textarea
                name="petWeight"
                placeholder="Weight of Dog?"
                value={petWeight}
                className="form-input w-100"
                style={{ lineHeight: "1.5", resize: "vertical" }}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="col-12 col-lg-9">
              <textarea
                name="petInstructions"
                placeholder="Address, Entry Instructions, Pet Care Instructions"
                value={petInstruction}
                className="form-input w-100"
                style={{ lineHeight: "1.5", resize: "vertical" }}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="col-12 col-lg-9">
              <textarea
                name="petEmergency"
                placeholder="Emergency Info: vet, emergency contact"
                value={petEmergency}
                className="form-input w-100"
                style={{ lineHeight: "1.5", resize: "vertical" }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-9">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Pet
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to add your pet/s. Please{" "}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default PetForm;
