import React from "react";
import { Link } from "react-router-dom";

const WalkList = ({
  _id,
  walkDuration,
  walkTime,
  walkDate,
  petName,
  showPetName = true,
  showWalkDate = true,
  showUserFullname = true,
}) => {
  if (!walks.length) {
    return <h3>No walks Yet</h3>;
  }

  return (
    <div>
      {showWalkDate && <h3>{walkDate}</h3>}
      {walks &&
        walks.map((walk) => (
          <div key={walks._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {/* {showUserFullname ? ( */}
                {/* // <Link className="text-light" to={`/profiles/${pet.petUser}`}>
                //   {pet.petUser} <br />
                // </Link>
              ) : ( */}
                <>
                </>
              {/* )} */}
            </h4>
            <div className="card-body bg-light p-2">
              <p>{walks.walkTime.walkDate.walksDuration}</p>

            </div>
            {/* <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/pets/${pet._id}`}
            ></Link> */}
          </div>
        ))}
    </div>
  );
};

export default WalkList;
