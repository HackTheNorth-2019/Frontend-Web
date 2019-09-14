import React, { Component } from "react";
import { Label, Input, Select, Textarea, Radio, Checkbox } from "@rebass/forms";
import { Box, Flex, Button, Text } from "rebass";
import * as firebase from "firebase";

function verifyDate(str) {
  var date_regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
  if (!date_regex.test(str)) {
    return false;
  }
}

export class NewProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      deadline: "",
      currentExpenditure: "",
      budget: ""
    };
  }

  render() {
    return (
      <Box
        as="form"
        onSubmit={e => {
          e.preventDefault();

          console.log(this.state);
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
              onChange={e => this.setState({ name: e.target.value })}
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
      </Box>
    );
  }
}
