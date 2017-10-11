import React, { Component } from 'react'
import axios from 'axios'
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
    return(
        <section className="col-lg-8 card">
            <div className="AnuncioNuevo">
              <div className="row center-lg">
                <div className="AnuncioNuevo-Image col-lg-1"><img src={"/images/avatars/default_user.png"}/></div>
                <div className="AnuncioNuevo-Form col-lg-10">
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

export default AnunciosForm
