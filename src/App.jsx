import React, { Component } from "react";
import withFirebaseAuth from "react-with-firebase-auth";
import * as firebase from "firebase";
import "firebase/auth";
import { ThemeProvider } from 'emotion-theming'
import { Button, Box } from "rebass";
import firebaseConfig from "./firebaseConfig.js";
import { FirebaseComponentDisplay } from "./components/Firebase/FirebaseComponentDisplay";

const colors = {
  blue1: "#3D5CFF",
  blue2: "#617AFF",
  blue3: "#8DA0FF",

  purple1: "#7B3DFF",
  purple2: "#9F72FF",
  purple3: "#C6ABFF",

  black1: "#414141",
  black2: "#787878",
  black3: "#D0D0D0",

  white: "#F3F3F3"
}

const theme = {
  fontSizes: [
    12, 14, 16, 24, 32, 48, 64
  ],
  colors: colors,
  buttons: {
    primary: {
      color: 'blue1',
      bg: 'transparent',
      boxShadow: 'inset 0 0 0 2px',
      '&:hover': {
        color: 'purple2'
      }
    },
    outline: {
      color: 'primary',
      bg: 'transparent',
      boxShadow: 'inset 0 0 0 2px'
    },
  },
}


const firebaseApp = firebase.initializeApp(firebaseConfig);

class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      file: "",
      imagePreviewUrl: ""
    };
    this._handleImageChange = this._handleImageChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _handleSubmit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
  }

  async _handleImageChange(e) {
    var storageRef = firebase.storage().ref();
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    };

    var mountainsRef = await storageRef
      .child(`${this.props.userID}/${file.name}`)
      .put(file);

    reader.readAsDataURL(file);
  }

  render() {
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = <img src={imagePreviewUrl} />;
    }

    return (
      <div>
        <form onSubmit={this._handleSubmit}>
          <input type="file" onChange={this._handleImageChange} />
          <Button type="submit" onClick={this._handleSubmit}>
            Upload Image
          </Button>
        </form>
        {$imagePreview}
      </div>
    );
  }
}

class ImageViewer extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      thing: "",
      photoURLs: []
    }
    this.photoURLs = []
    this.getImagesFromFirebase = this.getImagesFromFirebase.bind(this)
  }

  getImagesFromFirebase = async () =>{
    var storageRef = firebase.storage().ref()
    // Create a reference under which you want to list
    var listRef = storageRef.child(this.props.userID+"/");

    // Find all the prefixes and items.
    listRef
      .listAll()
      .then(function(res) {
        res.items.map(async function(thing){
          console.log(thing.location.path)
          let itemRef = thing.location.path
          let storageItemRef = storageRef.child(itemRef)
          let storageItemUrl = storageItemRef.getDownloadURL()
          this.photoURLs.push(storageItemUrl)
        })
      }).then(()=>console.log(this.photoURLs))
      .catch(function(error) {
        // Uh-oh, an error occurred!
      });
  }

  render() {
    this.getImagesFromFirebase()
    return (
      <div>
        
      </div>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { pictures: [] };
    this.onDrop = this.onDrop.bind(this);
  }
  onDrop(picture) {
    this.setState({
      pictures: this.state.pictures.concat(picture)
    });
    console.log(picture.webkitRelativePath);
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

          {user ? <ImageUpload userID={user.uid} /> : ""}

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
