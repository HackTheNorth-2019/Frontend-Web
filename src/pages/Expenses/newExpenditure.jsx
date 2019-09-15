import React, { Component } from "react";
import { ImageUpload } from "../../components/Firebase/ImageUpload";
import { Label, Input, Select, Textarea, Radio, Checkbox } from "@rebass/forms";
import { Box, Flex, Button, Text } from "rebass";
import * as firebase from "firebase";
import { timingSafeEqual } from "crypto";

export class NewExpenditure extends Component {
  constructor(props) {
    super(props);
    this.state = {
      receipt: null,
      projects: [],
      selectedProject: "",
      recurring: "false",
      name: "",
      receipt: ""
    };
    this.projects = [];
    console.log(this.props.userID);
    this._handleSubmit = this._handleSubmit.bind(this);
    // this._getProjects = this._getProjects.bind(this);
  }

  async _handleSubmit() {
    var db = firebase.firestore();
    console.log(this.props.userID);
    console.log(this.state.selectedProject);
    console.log(
      this.state.selectedProject
        .split("/")
        .slice(1)
        .join("")
    );
    console.log(this.state.name)
    await db
      .collection(this.props.userID)
      .doc(
        this.state.selectedProject
          .split("/")
          .slice(1)
          .join("")
      )
      .collection("Expenditure")
      .doc(this.state.name)
      .set({recurring: this.state.recurring, receipt: this.state.receipt});
  }

//   async _getProjects() {
//     var db = firebase.firestore();
//     let coll = await db.collection(this.props.userID).get();

//     await this.setState({
//       projects: coll._snapshot.docChanges.map(project => {
//         return project.doc.proto.name
//           .split("/")
//           .slice(-2)
//           .join("/");
//       })
//     });
//     console.log(this.state);
//     console.log(coll._snapshot.docChanges[0].doc.proto.name.split('/').slice(-1))
//     await this.setState({
//         selectedProject: coll._snapshot.docChanges[0].doc.proto.name.split('/').slice(-1)
//     })
//   }

//   UNSAFE_componentWillMount() {
//     this._getProjects();
//   }

  render() {
    return (
      <Box
        as="form"
        onSubmit={e => {
          e.preventDefault();
          if (
            this.state.receipt == null ||
            typeof this.state.recurring == "string" ||
            this.state.name.length == 0
          ) {
            alert("Fill out all forms.");
          } else {
            console.log(this.state);
          }
          this._handleSubmit();
        }}
        py={3}
      >
        <Text
          width={1}
          fontSize={[3]}
          css={{ margin: 0 }}
          fontWeight="bold"
          color="primary"
        >
          General
        </Text>
        <br />
        <Flex mx={-2} mb={3}>
          <Box width={[1 / 4, 1 / 2]} px={2}>
              <Label htmlFor="country">Project</Label>
              <Select
                onChange={e => {
                  this.setState({ selectedProject: e.target.value });
                  console.log(this.state);
                }}
              >
                {this.props.projects.map(project => (
                  <option>{project.name}</option>
                ))}
              </Select>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Name of expense"
                onChange={e => {
                    this.setState({ name: e.target.value });
                }}
              />
          </Box>
        </Flex>
        <Text
          width={1}
          fontSize={[3]}
          css={{ margin: 0 }}
          fontWeight="bold"
          color="primary"
        >
          Finance
        </Text>
        <br />
        <Flex mx={-2} mb={3}>
          <Box width={1 / 4} px={2}>
            <Label htmlFor="name">Recurring Payment?</Label>
            <Label>
              <Checkbox
                id="recurring"
                name="recurring"
                onClick={() =>
                  this.setState(prevState => ({
                    recurring: !prevState.recurring
                  }))
                }
              />
              Recurring
            </Label>
          </Box>
        </Flex>
        <ImageUpload
          userID={this.props.userID}
          semiName={this.state.selectedProject}
          expenseName={this.state.name}
          imageChangeCallback={(e, img, firebasePath) => this.setState({ receipt: e.name, receipt: img, receiptFirebasePath: firebasePath })}
        />
        <Button type="submit">Submit</Button>
      </Box>
    );
  }
}
