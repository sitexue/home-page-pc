import React, { Suspense } from 'react';
import './App.less';
import './assets/css/github-markdown-css.css';
import { BrowserRouter } from 'react-router-dom';
import AppMainRoute from './router';

import AppHeader from './components/AppHeader/AppHeader';
import MainSide from './components/MainSide/MainSide';
import MyLoading from './components/MyLoading/MyLoading';

function App() {
  return (
    <div className="App">
      <Suspense fallback={<MyLoading></MyLoading>}>
        <BrowserRouter>
          <AppHeader></AppHeader>
          <main className="App-main">
            <div className="App-main-container">
              <AppMainRoute/>
            </div>
            <MainSide></MainSide>
          </main>
          <footer className="App-footer"></footer>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
