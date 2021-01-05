import React, { Component } from "react";
import PropTypes from "prop-types";

class Display extends Component {
  static propTypes = {
    text: PropTypes.string,
  };

  getNumberWithCommas = (str) => {
    let parts = str.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  };

  render() {
    return (
      <div className="app__display">
        <div className="app__display__text_wrapper">
          <h1 className="app__display__text_wrapper__text">
            {this.getNumberWithCommas(this.props.text)}
          </h1>
        </div>
      </div>
    );
  }
}

export default Display;
