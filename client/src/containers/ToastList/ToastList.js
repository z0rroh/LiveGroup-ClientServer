import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Position, Toaster } from "@blueprintjs/core";
import { clearToasts } from '../../actions/Toast'
import PropTypes from 'prop-types';

class ToastList extends Component{

      componentDidMount() {
        if (this.props.toasts.length > 0) {
          this.props.toasts.forEach((toast) => {
            this.toaster.show(toast);
          });
          this.props.clearToasts();
        }
      }

      componentDidUpdate(prevProps,prevState) {
        if (this.props.toasts.length > 0) {
          this.props.toasts.forEach((toast) => {
            this.toaster.show(toast);
          });
          this.props.clearToasts();
        }
      }

      refHandlers = {
        toaster: el => (this.toaster = el),
      };

      render(){
        return (
          <div>
            <Toaster position={Position.TOP_RIGHT} ref={this.refHandlers.toaster} />
          </div>
        );
      }
}

ToastList.propTypes = {
  toasts: PropTypes.array.isRequired,
  clearToasts: PropTypes.func.isRequired
}

function mapStateToProps({Toast}){
  return {
    toasts: Toast.toastQueue
  }
}

export default connect(mapStateToProps, { clearToasts })(ToastList);
