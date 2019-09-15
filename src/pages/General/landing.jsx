import React, { Component } from "react";
import { Box, Text, Button } from "rebass";
import Typist from "react-typist";

export class LandingPage extends Component {
  render() {
    return (
      <>
        <Box
          sx={{
            px: 4,
            py: 6,
            marginBottom: 2,
            backgroundImage:
              "url(https://source.unsplash.com/random/1024x768?water)",
            backgroundSize: "cover",
            borderRadius: 8,
            color: "white",
            bg: "gray",
            backdropFilter: "blur(8px)"
          }}
        >
          <Text textAlign="center" fontSize={[5, 6]} fontWeight={900}>
            Blü
            <Text fontWeight={300} css={{ display: "inline" }}>
              Board
            </Text>
          </Text>
          <Text textAlign="center" fontSize={[3, 4]} fontWeight={300}>
            <em>The</em>
            <Typist cursor={{hideWhenDone: true, hideWhenDoneDelay: 0, symbol: "|"}}>
              <span>smart</span>
              <Typist.Backspace count={8} delay={500} />
              <span>scalable</span>
              <Typist.Backspace count={9} delay={600} />
              <span>usable</span>
              <Typist.Backspace count={8} delay={700} />
              <span><strong>straightforward</strong></span>
            </Typist>
            budgeting solution.
            <br />
            <Button
              variant="minimal"
              alignSelf="center"
              mt={2}
              onClick={this.props.signInWithGoogle}
            >
              Sign Up
            </Button>
          </Text>
        </Box>
        <Box
          sx={{
            display: "grid",
            gridGap: 2,
            gridTemplateColumns: "repeat(auto-fit, minmax(128px, 1fr))",
            mb: 2
          }}
        >
          <Box p={3} color="black1" bg="black3">
            <Text fontWeight={600} fontSize={4}>
              Azure 🧠
            </Text>
            <Text fontWeight={400}>
              BlueBoard is built with <em>cutting-edge</em> machine learning
              technology, so that <em>you</em> can rest assured that your
              decisions are in good hands.
            </Text>
          </Box>
          <Box p={3} color="white" bg="blue1">
            <Text fontWeight={600} fontSize={4}>
              React ⚛️
            </Text>
            <Text fontWeight={400}>
              BlueBoard uses the latest version of React.js, so updates are
              frequent, and you needn't worry about bugs!
            </Text>
          </Box>
          <Box p={3} color="white" bg="black1">
            <Text fontWeight={600} fontSize={4}>
              Firebase 🔥
            </Text>
            <Text fontWeight={400}>
              BlueBoard uses the latest version of React.js, so updates are
              frequent, and you needn't worry about bugs!
            </Text>
          </Box>
        </Box>
        <Box p={3} color="white" bg="blue1">
          <Text textAlign="center" fontWeight={600} fontSize={4}>
            Sign Up
          </Text>
        </Box>
      </>
    );
  }
}

export default LandingPage;
