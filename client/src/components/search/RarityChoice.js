import React from "react";

const RarityChoice = props => {
  return (
    <div className="rarity-container">
      {props.rarityCard.map(c => {
        return (
          <label key={c.identity} className={`rarity-check ${c.value}`}>
            <input
              type="checkbox"
              name="rarity"
              value={c.value}
              checked={c.checked}
              onChange={props.handleChange}
              className={c.value}
            />
            {c.identity}
          </label>
        );
      })}
    </div>
  );
};

export default RarityChoice;
