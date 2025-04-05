import React from "react";
import { useNavigate } from "react-router-dom";
import { Character } from "./char";

export function Play() {
    const navigate = useNavigate();
    const [selectedWord, setSelectedWord] = React.useState([]);
    const [guessedCharacters, setGuessedCharacters] = React.useState([]);
    const [currentGuess, setCurrentGuess] = React.useState('');
    const [displayError, setDisplayError] = React.useState('');
    const [incorrectGuesses, setIncorrectGuesses] = React.useState([]);

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

    function renderIncorrectGuesses() {
        //Renders incorrect guessed characters
        let renderedGuesses = ''
        for (const character of incorrectGuesses) {
            renderedGuesses += character + " "
        }
        return renderedGuesses
    }

    function guessLetter(e) {
        //Recives user input, parses if it is valid
        e.preventDefault();
        if (/^[A-Z]$/.test(currentGuess)) {
            parseLetter(currentGuess.toLowerCase())
        } else if (/^[a-z]$/.test(currentGuess)) {
            parseLetter(currentGuess)
        } else {
            setDisplayError("Only single letters accepted!")
        }
    }

    function parseLetter(letter) {
        if (guessedCharacters.includes(letter)) {
            setDisplayError("This letter is already guessed.");
            return
        }
        guessedCharacters.push(letter);
        if (!selectedWord.includes(letter)) {
            incorrectGuesses.push(letter);
            if (incorrectGuesses.length > 7) {
                navigate('/lose')
            } 
        }
        setCurrentGuess('');
        setDisplayError('');
    }

    return <main>
        <h1>{renderWord()}</h1>
        <h1>{selectedWord}</h1>
        <form onSubmit={(e)=>guessLetter(e)}>
            <input type="text" placeholder="Guess a letter!" value={currentGuess} onChange={(e)=>setCurrentGuess(e.target.value)}></input>
            <button type="submit">Guess!</button>
            {displayError && <p>Error: {displayError}</p>}
        </form>
        <p>Incorrect Guesses (Limit 7)</p>
        <h1>{renderIncorrectGuesses()}</h1>
    </main>
}