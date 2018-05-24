import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Button, Intent, Popover, PopoverInteractionKind, Position} from "@blueprintjs/core";
import axios from 'axios'
import {Skeleton} from "@blueprintjs/core";
import PropTypes from 'prop-types';
import { editAvatar } from '../../actions/auth'
import { connect } from 'react-redux'
import { addToast } from '../../actions/Toast.js'

class UserAvatar extends Component{
    constructor(props){
      super(props);
      this.state = {
        avatar: null,
        isOpen: false,
        file: null,
        avatarName: "Seleccionar foto de perfil...",
        imagePreviewUrl: ""
      };
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(e){
      const {editAvatar, addToast} = this.props;
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
      editAvatar(avatar, config)
      .then(res=>{
          if(res){
            addToast({
            intent: Intent.DANGER,
            message: res
          })
          }
          else{
            addToast({
              intent: Intent.SUCCESS,
              message: "ACTUALIZACIÓN EXITOSA!"
            })
          }
      })
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
      this.setState({ isOpen: !this.state.isOpen });
    }

    componentDidMount(){
      this.setState({avatar: this.props.avatar});
    }

    render(){
      return(
        <div className="User-Edit-img">
          {
            this.state.avatar === null || this.state.avatar === 'undefined' ?
            (<div className="user-img-skeleton pt-skeleton"></div>) :
            (<img src={"/images/avatars/"+this.state.avatar} />)
          }
          <Popover
             isOpen={this.state.isOpen}
             onInteraction={() => this.handleInteraction()}
             interactionKind={PopoverInteractionKind.CLICK}
             popoverClassName="pt-popover-content-sizing"
             position={Position.RIGHT}>
              <button className="upload-icon"><i className="material-icons">&#xE439;</i></button>
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
UserAvatar.propTypes = {
  editAvatar: PropTypes.func.isRequired,
  addToast: PropTypes.func.isRequired
};

export default connect(null,{editAvatar, addToast })(UserAvatar);
