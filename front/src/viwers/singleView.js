import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
import "./singleView.scss"

import { Card, CardImg, CardBody } from "shards-react";

class Main extends React.Component {
  render() {
    return (
      <Card>
        <CardImg className="cardImage" style={{maxHeight: "25vh"}} src={this.props.src} />
        <CardBody>
          <p>Hello</p>
        </CardBody>
      </Card>
    );
  }
}

export default Main;
