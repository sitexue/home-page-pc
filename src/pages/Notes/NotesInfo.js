import React, { Component } from 'react';
import { Skeleton } from 'antd';
import Axios from '../../utils/axios.js';
import './notes.less'

class NotesInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {  
      loading: false,
      id: '',
      title: '',
      createTime: '',
      tag: '',
      html: ''
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params
    this.getNotesInfo(id)
    this.setState({
      id
    })
  }

  getNotesInfo(id) {
    Axios.get('notes/info',{
      data: {
        id
      }
    }).then(response => {
      this.setState({
        loading: true
      })
      if (response.status === 200) {
        const { title, createTime, tag, html } = response.data
        this.setState({
          title,
          createTime,
          tag,
          html
        })
      }
    })
  }

  render() { 
    return (  
      <div className="notes-info">
        <Skeleton className="skeleton-bg" active loading={!this.state.loading}>
          <div className="notes-info-top">
            <h3 className="notes-list-item-title">{this.state.title}</h3>
            <div className="notes-list-item-info">
              <div className="notes-list-item-time">{this.state.createTime}</div>
              <div className="notes-list-item-tag">{this.state.tag}</div>
            </div>
          </div>
          <article className="notes-info-main markdown-body" dangerouslySetInnerHTML={{__html:this.state.html}}></article>
        </Skeleton>
      </div>
    );
  }
}
 
export default NotesInfo;