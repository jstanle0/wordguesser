import React from "react";
import { useNavigate } from "react-router-dom";
import { Character } from "./char";

export function Play() {
    const navigate = useNavigate();
    const [selectedWord, setSelectedWord] = React.useState([])
    const [guessedCharacters, setGuessedCharacters] = React.useState([])
    const [currentGuess, setCurrentGuess] = React.useState('');
    const [displayError, setDisplayError] = React.useState('');

    const getRandomWord = async ()=>{
        //Fetch a random word from api.
        //TODO add vaiable word lengths
        //TODO review documentation, some of the words look like other languages
        const response = await fetch('https://random-word-api.herokuapp.com/word?lang=en&length=6');
        if (response.ok) {
            const body = await response.json();
            let wordList = [];
            for (const character of body[0]) {
                wordList.push(character);
            }
            setSelectedWord(wordList);
        }
    }
    React.useEffect(()=>{
        getRandomWord()
    }, [])

    function renderWord() {
        //Display guessed characters, with ungessed characters as "_" 
        //TODO more efficent rendering function that requires less iteration
        let renderedWord = [];
        for (const character of selectedWord) {
            if (guessedCharacters.includes(character)) {
                renderedWord.push(character + " ");
            } else {
                renderedWord.push("_ ");
            }
        };
        if (!renderedWord) {
            return "Loading..."
        }
        return renderedWord;
    }

    function guessLetter(e) {
        e.preventDefault();
        if (/^[A-Z]$/.test(currentGuess)) {
            guessedCharacters.push(currentGuess.toLowerCase())
            setCurrentGuess('');
            setDisplayError('');
        } else if (/^[a-z]$/.test(currentGuess)) {
            guessedCharacters.push(currentGuess)
            setCurrentGuess('');
            setDisplayError('');
        } else {
            setDisplayError("Only single letters accepted!")
        }
    }

    return <main>
        <h1>{renderWord()}</h1>
        <h1>{selectedWord}</h1>
        <form onSubmit={(e)=>guessLetter(e)}>
            <input type="text" placeholder="Guess a letter!" value={currentGuess} onChange={(e)=>setCurrentGuess(e.target.value)}></input>
            <button type="submit">Guess!</button>
            {displayError && <p>Error: {displayError}</p>}
        </form>
    </main>
}