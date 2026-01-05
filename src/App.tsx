
import './App.css'
import Adm from './pages/Adm';
import Pchat from './pages/Pchat'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {


  return (
    <>
    <Router>

      <Routes>
        <Route path='/' element={<Pchat/>} />
        <Route path='/admin' element={<Adm/>} />
      </Routes>
    </Router>

    
    
    
      
    </>
  )
}

export default App
