import { Box, Text, Image, Button } from "rebass";
import * as firebase from "firebase";
import React, { Component } from "react";
import Fade from 'react-reveal/Fade';

export class ProjectCard extends Component {
  constructor(props) {
    super(props);
    this.props = props
    this.state = { projects: [], mappedProjects: [] };
    this.render = this.render.bind(this)
  }

//   async _getData() {
//     var db = await firebase.firestore();
//     let mappedProjects = this.props.projects.map(async project => {
//       console.log("e");
//       let projectF = project
//         .split("/")
//         .slice(-1)
//         .join("");
//       let coll = await db
//         .collection(this.props.userID)
//         .doc(projectF)
//         .get();
//       console.log(coll.data());
//     });
//     this.setState({ mappedProjects: mappedProjects });
//   }

//   UNSAFE_componentWillReceiveProps() {
//     this.render()
//   }
componentDidMount(){
    if(!this.state.project){
        this.forceUpdate()
    }
}
  render() {
    return (
      <Box
        sx={{
          display: "grid",
          gridGap: 2,
          gridTemplateColumns: "repeat(auto-fit, minmax(12rem, 3fr))",
          mb: 2
        }}
      >
        {this.props.projects.map(project => {
          return (
            <Fade>
            <Box p={3} color="black1" bg="black3">
              <Text textAlign="center" fontWeight={600} fontSize={4} >
                  {project.name}
              </Text>
              <Image css={{objectFit: "contain"}} src={project.logoImage ? project.logoImage : ""}/>
              <Text><strong>Budget:</strong> {project.budget}</Text>
              <Text><strong>Deadline:</strong> {project.deadline}</Text>
            </Box>
            </Fade>
          );
        })}
      </Box>
    );
  }
}

export default ProjectCard;
