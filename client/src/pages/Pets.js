import React from "react";
// import { useQuery } from "@apollo/client";

// Must make components/PetForm and /PetList
import PetList from "../components/PetList";
import PetForm from "../components/PetForm";
import WalkForm from "../components/WalkForm";
import WalkList from "../components/walklist";


const Pets = ({ pets, walks}) => {

  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-6 col-md-5 mb-3 p-3"
          style={{ border: "1px dotted #1a1a1a" }}
        >
          <PetForm />
        </div>
        <div
          className="col-6 col-md-5 mb-3 p-3"
          style={{ border: "1px dotted #1a1a1a" }}
        >
          <WalkForm />
        </div>
        <div className="col-12 col-md-8 mb-3">

          <p>My Pets</p>


          <PetList pets={pets} petName="Pets registered" />

        </div>
<WalkList walks={walks} walkDate="walks" />

      </div>
    </main>
  );
};

export default Pets;
