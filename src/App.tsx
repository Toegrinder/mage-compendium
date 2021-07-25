import React from 'react';
import './App.css';
import {Route, Router} from 'react-router-dom'
import history from './util/History'
import { mageSpecs } from './config/Config';
import RawData from './components/sims/RawData';
import SimsComponent from './components/sims/SimsComponent';
import GuidesComponent from './components/guides/GuidesComponent';
import Header from './components/header/Header';
import VODsComponent from './components/vods/VODsComponent';

function App() {
  return (
    <div className="App">
      <Header/>
      <div className="app-page">
        <Router history={history}>
          <Route 
            exact path="/sims" 
            render={() => (<SimsComponent specs={mageSpecs}/>)}
          />
          <Route 
            exact path="/sims/html" 
            render={() => (<RawData/>)}
          />
          <Route 
            exact path="/guides" 
            render={() => (<GuidesComponent/>)}
          />
          <Route 
            exact path="/vods" 
            render={() => (<VODsComponent/>)}
          />
        </Router>
      </div>
    </div>
  );
}

export interface Player {
  name: string,
  spec: string,
  dps: DPS
}

export interface DPS {
  mean: number,
  min: number,
  max: number
}


export default App;
