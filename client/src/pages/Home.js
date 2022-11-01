import React from "react";
import Login from "./Login";
import Signup from "./Signup";

const Home = () => {

  return (
    <main>
      <div className="flex-row justify-center">
       
        <div
          className="col-12 col-md-10 mb-3 p-3"
        >
          <Login />
        </div>
        <div className="col-12 col-md-10 mb-3">
         <Signup />
        </div>
      </div>
    </main>
  );
};

export default Home;