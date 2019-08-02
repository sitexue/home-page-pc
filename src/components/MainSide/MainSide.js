import React, { Component } from 'react';

import './mainSide.less';

class MainSide extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return (  
      <div className="main-side">
        <div className="info-card">
          <div className="info-card-top">
            <img className="headimg" src={require('../../assets/image/headimg.jpg')} alt="" />
            <p className="title">呆灬苹果</p>
            <p className="dec">菜鸡</p>
          </div>
        </div>
      </div>
    );
  }
}
 
export default MainSide;