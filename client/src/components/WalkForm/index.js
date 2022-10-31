import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_WALK} from '../../utils/mutations';
import { QUERY_PETS, QUERY_WALK, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

const walkform = () => {
  const [petName, setpetName] = useState('');

  const [characterCount, setCharacterCount] = useState(0);

  const [addWalk, { error }] = useMutation(ADD_WALK); 
  //   update(cache, { data: { addWalk } }) {
  //     try {
  //       const { walks } = cache.readQuery({ query: QUERY_WALK });

  //       cache.writeQuery({
  //         query: QUERY_WALK,
  //         data: { walks: [addWalk, ...walks] },
  //       });
  //     } catch (e) {
  //       console.error(e);
      // }

  //     // update me object's cache
  //     const { me } = cache.readQuery({ query: QUERY_ME });
  //     cache.writeQuery({
  //       query: QUERY_ME,
  //       data: { me: { ...me, pets, walks: [...me.pets.walks, addWalk] } },
  //     });
  //   },
  // });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addWalk({
        variables: {
          // petUser: Auth.getProfile().data.userFullname,
          walkDate,
          walkTime,
          walkDuration,
          dogWalker,
          pet
        },
      });

      setWalkDate('');
      setWalkTime('');
      setWalkDuration('');
      setDogWalker('');
      setPet('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    // if (name === 'addWalk' && value.length <= 280) {
    // //   setaddWalk(value);
    // //   setCharacterCount(value.length);
    // }
     if (name === "walkDate" && value.length <= 280) {
      setWalkDate(value);
    } if (name === "walkTime" && value.length <= 280) {
      setWalkTime(parseInt(value));
    } if (name === "walkDuration" && value.length <= 280) {
      setWalkDuration(parseInt(value));
    } if (name === "dogWalker" && value.length <= 280) {
      setDogWalker(value);
    } if (name === "petName" && value.length <= 280) {
      setPet(value);
    }
    }
  };

  return (
    <div>
      <h3>When would you like your dog/s walked?</h3>

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
                name="walk"
                placeholder="please walk my dog.."
                value={walkDate}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Walk
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
          You need to be logged in to book a walk. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
;

export default petform;