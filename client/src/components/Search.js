import React, { Component } from "react";
import DisplayImage from "./DisplayImage";

const mtg = require("mtgsdk");

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardName: "",
      results: [],
      status: "Enter search above",
      colors: [],
      Blue: false,
      Red: false,
      White: false,
      Green: false,
      Black: false,
      colorState: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleRadioChange = this.handleRadioChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.uniqBy = this.uniqBy.bind(this);
  }

  uniqBy = arr => {
    const cb = o => o.name;
    this.setState(() => {
      return {
        results: [
          ...arr
            .sort((a, b) => {
              let A = a.name.toUpperCase();
              let B = b.name.toUpperCase();
              if (A < B) {
                return -1;
              }
              if (A > B) {
                return 1;
              } else {
                return 0;
              }
            })
            .filter(card => {
              if (
                this.state.colorState === "Colorless" &&
                card.colors.length > 0
              ) {
                console.log(card.colors.length);
                return null;
              } else {
                return card;
              }
            })
            .filter(card => {
              if (card.imageUrl !== undefined) {
                return card;
              } else {
                return null;
              }
            })
            .reduce((map, item) => {
              const key = cb(item);

              map.has(key) || map.set(key, item);

              return map;
            }, new Map())
            .values()
        ]
      };
    });
    console.log(this.state.results);
    this.resultStatus(`${this.state.results.length} result(s) found`);
  };

  handleChange(event) {
    const { name, value, type, checked } = event.target;
    if (type === "checkbox") {
      this.setState(prevState => {
        let c = prevState.colors;
        if (c.includes(name)) {
          c = c.filter(col => col !== name);
        } else {
          c.push(name);
        }
        return {
          [name]: checked,
          colors: c,
          colorState: "hasColor"
        };
      });
    } else {
      this.setState({
        [name]: value
      });
    }
  }

  handleRadioChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      Blue: false,
      Red: false,
      White: false,
      Green: false,
      Black: false,
      colors: []
    });
  }

  resultStatus(message) {
    this.setState({
      status: message
    });
  }

  handleSubmit(event) {
    this.resultStatus("Loading results...");
    event.preventDefault();

    mtg.card
      .where({
        name: `${this.state.cardName}`,
        colors: `${this.state.colors}`
      })
      .then(result => {
        this.uniqBy(result);
      })
      .catch(err => {
        console.log("err", err);
      });
  }

  render() {
    const magicColors = [
      { color: "White", check: this.state.White },
      { color: "Blue", check: this.state.Blue },
      { color: "Black", check: this.state.Black },
      { color: "Red", check: this.state.Red },
      { color: "Green", check: this.state.Green }
    ];
    const colorChecks = magicColors.map(c => {
      return (
        <label key={c.color} className={`color-check ${c.color}`}>
          <input
            type="checkbox"
            name={c.color}
            value={c.color}
            checked={c.check}
            onChange={this.handleChange}
            className={c.color}
          />
          {c.color}
        </label>
      );
    });
    const cardDisplay = this.state.results.map(card => {
      return <DisplayImage srcData={card} key={card.id} />;
    });

    return (
      <div className="search-page">
        <h1>Magic: The Gathering</h1>
        <h2>Card search engine</h2>
        <form className="search-form" onSubmit={this.handleSubmit}>
          <input
            name="cardName"
            type="text"
            value={this.state.cardName}
            placeholder="Card Name"
            onChange={this.handleChange}
          />
          <div className="color-container">
            {colorChecks}
            <label className="colorless-radio">
              <input
                type="radio"
                name="colorState"
                value="Colorless"
                checked={this.state.colorState === "Colorless"}
                onChange={this.handleRadioChange}
              />
              Colorless
            </label>
          </div>
          <button type="submit">Search</button>
        </form>
        <h1 className="search-status">{this.state.status}</h1>
        <div className="display-board">{cardDisplay}</div>
      </div>
    );
  }
}

export default Search;
