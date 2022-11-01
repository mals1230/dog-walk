import React from "react";
import { Link } from "react-router-dom";

const PetList = ({
  pets,
  petName,
  showPetName = true,
  showUserFullname = true,
}) => {
  if (!pets?.length) {
    return <h3>No pets Yet</h3>;
  }

  return (
    <div>
      {showPetName && <h3>{petName}</h3>}
      {pets &&
        pets.map((pet) => (
          <div key={pet._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {showUserFullname ? (
                <Link className="text-light" to={`/profiles/${pet.petUser}`}>
                  {pet.petUser} <br />
                </Link>
              ) : (
                <>
                </>
              )}
            </h4>
            <div className="card-body bg-light p-2">
              <p>{pet.petName}</p>
            </div>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/pets/${pet._id}`}
            ></Link>
          </div>
        ))}
    </div>
  );
};

export default PetList;
