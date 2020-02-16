import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";

import { Card } from "shards-react";

class Main extends React.Component {
  render() {
    const { subject, number, date, tags, isLoading } = this.props;

    return (
      <Card>
        {isLoading ? loadingMessage : userDetails}
      </Card>
    );
  }
}

export default Main;
