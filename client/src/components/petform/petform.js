import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_Pet } from '../../utils/mutations';
import { QUERY_PETS, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

const petform = () => {
  const [petName, setpetName] = useState('');

  const [characterCount, setCharacterCount] = useState(0);

  const [addPet, { error }] = useMutation(ADD_Pet, {
    update(cache, { data: { addPet } }) {
      try {
        const { pets } = cache.readQuery({ query: QUERY_PETS });

        cache.writeQuery({
          query: QUERY_PETS,
          data: { pets: [addPet, ...pets] },
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, pets: [...me.pets, addPet] } },
      });
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addPet({
        variables: {
          petName,
          petUser: Auth.getProfile().data.userFullname,
        },
      });

      setPetText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'petName' && value.length <= 280) {
      setPetText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div>
      <h3>Who would you like for us to walk?</h3>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 280 || error ? 'text-danger' : ''
            }`}
          >
            Character Count: {characterCount}/280
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="petName"
                placeholder="My dog's name is..."
                value={petName}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Pet
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to add your pet/s. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default petform;
