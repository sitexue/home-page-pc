import React, { lazy } from 'react';
import { Route, Switch } from 'react-router-dom';

const Notes = lazy(() => import('../pages/Notes/Notes'));
const NotesInfo = lazy(() => import('../pages/Notes/NotesInfo'));
const Article = lazy(() => import('../pages/Article/Article'));
const ArticleInfo = lazy(() => import('../pages/Article/ArticleInfo'));
const Photo = lazy(() => import('../pages/Photo/Photo'));
const PhotoInfo = lazy(() => import('../pages/Photo/PhotoInfo'));

const AppMainRoute = () => (
  <Switch>
    <Route exact path="/" component={Notes}/>
    <Route path="/notes/info/:id" component={NotesInfo}/>
    <Route path="/article/list" component={Article}/>
    <Route path="/article/info/:id" component={ArticleInfo}/>
    <Route path="/photo/list" component={Photo}/>
    <Route path="/photo/info/:id" component={PhotoInfo}/>
  </Switch>
);


export default AppMainRoute;