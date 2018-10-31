import React, {Component} from 'react';
import {Intent, Popover, PopoverInteractionKind, Position} from "@blueprintjs/core";
import PropTypes from 'prop-types';
import { editAvatar } from '../../actions/auth'
import { connect } from 'react-redux'
import { addToast } from '../../actions/Toast.js'

class UserAvatar extends Component{
    constructor(props){
      super(props);
      this.state = {
        avatar: "/images/avatars/"+this.props.avatar,
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
      if ( this.state.file !== null){
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
        editAvatar(avatar, config, reader.result)
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
      }else{
        addToast({
          intent: Intent.WARNING,
          message: "Debes seleccionar una imagen"
        })
      }
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

    render(){
      const user = this.props.user;
      return(
        <div className="User-Edit-img">
          {
            this.state.avatar === null || this.state.avatar === 'undefined' ?
            (<div className="user-img-skeleton pt-skeleton"></div>) :
            (<img src={user.providerId ? user.user_image : this.state.avatar} alt="PerfilAvatar" />)
          }
          { !user.providerId &&
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
                      value="Cambiar"
                      name="Upload"
                      type="submit"
                      className="pt-button submit-file" />
                  </form>
              </div>
          </Popover>
        }
        </div>
      )
    }
}
UserAvatar.propTypes = {
  editAvatar: PropTypes.func.isRequired,
  addToast: PropTypes.func.isRequired
};

export default connect(null,{editAvatar, addToast })(UserAvatar);
