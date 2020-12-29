import React, { Component } from "react";

class DashboardButton extends Component {
  getClass = (className) => `app__dashboard__${className}`;

  render() {
    const { id, display, className, label, onClick } = this.props;

    if (id === "0") {
      return (
        <button
          key={id}
          className="app__dashboard__number app__dashboard__number_zero"
          onClick={() => onClick(id)}
        >
          {label}
        </button>
      );
    } else if (id === "clear") {
      return (
        <button className="app__dashboard__other" onClick={() => onClick(id)}>
          {display === "0" ? label : "C"}
        </button>
      );
    }
    return (
      <button className={this.getClass(className)} onClick={() => onClick(id)}>
        {label}
      </button>
    );
  }
}

export default DashboardButton;
