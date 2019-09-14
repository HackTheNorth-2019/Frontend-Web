import React, { Component } from "react";
import withFirebaseAuth from "react-with-firebase-auth";
import * as firebase from "firebase";
import "firebase/auth";
import { ThemeProvider } from "emotion-theming";
import { Button, Box } from "rebass";
import firebaseConfig from "./firebaseConfig.js";
import { FirebaseComponentDisplay } from "./components/Firebase/FirebaseComponentDisplay";
import { ImageUpload } from "./components/Firebase/ImageUpload";
import { NewProject } from "./components/Projects/newProject";
import { ProjectCard } from "./components/Projects/projectCard"
import { NewExpenditure } from "./pages/Expenses/newExpenditure";
import { colors } from "./styles/colors";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

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

class ImageViewer extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      thing: "",
      photoURLs: []
    };
    this.photoURLs = [];
    this.getImagesFromFirebase = this.getImagesFromFirebase.bind(this);
  }

  getImagesFromFirebase = async () => {
    var storageRef = firebase.storage().ref();
    // Create a reference under which you want to list
    var listRef = storageRef.child(this.props.userID + "/");

    // Find all the prefixes and items.
    listRef
      .listAll()
      .then(function(res) {
        res.items.map(async function(thing) {
          console.log(thing.location.path);
          let itemRef = thing.location.path;
          let storageItemRef = storageRef.child(itemRef);
          let storageItemUrl = storageItemRef.getDownloadURL();
          this.photoURLs.push(storageItemUrl);
        });
      })
      .then(() => console.log(this.photoURLs))
      .catch(function(error) {
        // Uh-oh, an error occurred!
      });
  };

  render() {
    this.getImagesFromFirebase();
    return <div></div>;
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { pictureURLs: [] };
  }

  render() {
    const { user, signOut, signInWithGoogle } = this.props;

    return (
      <Router>
        <Route
          path="/"
          exact
          component={() => (
            <AppIndex
              user={user}
              signOut={signOut}
              signInWithGoogle={signInWithGoogle}
            />
          )}
        />

      </Router>
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

    }
    this._getProjects = this._getProjects.bind(this)
    this._getProjects()
  }

  _getProjects = async ()=> {
    // var db = await firebase.firestore();
    // let coll = await db.collection(this.props.user.uid).get();

    // this.setState({
    //   projects: coll._snapshot.docChanges.map(project => {
    //     return project.doc.proto.name
    //       .split("/")
    //       .slice(-2)
    //       .join("/");
    //   })
    // });
    // console.log(coll._snapshot.docChanges[0].doc.proto.name.split('/').slice(-1))
    // console.log(this.state)
    console.log(this.props.user)
  }

  // UNSAFE_componentWillMount = async () => {
  //   var db = await firebase.firestore();
  //   let coll = await db.collection(this.props.user.uid).get();

  //   this.setState({
  //     projects: coll._snapshot.docChanges.map(project => {
  //       return project.doc.proto.name
  //         .split("/")
  //         .slice(-2)
  //         .join("/");
  //     })
  //   });
  //   console.log(coll._snapshot.docChanges[0].doc.proto.name.split('/').slice(-1))
  //   console.log(this.state)
  // }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <div className="App">
          <Box>
            {this.props.user ? (
              <FirebaseComponentDisplay
                user={this.props.user.displayName}
                image={this.props.user.photoURL}
              />
            ) : (
              <p>Please sign in.</p>
            )}
            <br />
            {this.props.user ? (
              <Button mr={2} onClick={this.props.signOut}>
                Sign out
              </Button>
            ) : (
              <Button mr={2} onClick={this.props.signInWithGoogle}>
                Sign in
              </Button>
            )}

            {this.props.user ? (
              <ImageUpload
                userID={this.props.user.uid}
                css={{ margin: "2rem" }}
              />
            ) : (
              ""
            )}
            {this.props.user ? <NewProject userID={this.props.user.uid} /> : ""}

            {this.props.user ? (
              <NewExpenditure userID={this.props.user.uid} />
            ) : (
              ""
            )}
            {this.props.user ? (
              <ProjectCard userID = {this.props.user.uid}/>
            ) : (
              ""
            )}
          </Box>
        </div>
      </ThemeProvider>
    );
  }
}
