import React, { Component } from 'react'
import {Skeleton} from "@blueprintjs/core";

class AnuncioSkeleton extends Component {

  constructor(){
    super();
    this.state = {

    }
  }

  render(){
    return(
      <ul id="comments-list" className="comments-list-skeleton">
        <li>
          <div className="comment-main-level-skeleton">
            <div className="comment-avatar-skeleton pt-skeleton"></div>
            <div className="comment-box-skeleton">
                <div className="comment-head-skeleton">
                  <h6 className="comment-name-skeleton pt-skeleton"></h6>
                  <span className="pt-skeleton"></span>
                  <i className="reply material-icons pt-skeleton">reply</i>
                  <i className="heart material-icons pt-skeleton">favorite</i>
                </div>
                <div className="comment-content-skeleton">
                  <p className="text-1 pt-skeleton"></p>
                  <p className="text-2 pt-skeleton"></p>
                </div>
            </div>
          </div>
        </li>
        <li>
          <div className="comment-main-level-skeleton">
            <div className="comment-avatar-skeleton pt-skeleton"></div>
            <div className="comment-box-skeleton">
                <div className="comment-head-skeleton">
                  <h6 className="comment-name-skeleton pt-skeleton"></h6>
                  <span className="pt-skeleton"></span>
                  <i className="reply material-icons pt-skeleton">reply</i>
                  <i className="heart material-icons pt-skeleton">favorite</i>
                </div>
                <div className="comment-content-skeleton">
                  <p className="text-1 pt-skeleton"></p>
                  <p className="text-2 pt-skeleton"></p>
                </div>
            </div>
          </div>
        </li>
      </ul>
    )
  }

}

export default AnuncioSkeleton;
