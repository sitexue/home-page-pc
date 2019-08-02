import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Pagination } from 'antd';
import Axios from '../../utils/axios.js';
import './notes.less'

class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {  
      page: 1,
      pageSize: 10,
      total: 0,
      notesList: []
    }
  }

  componentDidMount() {
    this.getNotesList()
  }

  getNotesList() {
    Axios.get('notes/list', {
      data: {
        page: this.state.page,
        limit: this.state.pageSize
      }
    }).then(response => {
      this.setState({
        notesList: response.data.list || [],
        total: response.data.total || 0
      })
    })
  }

  onPgaeChange = (page, pageSize) => {
    this.setState({
      page
    }, () => {
      this.getNotesList()
    })
  }

  render() { 
    return (  
      <div className="welcome-main">
        <div className="column-header">
          <h2 className="column-header-title">我的笔记</h2>
        </div>
        <div className="notes-main">
          <div className="notes-list">
            <ul>
              {this.state.notesList.map((item, index) => 
                <NotesItem key={index} item={item}></NotesItem>
              )}
            </ul>
          </div>
          <Pagination 
            defaultCurrent={1} 
            total={this.state.total} 
            pageSize={this.state.pageSize} 
            onChange={this.onPgaeChange}
          ></Pagination>
        </div>
      </div>
    );
  }
}

class NotesItem extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    const item = this.props.item
    return (  
      <li>
        <Link className="notes-list-item" to={`/notes/info/${item.id}`}>
          <h3 className="notes-list-item-title">{item.title}</h3>
          <div className="notes-list-item-info">
            <div className="notes-list-item-time">{item.createTime}</div>
            <div className="notes-list-item-tag">{item.tag}</div>
          </div>
          <div className="notes-list-item-content">{item.intro}</div>
        </Link>
      </li>
    );
  }
}
 
export default Notes;