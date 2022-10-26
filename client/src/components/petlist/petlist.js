import React from 'react';
import { Link } from 'react-router-dom';

const PetList = ({
  Pets,
  petName,
  showpetName = true,
  showuserFullname = true,
}) => {
  if (!pets.length) {
    return <h3>No pets Yet</h3>;
  }

  return (
    <div>
      {showpetName && <h3>{title}</h3>}
      {pets &&
        pets.map((pet) => (
          <div key={pet._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {showuserFullname ? (
                <Link
                  className="text-light"
                  to={`/profiles/${pet.petUser}`}
                >
                  {pet.petUser} <br />
                  <span style={{ fontSize: '1rem' }}>
                    has added a pet on {pet.createdAt}
                  </span>
                </Link>
              ) : (
                <>
                  <span style={{ fontSize: '1rem' }}>
                    You added a pet on {pet.createdAt}
                  </span>
                </>
              )}
            </h4>
            <div className="card-body bg-light p-2">
              <p>{thought.thoughtText}</p>
            </div>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/thoughts/${pet._id}`}
            >
            </Link>
          </div>
        ))}
    </div>
  );
};

export default petList;