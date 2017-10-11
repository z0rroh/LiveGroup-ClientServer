import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Button, Intent, Popover, PopoverInteractionKind, Position} from "@blueprintjs/core";
import axios from 'axios'
import {Skeleton} from "@blueprintjs/core";

class UserAvatar extends Component{
    constructor(props){
      super(props);
      this.state = {
        avatar: "/images/avatars/",
        isOpen: false,
        file: null,
        avatarName: "Seleccionar foto de perfil...",
        imagePreviewUrl: ""
      };
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(e){
      e.preventDefault();
      let reader = new FileReader();
      var avatar = new FormData();
      avatar.append("avatar", this.state.file);
      reader.onload = () => {
        this.setState({
          avatarName: "Seleccionar foto de perfil...",
          isOpen: false,
          avatar: reader.result
        })
      }
      reader.readAsDataURL(this.state.file)
      const config = {
          headers: { 'content-type': 'multipart/form-data' }
      }
      axios.post("archivo/upload", avatar, config)
      .then((response)=>{
        if(response.status === 200)
          console.log("se subio bien!");
      })
      .catch((err)=>{
        console.log(err);
      });
    }
    handleChange(e){
      e.preventDefault();
      var file = e.target.files[0];
       this.setState({
         file: file,
         avatarName: file.name
       });

    }

    handleInteraction() {
      this.setState({ isOpen: true });
    }

    componentDidMount(){
      this.setState({avatar: this.state.avatar+this.props.avatar});
    }

    render(){
      return(
        <div className="User-Edit-img">
          {
            this.state.avatar === "/images/avatars/" || this.state.avatar === 'undefined' ?
            (<div className="user-img-skeleton pt-skeleton"></div>) :
            (<img src={this.state.avatar} />)
          }
          <Popover
             isOpen={this.state.isOpen}
             onInteraction={() => this.handleInteraction()}
             interactionKind={PopoverInteractionKind.CLICK}
             popoverClassName="pt-popover-content-sizing"
             position={Position.RIGHT}>
              <button className="upload-icon"><i className="material-icons">add_a_photo</i></button>
              <div className="Popover-Avatar">
                  <form encType="multipart/form-data" onSubmit={(e)=>this.handleSubmit(e)}>
                    <label className="pt-file-upload">
                      <input
                        onChange={(e)=> this.handleChange(e)}
                        className="upload-file"
                        type="file"
                        name="avatar"
                        accept=".png, .jpg, .jpeg"/>
                      <span className="pt-file-upload-input submit-name">{this.state.avatarName}</span>
                    </label>
                    <input
                      name="Upload"
                      type="submit"
                      className="pt-button submit-file" />
                  </form>
              </div>
          </Popover>
        </div>
      )
    }
}

export default UserAvatar;
