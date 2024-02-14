
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Route, Routes } from 'react-router-dom';
import Navbar from './Component/Navbar';
import Home from './Component/Home';
import About from './Component/About';
import NoteState from '../src/Context/notes/NoteState';
import Alert from './Component/Alert';
import Signup from './Component/Signup';
import Login from './Component/Login';
import { useState } from 'react';

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }

  return (

    <>
      <NoteState>
        <Navbar />
        <Alert alert={alert} />
        <Routes>
          <Route path='/' element={<Home showAlert={showAlert} />} />
          <Route path='about' element={<About />} />
          <Route path='login' element={<Login showAlert={showAlert} />} />
          <Route path='signup' element={<Signup showAlert={showAlert}/>} />
        </Routes>
      </NoteState>
    </>
  );
}

export default App;
