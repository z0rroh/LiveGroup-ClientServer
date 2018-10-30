import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

class AnunciosForm extends Component {

  constructor(props){
    super(props);
    this.state = {
      text: ''
    }
  }

  onChange(e){
    this.setState({text:e.target.value})

  }

  onSubmit(e){
    e.preventDefault();
    axios.post('/anuncios/create/',{text: this.state.text})
    .then((res)=>{
      console.log(res);
    })
    .catch((err)=>{
      console.log(err);
    })
    this.setState({text:''});
  }
  handleKeyDown (e) {
    if (e.key === 'Enter' && e.shiftKey === false && e!=='') {
      e.preventDefault();
      this.onSubmit(e);
    }
  };

  render(){
    const user = this.props.user;
    return(
        <section className="col-lg-8 card col-xs-10">
            <div className="AnuncioNuevo">
              <div className="row center-lg">
                <div className="AnuncioNuevo-Image col-lg-1 col-xs-2">
                  <img src={user.providerId ? user.user_image : "/images/avatars/"+user.user_image} alt="AnuncioFormAvatar"/>
                </div>
                <div className="AnuncioNuevo-Form col-lg-10 col-xs-9">
                  <form onSubmit={(e) => this.onSubmit(e)}
                        onKeyDown={(e) => { this.handleKeyDown(e); }}
                        className="box" acceptCharset="utf-8">
                    <div className="col-lg-12">
                      <textarea
                        value={this.state.text}
                        onChange={(e) => this.onChange(e)}
                        name="text" id="text" className="AnuncioNuevo-Text" placeholder="Escribe un anuncio" required></textarea>
                    </div>
                  </form>
                </div>
              </div>
            </div>
        </section>
    )}
}

const stateToProps = ({ auth }) => ({
  user: auth.user,
})



export default connect(stateToProps)(AnunciosForm)
