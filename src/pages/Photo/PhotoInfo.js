import React, { Component } from 'react';
import Axios from '../../utils/axios.js';
import Masonry from 'react-masonry-component';
import Zmage from 'react-zmage'

import './photo.less'

const masonryOptions = {
  transitionDuration: 0
}

class PhotoInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {  
      filePath: 'http://localhost:9527/',
      id: '',
      list: []
    }
  }
  
  componentDidMount() {
    const { id } = this.props.match.params
    this.getPhotoList(id)
    this.setState({
      id
    })
  }

  getPhotoList(id) {
    Axios.get('photo/photoList',{
      data: {
        albumId: id
      }
    }).then(response => {
      this.setState({
        loading: true
      })
      if (response.status === 200) {
        const list = response.data.list
        this.setState({
          list
        })
      }
    })
  }

  render() { 
    return (  
      <div className="photo-info">
        <div className="photo-list">
          <Masonry
            className={'photo-list-ul'} // default ''
            elementType={'ul'} // default 'div'
            options={masonryOptions} // default {}
            disableImagesLoaded={false} // default false
            updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
          >
            {this.state.list.map((item, index) => 
              <li className="photo-list-li" key={index}>
                <Zmage className="photo-list-img" src={this.state.filePath + item.url} alt={item.name}></Zmage>
              </li>
            )}
          </Masonry>
        </div>
      </div>
    );
  }
}
 
export default PhotoInfo;
