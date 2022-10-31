import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import Pets from "./Pets"

import { QUERY_USER } from "../utils/queries";

import Auth from "../utils/auth";

const Profile = () => {
  const { userFullName: userParam } = useParams();
console.log(userParam)
  const { loading, data } = useQuery( QUERY_USER,  {
    variables: { userFullName: userParam },
  });
  // const { loadings, datas } = useQuery(QUERY_PETS);
  // const pets = data?.pets || [];


  const user = data?.user || {};
  // navigate to personal profile page if username is yours
  // if (Auth.loggedIn() && Auth.getProfile().data.userFullName === userParam) {
  //   return <Navigate to={`/profile/${userParam}`} />;
  // }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.userFullName) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  return (
    <div>
      <div className="flex-row justify-center mb-3">
        <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
          Viewing {userParam ? `${user.userFullName}'s` : "your"} profile.
        </h2>
        <Pets pets={user.pet}/>
        {/* <div className="col-12 col-md-10 mb-5">
          <PetList
            pets={user.pets}
            title={`${user.userFullName}'s pets...`}
            showTitle={false}
            showUserFullName={false}
          />
        </div>
        {!userParam && (
          <div
            className="col-12 col-md-10 mb-3 p-3"
            style={{ border: "1px dotted #1a1a1a" }}
          >
            <PetForm />
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Profile;
