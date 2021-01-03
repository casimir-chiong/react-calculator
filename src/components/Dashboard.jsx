import React, { Component } from "react";
import DashboardButton from "./DashboardButton";

class Dashboard extends Component {
  getButtons = () => {
    const buttons = [];

    this.props.dashboard.forEach((line) => {
      line.forEach(({ id, label, orange, wide, grey }) => {
        buttons.push(
          <DashboardButton
            key={id}
            id={id}
            label={label ? label : id}
            grey={grey}
            orange={orange}
            wide={wide}
            display={this.props.display}
            onClick={this.props.onClick}
          />
        );
      });
    });

    return buttons;
  };

  render() {
    return (
      <div className="app__dashboard">
        {this.getButtons().map((button) => button)}
      </div>
    );
  }
}

export default Dashboard;
