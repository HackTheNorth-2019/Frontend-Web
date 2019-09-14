
import { Card, Text, Image } from "rebass";
import * as firebase from 'firebase'
import React, { Component } from "react";

export class ProjectCard extends Component {
  constructor(props) {
    super(props);
    this._getProjects = this._getProjects.bind(this);
  }

  async _getProjects() {
    var db = firebase.firestore();
    let coll = await db.collection(this.props.userID).get();
console.log(coll)
  }

  UNSAFE_componentWillMount() {
    this._getProjects();
  }

  render() {
    return (
      <Card width={256}>
        <Image src={this.props.image} />
        <Text>{this.props.text}</Text>
      </Card>
    );
  }
}

export default ProjectCard;
