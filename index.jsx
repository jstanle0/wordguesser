import React from "react";
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { Play } from "./play";

function Home() {
    const navigate = useNavigate()
    return <main>
    <h1>Welcome to Word Guesser!</h1>
    <button onClick={()=>navigate('/play')}>Play!</button>
    </main>
}

function Win() {
    const navigate = useNavigate()
    return <main>
        <p>You win!</p>
        <div className="buttonContainer">
            <button onClick={()=>navigate('/')}>Go home!</button>
        </div>
    </main>
}

function Lose() {
    const navigate = useNavigate()
    return <main>
        <p>You Lose!</p>
        <div className="buttonContainer">
            <button onClick={()=>navigate('/')}>Go home!</button>
        </div>
    </main>
}

function App() {
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>} exact/>
            <Route path="/play" element={<Play/>}/>
            <Route path="/win" element={<Win/>}/>
            <Route path="/lose" element={<Lose/>}/>
        </Routes>
    </BrowserRouter>
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>)