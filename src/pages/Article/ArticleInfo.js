import React, { Component } from 'react';
import { Skeleton } from 'antd';
import Axios from '../../utils/axios.js';
import './article.less'

class ArticleInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {  
      loading: false,
      id: '',
      title: '',
      createTime: '',
      tag: '',
      content: ''
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params
    this.getArticleInfo(id)
    this.setState({
      id
    })
  }

  getArticleInfo(id) {
    Axios.get('talk/info',{
      data: {
        id
      }
    }).then(response => {
      this.setState({
        loading: true
      })
      if (response.status === 200) {
        const { title, createTime, tag, content } = response.data
        this.setState({
          title,
          createTime,
          tag,
          content
        })
      }
    })
  }

  render() { 
    return (  
      <div className="article-info">
        <Skeleton className="skeleton-bg" active loading={!this.state.loading}>
          <div className="article-info-top">
            <h3 className="article-info-top-title">{this.state.title}</h3>
            <div className="article-info-top-info">
              <div className="article-info-top-time">{this.state.createTime}</div>
              <div className="article-info-top-tag">{this.state.tag}</div>
            </div>
          </div>
          <article className="article-info-main" dangerouslySetInnerHTML={{__html:this.state.content}}></article>
        </Skeleton>
      </div>
    );
  }
}
 
export default ArticleInfo;