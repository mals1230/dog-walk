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
          <h5>My Registered Pets</h5>
          <PetList pets={pets} title="Pets registered" />
        </div>
      </div>
    </main>
  );
};

export default Pets;
