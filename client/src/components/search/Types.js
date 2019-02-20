import React from "react";

const Types = props => {
  return (
    <div>
      <label>Select type</label>
      <select name="type" onChange={props.handleChange}>
        <option value="">Please select</option>
        {props.typeCard.map(type => {
          return (
            <option value={type.value} key={type.identity}>
              {type.identity}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Types;
