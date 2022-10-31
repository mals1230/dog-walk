import React from "react";
import Login from "./Login";
import Signup from "./Signup";

const Home = () => {

  return (
    <main>
      <div className="flex-row justify-center">
       
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: "1px dotted #1a1a1a" }}
        >
          <Login />
        </div>
        <div className="col-12 col-md-8 mb-3">
         <Signup />
        </div>
        please work
      </div>
    </main>
  );
};

export default Home;