import React from 'react';
import './App.css';
import User from './User';
function App(){
    return(
        <div className="App">
            <header className="App-header">
                <h1>Weather App</h1>
                <User />
            </header>
        </div>
    );
}
export default App;
