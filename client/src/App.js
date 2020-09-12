import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import FirstPage from './components/FirstPage'
import ChatRoom from './components/ChatRoom'
import { ChatContext } from './ChatContext';

function App() {

  const [firstName, setFirstName] = useState(null)
  const [lastName, setLastName] = useState(null)


  return (
    <div className="App">
      <Router>
        <ChatContext.Provider value={{firstName, setFirstName, lastName, setLastName}}>
        <Route exact path="/" component={FirstPage}></Route>
        <Route path="/chat" component={ChatRoom}></Route>
        </ChatContext.Provider>
      </Router>
    </div>
  );
}

export default App;
