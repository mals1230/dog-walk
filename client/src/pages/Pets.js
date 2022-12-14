import React from "react";

import PetList from "../components/PetLists";
import PetForm from "../components/PetForms";
import WalkForm from "../components/WalkForms";
import WalkList from "../components/walklists";

const Pets = ({ pets, walk }) => {
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
        <div className="col-6 col-md-5 mb-3">
          <PetList pets={pets} petName="Pets registered" />
        </div>
        <div className="col-6 col-md-5 mb-3">
          <WalkList walk={walk} walkDate="walk" />
        </div>
      </div>
    </main>
  );
};

export default Pets;
