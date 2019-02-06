import React from "react";

const DisplayImage = props => {
  const printings = props.srcData.printings.map(set => {
    return <p key={set}>{set}</p>;
  });
  return (
    <div className="image-container">
      <div className="image-header">
        <h1>{props.srcData.name}</h1>
        <h2>{props.srcData.manaCost}</h2>
      </div>
      <div className="printings">{printings}</div>
      <h3>{props.srcData.flavor}</h3>
      <p>{props.srcData.text}</p>

      <img
        src={props.srcData.imageUrl}
        alt={props.srcData.name}
        name={props.srcData.name}
        className="display-Image"
      />
    </div>
  );
};

export default DisplayImage;
