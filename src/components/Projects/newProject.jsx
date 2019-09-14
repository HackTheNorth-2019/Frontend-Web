import React, { Component } from "react";
import { Label, Input, Select, Textarea, Radio, Checkbox } from "@rebass/forms";
import { ImageUpload } from "../../components/Firebase/ImageUpload";
import { Box, Flex, Button, Text } from "rebass";
import * as firebase from "firebase";


export class NewProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      deadline: "",
      currentExpenditure: "",
      budget: "",
      logoLink: ""
    };
    this._handleSubmit = this._handleSubmit.bind(this)
  }

  async _handleSubmit(){
    var db = firebase.firestore();
    await db.collection(this.props.userID).doc(this.state.name).set(this.state)
  }

  render() {
    return (
      <Box
        as="form"
        onSubmit={e => {
          e.preventDefault(); 
          if(this.state.name.length <= 0 || this.state.deadline.length <= 0 || this.state.currentExpenditure.length <= 0 || this.state.budget.length <= 0){
              alert("Fill out all forms.")
          } else {
            console.log(this.state);
            this._handleSubmit()
          }
          
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
          Project: <Text css={{display:'inline'}} fontWeight="500">{this.state.name}</Text>
        </Text>
        <hr/>
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
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Project Name"
              onChange={e => this.setState({ name: e.target.value })}
            />
          </Box>
          <Box width={(1 / 4, 1 / 2)} px={2}>
            <Label htmlFor="name">Deadline</Label>
            <Input
              id="name"
              name="name"
              placeholder="MM/DD/YYYY"
              onChange={e => this.setState({ deadline: e.target.value })}
            />
          </Box>
        </Flex>
        <ImageUpload intent="project" projectName={this.state.name} userID={this.props.userID} imageChangeCallback={(file, readingLink) => {this.setState({logoLink: readingLink})}} imageUploadText="Upload Logo"/>
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
            <Label htmlFor="name">Current Expenditure</Label>
            <Input
              id="name"
              name="name"
              placeholder="$500"
              onChange={e =>
                this.setState({ currentExpenditure: e.target.value })
              }
            />
          </Box>
          <Box width={1 / 4} px={2}>
            <Label htmlFor="name">Budget</Label>
            <Input
              id="name"
              name="name"
              placeholder="$13 000"
              onChange={e => this.setState({ budget: e.target.value })}
            />
          </Box>
          
        </Flex>
        <Button type="submit">Submit</Button>
      </Box>
    );
  }
}
