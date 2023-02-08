import Grid from './Grid';
import { useEffect, useState } from 'react';

async function statusCheck(res : Response) {
  if (!res.ok) {
    throw new Error(await res.json());
  }
  return res;
}

const LAST_API_CALL_KEY = "lastApiCall";
const WORDS_KEY = "words";

function App() {
  const [words, setWords] = useState<string[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);
  const apiUrl = 'https://alphabetsoupapi.onrender.com/words';

  useEffect(() => {
    function getWords() {
      fetch(apiUrl)
      .then(statusCheck)
      .then(res => res.json())
      .then(res => {
        setWords(res);
        localStorage.setItem(WORDS_KEY, JSON.stringify(res));
      })
      .then(() => setLoaded(true))
      .catch(console.error);
    }
    const lastApiCall = localStorage.getItem(LAST_API_CALL_KEY) as string;
    const lastApiCallDate = Date.parse(lastApiCall);
    const today = new Date().toLocaleDateString();
    const todayDate = Date.parse(today);
    // Only call API once a day.
    if (lastApiCall === null || lastApiCallDate < todayDate) {
      getWords();
      localStorage.setItem(LAST_API_CALL_KEY, today);
    } else {
      const storedWords = JSON.parse(localStorage.getItem(WORDS_KEY) as string);
      setWords(storedWords);
      setLoaded(true);
    }
  }, []);

  return (
    <div>
      <h1>
        Alphabet Soup
      </h1>
      <Grid words={words} loaded={loaded}/>
    </div>
  );
}

export default App;
