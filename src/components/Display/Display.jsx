import React, { Component } from "react";

class Display extends Component {
  getNumberWithCommas = (number, length) => {
    if (length >= 4) {
      const parts = number.toString().split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
    }

    return number;
  };
  getSize = (length) => {
    return length > 5 ? length - 4 : 1;
  };
  getClass = (size) => {
    return `app__display__text_wrapper__text--${size}`;
  };
  render() {
    const { display } = this.props;

    return (
      <div className="app__display">
        <div className="app__display__text_wrapper">
          <h1
            className={this.getClass(this.getSize(display.toString().length))}
          >
            {this.getNumberWithCommas(display, display.toString().length)}
          </h1>
        </div>
      </div>
    );
  }
}

export default Display;
