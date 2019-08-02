import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Pagination } from 'antd';
import Axios from '../../utils/axios.js';
import './photo.less'

class Photo extends Component {
  constructor(props) {
    super(props);
    this.state = {  
      filePath: 'http://localhost:9527/',
      pageSize: 10,
      total: 0,
      photoAlbumList: []
    }
  }

  componentDidMount() {
    this.getPhotoAlbumList()
  }

  getPhotoAlbumList() {
    Axios.get('photo/albumList', {
      data: {
        page: this.state.page,
        limit: this.state.pageSize
      }
    }).then(response => {
      this.setState({
        photoAlbumList: response.data.list || [],
        total: response.data.total || 0
      })
    })
  }

  onPgaeChange = (page, pageSize) => {
    this.setState({
      page
    }, () => {
      this.getPhotoAlbumList()
    })
  }

  render() { 
    return (  
      <div className="welcome-main">
        <div className="column-header">
          <h2 className="column-header-title">我的相册</h2>
        </div>
        <div className="photo-album-main">
          <div className="photo-album-list">
            <ul>
              {this.state.photoAlbumList.map((item, index) => 
                <li key={index} item={item}>
                  <Link className="photo-album-item" to={`/photo/info/${item.id}`}>
                  <div className="photo-album-item-img" style={{backgroundImage: `url(${this.state.filePath + item.coverImg})`}}></div>
                  <p className="photo-album-item-title">{item.title}</p>
                  </Link>
                </li>
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
 
export default Photo;

