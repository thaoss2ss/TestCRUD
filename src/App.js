import './App.css';
import {Routes, Route} from 'react-router-dom';

import Home from './pages/Home/Home';
import Create from "./pages/Create/Create";
import Login from "./pages/Login/Login";
import Edit from "./pages/Edit/Edit";
import Signup from "./pages/Signup/Signup";


function App() {
    return (
        <>
            <Routes>
                {/* Login */}
                <Route path='/' element={<Login/>}/>

                {/* Home */}
                <Route path='/home' element={<Home/>}/>

                {/* Create */}
                <Route path='/create' element={<Create/>}/>

                {/*/!* Edit *!/*/}
                <Route path='/edit' element={<Edit/>}/>

                <Route path='/signup' element={<Signup/>}/>
            </Routes>
        </>
    );
}

export default App;