import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { ADD_WALK } from "../../utils/mutations";
// import { QUERY_PETS, QUERY_WALK, QUERY_ME } from '../../utils/queries';

import Auth from "../../utils/auth";

const WalkForm = () => {
  const [walkDate, setWalkDate] = useState("");
  const [walkTime, setWalkTime] = useState("");
  const [walkDuration, setWalkDuration] = useState("");
  const [dogWalker, setDogWalker] = useState("");
  // const [pet, setPet] = useState("");


  // const [characterCount, setCharacterCount] = useState(0);

  const [addWalk, { error }] = useMutation(ADD_WALK);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addWalk({
        variables: {
          walkDate,
          walkTime,
          walkDuration,
          dogWalker,
          // pet
        },
      });

      setWalkDate("");
      setWalkTime("");
      setWalkDuration("");
      setDogWalker("");
      // setPet("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "walkDate" && value.length <= 280) {
      setWalkDate(value);

    } if (name === "walkTime" && value.length <= 280) {
      setWalkTime(value);
    } if (name === "walkDuration" && value.length <= 280) {
      setWalkDuration(value);
    } if (name === "dogWalker" && value.length <= 280) {
      setDogWalker(value);
    // } if (name === "petName" && value.length <= 280) {
    //   setPet(value);
    // }
  };
}

  return (
    <div>
      {Auth.loggedIn() ? (
        <>
          <h3>Book A Walk!</h3>

          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="walkDate"
                placeholder="Date of walk request"
                value={walkDate}
                className="form-input w-100"
                style={{ lineHeight: "1.5", resize: "vertical" }}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="col-12 col-lg-9">
              <textarea
                name="walkTime"
                placeholder="Time of walk request"
                value={walkTime}
                className="form-input w-100"
                style={{ lineHeight: "1.5", resize: "vertical" }}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="col-12 col-lg-9">
              <textarea
                name="walkDuration"
                placeholder="requested duration"
                value={walkDuration}
                className="form-input w-100"
                style={{ lineHeight: "1.5", resize: "vertical" }}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="col-12 col-lg-9">
              <textarea
                name="dogWalker"
                placeholder="requested walker"
                value={dogWalker}
                className="form-input w-100"
                style={{ lineHeight: "1.5", resize: "vertical" }}
                onChange={handleChange}
              ></textarea>
            </div>
            {/* <div className="col-12 col-lg-9">
              <textarea
                name="pet"
                placeholder="name of pet to be walked"
                value={pet}
                className="form-input w-100"
                style={{ lineHeight: "1.5", resize: "vertical" }}
                onChange={handleChange}
              ></textarea>
            </div> */}

            <div className="col-12 col-lg-9">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Walk
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
          You need to be logged in to book a walk. Please{" "}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default WalkForm;
