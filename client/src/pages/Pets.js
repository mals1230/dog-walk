import React from "react";
import { useQuery } from "@apollo/client";

// Must make components/PetForm and /PetList
import PetList from "../components/PetList";
import PetForm from "../components/PetForm";
import WalkForm from "../components/WalkForm";

const Pets = ({ pets }) => {

  return (
    <main>
      <div className="flex-row justify-center">
        petspage
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: "1px dotted #1a1a1a" }}
        >
          <PetForm />
          <WalkForm />
        </div>
        <div className="col-12 col-md-8 mb-3">
          <p>My Pets</p>


          <PetList pets={pets} title="Pets registered" />

        </div>

      </div>
    </main>
  );
};

export default Pets;
