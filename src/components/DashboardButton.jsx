import React, { Component } from "react";
import PropTypes from "prop-types";

class DashboardButton extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    buttonStyle: PropTypes.string,
    display: PropTypes.string,
    onClick: PropTypes.func.isRequired,
  };

  getClass = (className) => `app__dashboard__${className}`;

  render() {
    const { id, buttonStyle, display, onClick } = this.props;

    return (
      <button
        className={this.getClass(buttonStyle)}
        onClick={() => onClick(id)}
      >
        {id !== "clear" ? id : display ? "C" : "AC"}
      </button>
    );
  }
}

export default DashboardButton;
