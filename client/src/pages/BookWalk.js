import React from "react";

import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import CommentList from "../components/CommentList";
import CommentForm from "../components/CommentForm";

import { placeholder, QUERY_WALK } from "../utils/queries";
import { BookWalk } from "../../../server/models";

const BookWalk = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { Id } = useParams();

  const { loading, data } = useQuery(QUERY_WALK, {
    // pass URL parameter
    variables: { walk: _id, walkDuration, walkTime, walkDate, },
  });

  const walk = data?.walk || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="my-3">
      <h3 className="card-header bg-dark text-light p-2 m-0">
        {walk.} <br />
        <span style={{ fontSize: "1rem" }}>
          booked his walk on {walk.createdAt}
        </span>
      </h3>
      <div className="bg-light py-4">
        <blockquote
          className="p-4"
          style={{
            fontSize: "1.5rem",
            fontStyle: "italic",
            border: "2px dotted #1a1a1a",
            lineHeight: "1.5",
          }}
        >
          {walk.walkText}
        </blockquote>
      </div>

      <div className="my-5">
        <CommentList comments={walk.comments} />
      </div>
      <div className="m-3 p-4" style={{ border: "1px dotted #1a1a1a" }}>
        <CommentForm walkId={walk._id} />
      </div>
    </div>
  );
};

export default BookWalk;
