import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import './appHeader.less';

class AppHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }

  menu = [
    {title: '首页', to: '/', exact: true},
    {title: '生活记录', to: '/article/list'},
    {title: '相册', to: '/photo/list'}
  ]

  render() { 
    return (  
      <header className="App-header">
        <div className="App-header-fixed">
          <div className="App-header-container">
            <nav>
              <ul>
                {this.menu.map((item, index) => 
                  <li key={index}>
                    { /* 网上找到的一个方案，解决route焦点问题 */
                      /* <Route
                      path={item.to}
                      exact
                      children={({ match }) => (
                        <Link className={`link ${match ? 'cur' : ''}`} to={item.to}>{item.title}</Link>
                      )}
                     /> */}
                     <NavLink exact={item.exact} className="link" activeClassName="cur" to={item.to}>{item.title}</NavLink>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </header>
    );
  }
}
 
export default AppHeader;