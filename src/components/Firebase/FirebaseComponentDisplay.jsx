import React, { Component } from "react";
import { Image } from "rebass";
export class FirebaseComponentDisplay extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }
  render() {
    return (<>
      <p>Hello, {this.props.user}</p>
      <Image src={this.props.image} sx={{
        borderRadius: 8,
        margin: 2
      }} />
    </>);
  }
}
