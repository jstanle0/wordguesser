import React from "react";
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { Play } from "./play";
import './main.css';

export const wordContext = React.createContext(null)

function Home() {
    const navigate = useNavigate()
    return <main>
    <h1>Welcome to Word Guesser!</h1>
    <button className="btn-lrg" onClick={()=>navigate('/home')}>Play!</button>
    </main>
}

function Win() {
    const navigate = useNavigate()
    const {selectedWord, setSelectedWord} = React.useContext(wordContext)

    return <main>
        <p>You win!</p>
        <p>Word was {selectedWord}. Time to celebrate!</p>
        <div className="buttonContainer">
            <button className="btn-lrg" onClick={()=>navigate('/')}>Play again!</button>
        </div>
    </main>
}

function Lose() {
    const navigate = useNavigate()
    const {selectedWord, setSelectedWord} = React.useContext(wordContext)
    return <main>
        <p>You Lose!</p>
        <p>Word was {selectedWord}. Better luck next time!</p>
        <div className="buttonContainer">
            <button className="btn-lrg" onClick={()=>navigate('/')}>Play again!</button>
        </div>
    </main>
}

function App() {
    const [selectedWord, setSelectedWord] = React.useState('')

    return <BrowserRouter>
        <header></header>
        <wordContext.Provider value={{selectedWord: selectedWord, setSelectedWord: setSelectedWord}}>
            <Routes>
                <Route path="/" element={<Home/>} exact/>
                <Route path="/home" element={<Play/>}/>
                <Route path="/win" element={<Win/>}/>
                <Route path="/lose" element={<Lose/>}/>
            </Routes>
        </wordContext.Provider>
        <footer></footer>
    </BrowserRouter>
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>)