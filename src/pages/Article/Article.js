import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Pagination } from 'antd';
import Axios from '../../utils/axios.js';
import './article.less'

class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {  
      page: 1,
      pageSize: 10,
      total: 0,
      articleList: []
    }
  }

  componentDidMount() {
    this.getArticleList()
  }

  getArticleList() {
    Axios.get('talk/list', {
      data: {
        page: this.state.page,
        limit: this.state.pageSize
      }
    }).then(response => {
      this.setState({
        articleList: response.data.list || [],
        total: response.data.total || 0
      })
    })
  }

  onPgaeChange = (page, pageSize) => {
    this.setState({
      page
    }, () => {
      this.getArticleList()
    })
  }

  render() { 
    return (  
      <div className="welcome-main">
        <div className="column-header">
          <h2 className="column-header-title">我的日志</h2>
        </div>
        <div className="article-main">
          <div className="article-list">
            <ul>
              {this.state.articleList.map((item, index) => 
                <ArticleItem key={index} item={item}></ArticleItem>
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

class ArticleItem extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    const item = this.props.item
    return (  
      <li>
        <Link className="article-list-item" to={`/article/info/${item.id}`}>
          <h3 className="article-list-item-title">{item.title}</h3>
          <div className="article-list-item-info">
            <div className="article-list-item-time">{item.createTime}</div>
            <div className="article-list-item-tag">{item.tag}</div>
          </div>
          <div className="article-list-item-content">{item.intro}</div>
        </Link>
      </li>
    );
  }
}
 
export default Article;