import React from "react";
import { Link } from "react-router-dom";

const ResultsBoard = props => {
  return (
    <div className="image-container">
      <div className="image-header">
        <Link to={`/${props.srcData.id}`}>
          <h1>{props.srcData.name}</h1>
        </Link>
        <h2>{props.srcData.manaCost}</h2>
        <h4>{props.srcData.rarity}</h4>
      </div>
      <div className="printings">
        {props.srcData.printings.map(set => {
          return <p key={set}>{set}</p>;
        })}
      </div>
      <h3>{props.srcData.flavor}</h3>
      <p>{props.srcData.text}</p>
      <Link to={`/${props.srcData.id}`} className="image-link">
        <img
          src={props.srcData.imageUrl}
          alt={props.srcData.name}
          name={props.srcData.name}
          className="display-Image"
        />
      </Link>
    </div>
  );
};

export default ResultsBoard;
