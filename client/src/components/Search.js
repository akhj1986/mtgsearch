import React, { Component } from "react";
import { connect } from "react-redux";
import { searchQuery } from "../store/actions/searchQuery";
import ResultsBoard from "./search/ResultsBoard";
import ColorChoice from "./search/ColorChoice";
import RarityChoice from "./search/RarityChoice";
import Types from "./search/Types";
import SubTypes from "./search/SubTypes";
import searchTerms from "./search/searchTerms.json";
import styles from "./Search.module.scss";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardName: "",
      colors: [],
      colorless: false,
      colorsCard: searchTerms.colorsCard,
      noOtherColor: false,
      rarity: [],
      rarityCard: searchTerms.rarityCard,
      typeCard: searchTerms.typeCard,
      type: "",
      subTypesCard: searchTerms.subTypesCard,
      subType: "",
      advancedSearch: false,
      advancedButtonText: "Advanced Search"
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleRadioChange = this.handleRadioChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => {
      return {
        advancedSearch: !prevState.advancedSearch,
        advancedButtonText: prevState.advancedSearch
          ? "Advanced Search"
          : "Basic Search"
      };
    });
  }

  handleChange(event) {
    const { name, value, type } = event.target;
    const searchCard = [name] + "Card";
    if (type === "checkbox") {
      this.setState(prevState => {
        let arr = prevState[name];
        if (arr.includes(value)) {
          arr = arr.filter(item => item !== value);
        } else {
          arr.push(value);
        }
        return {
          [name]: arr,
          colorless: name === "colors" ? false : prevState.colorless,
          [searchCard]: prevState[searchCard].map(card => {
            if (card.value !== value) {
              return card;
            }
            return {
              ...card,
              checked: !card.checked
            };
          })
        };
      });
    } else {
      this.setState({
        [name]: value
      });
    }
  }

  handleRadioChange(event) {
    const { name } = event.target;
    this.setState(prevState => {
      return {
        [name]: !prevState[name],
        colors: [],
        colorsCard: prevState.colorsCard.map(card => {
          return {
            ...card,
            checked: false
          };
        })
      };
    }, console.log(this.state[name]));
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.searchQuery(this.state);
    this.setState({
      hasSearched: true
    });
  }

  render() {
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
          <ColorChoice
            colorsCard={this.state.colorsCard}
            handleChange={this.handleChange}
            colorless={this.state.colorless}
            radioChange={this.handleRadioChange}
            noOtherColor={this.state.noOtherColor}
          />
          <RarityChoice
            rarityCard={this.state.rarityCard}
            handleChange={this.handleChange}
          />
          {this.state.advancedSearch ? (
            <div>
              <Types
                typeCard={this.state.typeCard}
                handleChange={this.handleChange}
              />
              <SubTypes
                subTypeCard={this.state.subTypesCard}
                handleChange={this.handleChange}
              />
            </div>
          ) : null}
          <button type="submit">Search</button>
        </form>
        <button onClick={this.handleClick} className={styles.advancedButton}>
          {this.state.advancedButtonText}
        </button>
        {this.state.hasSearched ? (
          <h1 className="search-status">
            {this.props.loading
              ? "Loading results..."
              : `${this.props.results.length} results found!`}
          </h1>
        ) : null}
        <div className="display-board">
          {this.props.results.map(card => {
            return <ResultsBoard srcData={card} key={card.id} />;
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    results: state.search.results,
    loading: state.search.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    searchQuery: results => dispatch(searchQuery(results))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
