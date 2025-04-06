//TODO Add testing suite for edge cases
import React from "react";
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { Play } from "./play";
import './main.css';

export const wordContext = React.createContext(null);
export const wordLengthContext = React.createContext(null);

function Main() {
    const {wordLength, setWordLength} = React.useContext(wordLengthContext)
    const navigate = useNavigate()
    return <main>
    <h1>Welcome to Word Guesser!</h1>
    <p>Select word length:</p>
    <div class="word-count-container">
        <input type="range" value={wordLength} onChange={(e)=>{setWordLength(e.target.value)}} min='2' max='12'></input> 
        <p>{wordLength}</p>
    </div>
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
    const [selectedWord, setSelectedWord] = React.useState('');
    const [wordLength, setWordLength] = React.useState(6);

    return <BrowserRouter>
        <header></header>
        <wordContext.Provider value={{selectedWord: selectedWord, setSelectedWord: setSelectedWord}}>
            <wordLengthContext.Provider value={{wordLength: wordLength, setWordLength: setWordLength}}>
                <Routes>
                    <Route path="/" element={<Main/>} exact/>
                    <Route path="/home" element={<Play/>}/>
                    <Route path="/win" element={<Win/>}/>
                    <Route path="/lose" element={<Lose/>}/>
                </Routes>
            </wordLengthContext.Provider>
        </wordContext.Provider>
        <footer></footer>
    </BrowserRouter>
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>)