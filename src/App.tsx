import Grid from './Grid';
import { useEffect, useState } from 'react';

async function statusCheck(res: Response) {
  if (!res.ok) {
    throw new Error(await res.json());
  }
  return res;
}

function shuffleWords(words: string[]) {
  let shuffledWords = [] as string[];
  const wordsStr = words.join('');
  const shuffledWordsStr = wordsStr.split('').sort(() => Math.random() - .5).join('');
  for (let i = 0; i < 16; i += 4) {
    shuffledWords.push(shuffledWordsStr.substring(i, i + 4));
  }
  return shuffledWords;
}

const LAST_API_CALL_KEY = "lastApiCall";
const WORDS_KEY = "words";
const SHUFFLED_WORDS_KEY = "shuffledWords";

function App() {
  const [words, setWords] = useState<string[]>([]);
  const [shuffledWords, setShuffledWords] = useState<string[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);
  const apiUrl = 'https://alphabetsoupapi.onrender.com/words';

  useEffect(() => {
    const today = new Date().toLocaleDateString();

    function getWords() {
      fetch(apiUrl)
        .then(statusCheck)
        .then(res => res.json())
        .then(res => storeWords(res))
        .catch(console.error);
    }

    function storeWords(words: string[]) {
      if (words !== null) {
        setWords(words);
        localStorage.setItem(WORDS_KEY, JSON.stringify(words));
        const storedShuffledWords = JSON.parse(localStorage.getItem(SHUFFLED_WORDS_KEY) as string);
        if (storedShuffledWords === null) {
          const shuffledWords = shuffleWords(words);
          setShuffledWords(shuffledWords);
          localStorage.setItem(SHUFFLED_WORDS_KEY, JSON.stringify(shuffledWords));
        } else {
          setShuffledWords(storedShuffledWords);
        }
        setLoaded(true);
        localStorage.setItem(LAST_API_CALL_KEY, today);
      }
    }

    const lastApiCall = localStorage.getItem(LAST_API_CALL_KEY) as string;
    const lastApiCallDate = Date.parse(lastApiCall);
    const todayDate = Date.parse(today);
    // Only call API once a day.
    if (lastApiCall === null || lastApiCallDate < todayDate) {
      localStorage.clear();
      getWords();
    } else {
      const storedWords = JSON.parse(localStorage.getItem(WORDS_KEY) as string);
      storeWords(storedWords);
    }
  }, []);

  return (
    <div>
      <h1>
        Alphabet Soup
      </h1>
      <Grid words={words} loaded={loaded} shuffledWords={shuffledWords} />
    </div>
  );
}

export default App;
