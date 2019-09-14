import React, { Component } from "react";
import withFirebaseAuth from "react-with-firebase-auth";
import * as firebase from "firebase";
import "firebase/auth";
import { ThemeProvider } from "emotion-theming";
import { Button, Box } from "rebass";
import firebaseConfig from "./firebaseConfig.js";
import { FirebaseComponentDisplay } from "./components/Firebase/FirebaseComponentDisplay";
import { ImageUpload } from "./components/Firebase/ImageUpload";
import { NewProject } from "./pages/Projects/newProject";
import { colors } from "./styles/colors";

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
    checkbox: { color: "blue1"}
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
      <ThemeProvider theme={theme}>
        <div className="App">
          <Box>
            {user ? (
              <FirebaseComponentDisplay
                user={user.displayName}
                image={user.photoURL}
              />
            ) : (
              <p>Please sign in.</p>
            )}
            <br />
            {user ? (
              <Button mr={2} onClick={signOut}>
                Sign out
              </Button>
            ) : (
              <Button mr={2} onClick={signInWithGoogle}>
                Sign in
              </Button>
            )}

            {user ? (
              <ImageUpload userID={user.uid} css={{ margin: "2rem" }} />
            ) : (
              ""
            )}
            {user ? <NewProject /> : ""}

            {/* {user ? <ImageViewer userID={user.uid} /> : ""} */}
          </Box>
        </div>
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
