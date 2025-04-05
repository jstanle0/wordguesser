import React from "react";
import { useNavigate } from "react-router-dom";
import { Character } from "./char";

export function Play() {
    const navigate = useNavigate();
    const [selectedWord, setSelectedWord] = React.useState([])
    const [guessedCharacters, setGuessedCharacters] = React.useState([])

    const getRandomWord = async ()=>{
        const response = await fetch('https://random-word-api.herokuapp.com/word?lang=en&length=6')
        if (response.ok) {
            const body = await response.json()
            let wordList = []
            for (const character of body[0]) {
                wordList.push(character)
            }
            setSelectedWord(wordList)
        }
    }
    React.useEffect(()=>{
        getRandomWord()
    }, [])

    function renderWord() {
        let renderedWord = []
        for (const character of selectedWord) {
            if (guessedCharacters.includes(character)) {
                renderedWord.push(character + " ")
            } else {
                renderedWord.push("_ ")
            }
        }
        return renderedWord
    }

    return <main>
        <h1>{renderWord()}</h1>
        <h1>{selectedWord}</h1>
        <button onClick={()=>navigate('/win')}>Win</button>
        <button onClick={()=>navigate('/lose')}>Lose</button>
    </main>
}