import React, { Component } from "react";
import { Button, Box, Image, Text } from "rebass";
import * as firebase from 'firebase'

export class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      file: "",
      imagePreviewUrl: ""
    };
    this._handleImageChange = this._handleImageChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this)
  }
  _handleSubmit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
  }

  handleClick(e) {
    this.refs.fileUploader.click();
  }

  async _handleImageChange(e) {
    var storageRef = firebase.storage().ref();
    e.preventDefault();
    let reader = new FileReader();
    
    let file = e.target.files[0];
    console.log(file)
    if(this.props.intent == "project"){
      const uploadTask = storageRef.child(`${this.props.userID}/${this.props.projectName}/projectImage.${file.name.split(".").slice(-1)}`).put(file)
    } else {
      const uploadTask = storageRef.child(`${this.props.semiName}/${this.props.expenseName}/expenseReceipt.${file.name.split(".").slice(-1)}`).put(file)
    }
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
      this.props.imageChangeCallback(file, reader.result,`${this.props.userID}/${this.props.projectName}/projectImage.${file.name.split(".").slice(-1)}`)
    };
    console.log(file)
    console.log(reader.result)
    console.log(this.state)
    let { imagePreviewUrl } = this.state;
    if(imagePreviewUrl) {
      console.log(await imagePreviewUrl)
    }
    
    reader.readAsDataURL(file);
  }
  render() {
    let { imagePreviewUrl, file } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = <Image src={imagePreviewUrl} css={{borderRadius: 8, border:"black"}}/>;
    }
    return (
    <Box style={{margin:"2"}}>
      <form onSubmit={this._handleSubmit}>
      <input type="file" id="file" ref="fileUploader" onChange={this._handleImageChange} style={{display: "none"}}/>
      
      <Box><Button type="button" onClick={this.handleClick} css={{display:"inline-block"}}>{this.props.imageUploadText ? this.props.imageUploadText : "Upload Receipt"}</Button><Text css={{display:"inline-block", margin: "1rem"}}><Text fontWeight='bold' css={{display:"inline-block"}}>{this.state.file.name ? "File: " : ""}</Text> {this.state.file.name}</Text></Box>
      </form>
      {$imagePreview}
    </Box>
    );
  }
}
