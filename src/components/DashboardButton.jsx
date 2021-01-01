import React, { Component } from "react";

class DashboardButton extends Component {
  getClass = (className) => `app__dashboard__${className}`;

  render() {
    const { id, display, type, label, onClick } = this.props;

    if (id === 0) {
      return (
        <button
          key={id}
          className={`${this.getClass(type)} app__dashboard__number_zero`}
          onClick={() => onClick(type, id)}
        >
          {label}
        </button>
      );
    } else if (id === "clear") {
      return (
        <button
          className={this.getClass(type)}
          onClick={() => onClick(type, id)}
        >
          {display.value === "0" ? label : "C"}
        </button>
      );
    }
    return (
      <button className={this.getClass(type)} onClick={() => onClick(type, id)}>
        {label}
      </button>
    );
  }
}

export default DashboardButton;
