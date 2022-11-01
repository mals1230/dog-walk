import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import Pets from "./Pets"

import { QUERY_USER } from "../utils/queries";


const Profile = () => {
  const { userFullName: userParam } = useParams();
  console.log(userParam)
  const { loading, data } = useQuery(QUERY_USER, {
    variables: { userFullName: userParam },
  });
 
  const user = data?.user || {};
 
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
        <Pets pets={user.pet} />
      </div>
    </div>
  );
};

export default Profile;
