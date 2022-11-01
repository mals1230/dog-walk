import React from "react";
import { Link } from "react-router-dom";

const WalkList = ({
  walk,
  walkDate,
  showWalkDate = true,
  showUserFullname= true,


}) => {
  if (!walk?.length) {
    return <h3>No Walks Yet</h3>;
  }

  return (
    <div>
      {showWalkDate && <h3>{walkDate}</h3>}
      {walk &&
        walk.map((walk) => (
          <div key={walk._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {showUserFullname ? ( 
               <Link className="text-light" to={`/profiles/${walk.petUser}`}>
                  {walk.petUser} <br />
                 </Link>
              ) : ( 
              <>
              </>
              )}
            </h4>
            <div className="card-body bg-light p-2">
              <p>{walk.walkDate}</p>

            </div>
            { <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/walks/${walk._id}`}
            ></Link> }
          </div>
        ))}
    </div>
  );
};

export default WalkList;
