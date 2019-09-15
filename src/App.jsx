import React, { Component } from "react";
import withFirebaseAuth from "react-with-firebase-auth";
import * as firebase from "firebase";
import "firebase/auth";
import { Global, css } from "@emotion/core";
import { ThemeProvider } from "emotion-theming";
import { Button, Box, Text } from "rebass";
import firebaseConfig from "./firebaseConfig.js";
import { FirebaseComponentDisplay } from "./components/Firebase/FirebaseComponentDisplay";
import { ImageUpload } from "./components/Firebase/ImageUpload";
import { NewProject } from "./components/Projects/newProject";
import { ProjectCard } from "./components/Projects/projectCard";
import { NewExpenditure } from "./pages/Expenses/newExpenditure";
import { Dashboard } from "./pages/General/dashboard";
import { LandingPage } from "./pages/General/landing";
import { colors } from "./styles/colors";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { thisExpression } from "@babel/types";
import Fade from "react-reveal/Fade";

const theme = {
  fontSizes: [12, 14, 16, 24, 32, 48, 64],
  colors: colors,
  buttons: {
    primary: {
      color: "blue1",
      bg: "transparent",
      transition: "color 1s",
      transition: "border-color 1s",
      boxShadow: "inset 0 0 0 2px",
      "&:hover": {
        color: "purple2"
      }
    },
    outline: {
      color: "primary",
      bg: "transparent",
      boxShadow: "inset 0 0 0 2px"
    },
    minimal: {
      color: "white",
      bg: "transparent",
      transition: "color 1s",
      boxShadow: "inset 0 0 0 2px",
      "&:hover": {
        borderWidth: "9",
        color: "blue3"
      }
    }
  },
  forms: {
    input: {
      color: "blue1"
    },
    select: {
      borderRadius: 9999
    },
    textarea: {},
    label: {},
    radio: { color: "blue1" },
    checkbox: { color: "blue1" }
  }
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { pictureURLs: [] };
  }

  render() {
    const { user, signOut, signInWithGoogle } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <Router>
          <Global styles={{ borderRadius: 8 }} />
          <Route
            path="/"
            exact
            component={() =>
              user ? (
                <AppIndex
                  user={user}
                  signOut={signOut}
                  signInWithGoogle={signInWithGoogle}
                />
              ) : (
                <LandingPage signInWithGoogle={signInWithGoogle} />
              )
            }
          />
        </Router>
      </ThemeProvider>
    );
  }
}

const firebaseAppAuth = firebaseApp.auth();

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider()
};

export default withFirebaseAuth({
  providers,
  firebaseAppAuth
})(App);

class AppIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      mappedProjects: [],
      loading: true,
      isTyping: true
    };
    this._getSubjects = this._getSubjects.bind(this);
    this.handleEndOfTyping = this.handleEndOfTyping.bind(this);
  }

  async _getSubjects() {
    var db = firebase.firestore();
    let coll = await db.collection(this.props.user.uid).get();
    coll._snapshot.docChanges.map(async project => {
      let projectSplit = project.doc.proto.name
        .split("/")
        .slice(-2)
        .join("/");
      let projectF = projectSplit
        .split("/")
        .slice(-1)
        .join("");
      db.collection(this.props.user.uid)
        .doc(projectF)
        .get()
        .then(thing => thing.data())
        .then(data => {
          console.log(data);
          console.log(this.state);
          this.state.projects.push(data);
          this.forceUpdate();
        });
    });
  }

  UNSAFE_componentWillMount() {
    this._getSubjects().then(() => this.setState({ loading: false }));
  }

  handleEndOfTyping() {
    this.setState({ isTyping: false });
    this.forceUpdate();
  }

  render() {
    if (!this.state.loading) {
      return (
        <div className="App">
          <Box
            css={{ transition: "width 0.5s, height 0.5s, opacity 0.5s 0.5s" }}
          >
            <FirebaseComponentDisplay
              user={this.props.user.displayName}
              image={this.props.user.photoURL}
              signOut={this.props.signOut}
              handleEndOfTyping={this.handleEndOfTyping}
            />

            {!this.state.isTyping ? (
              <>
                <Fade>
                  <Text fontSize={3} css={{ paddingBottom: 2 }}>
                    Your Projects:
                  </Text>
                  <Flex mx={-2}>
                    <Box width={1 / 2} px={2}>
                      <Text p={1} color="background" bg="primary">
                        Half
                      </Text>
                    </Box>
                    <Box width={1 / 2} px={2}>
                      <Text p={1} color="background" bg="primary">
                        Half
                      </Text>
                    </Box>
                  </Flex>

                  <ProjectCard
                    projects={this.state.projects}
                    userID={this.props.user.uid}
                  />
                </Fade>
                <br />
                <Fade>
                  <NewProject userID={this.props.user.uid} />
                </Fade>

                <Fade>
                  <NewExpenditure
                    projects={this.state.projects}
                    userID={this.props.user.uid}
                  />
                </Fade>
              </>
            ) : (
              <></>
            )}
          </Box>
        </div>
      );
    } else {
      return <p>Loading...</p>;
    }
  }
}
