import React, { Component } from "react";
import { Image, Text, Flex, Box, Button } from "rebass";
import { alignSelf } from "styled-system";
import Typist from "react-typist";

export class FirebaseComponentDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = { isTyping: true }
    this.props = props;
  }
  render() {
    return (
      <>
        <Flex px={2} pb={4} color="black" bg="#FFFFFF" alignItems="center">
          <Text fontSize={60} css={{ display: "inline" }}>
            <Typist onTypingDone={()=>{this.props.handleEndOfTyping();console.log("typing done")}} cursor={{hideWhenDone: true, hideWhenDoneDelay: 0, symbol: "|"}}>
              <span>Welcome back, {this.props.user.split(" ")[0]}!</span>
            </Typist>
          </Text>
          <Box mx="auto" css={{maxWidth:"20%"}} />
            {/* <Image
              src={this.props.image}
              css={{width:"5%"}}
            //   style={{
            //     display: "inline-block",
            //     borderRadius: 8,
            //     marginBottom: 2,
            //     maxWidth: "20%",
            //     height: "auto",
            //     borderRadius: 8
            //   }}
            /> */}

          <Button onClick={this.props.signOut}>Sign out</Button>
        </Flex>
      </>
    );
  }
}
