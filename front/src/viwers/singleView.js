import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
import "./singleView.scss"

import { Card, CardImg, CardBody, CardTitle } from "shards-react";

class SingleView extends React.Component {
  constructor (props) {
    super(props);
    const id = this.props.match.params.id;
    this.state = {
      id: parseInt(id),
    }
  }

  componentDidUpdate() {
    if (this.state.src !== this.props.data[parseInt(this.state.id)].src) {
      this.setState({
        src: this.props.data[this.state.id].src,
        date: this.props.data[this.state.id].date,
        class: this.props.data[this.state.id].class,
        title: this.props.data[this.state.id].title,
      });
    }
  }

  render() {
    return (
      <div>
        <img src={process.env.PUBLIC_URL + `/media/${this.state.src}`} className="fullImage"/>
        <div>
          <h1 className="title"> {this.state.title} </h1>
          <h4>{this.state.date}</h4>
          <span>{this.state.class}</span>
        </div>
      {/* <Card>
        {this.state.src && <CardImg className="cardImage" style={{maxHeight: "25vh"}} src={process.env.PUBLIC_URL + `/media/${this.state.src}`} />}
        <CardBody>
        {this.state.src ? <p>Hello</p> : <p>Loading</p>}
        </CardBody>
      </Card> */}
      </div>
    );
  }
}

export default SingleView;
