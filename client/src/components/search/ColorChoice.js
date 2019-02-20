import React from "react";

const ColorChoice = props => {
  return (
    <div className="color-container">
      {props.colorsCard.map(c => {
        return (
          <label key={c.identity} className={`color-check ${c.value}`}>
            <input
              type="checkbox"
              name="colors"
              value={c.value}
              checked={c.checked}
              onChange={props.handleChange}
              className={c.value}
            />
            {c.identity}
          </label>
        );
      })}
      <label className="colorless-radio">
        <input
          type="radio"
          name="colorless"
          value="Colorless"
          checked={props.colorless}
          onChange={props.radioChange}
        />
        Colorless
      </label>
    </div>
  );
};

export default ColorChoice;
