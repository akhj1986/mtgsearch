import React from "react";

const SubTypes = props => {
  return (
    <div>
      <label>Select subtype</label>
      <select name="subType" onChange={props.handleChange}>
        <option value="">Please select</option>
        {props.subTypeCard
          .sort((a, b) => {
            if (a < b) {
              return -1;
            }
            if (a > b) {
              return +1;
            } else {
              return 0;
            }
          })
          .map(subType => {
            return (
              <option value={subType} key={subType}>
                {subType}
              </option>
            );
          })}
      </select>
    </div>
  );
};

export default SubTypes;
