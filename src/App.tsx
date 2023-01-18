import Grid from './Grid';
import { useEffect, useState } from 'react';

async function statusCheck(res : Response) {
  if (!res.ok) {
    throw new Error(await res.json());
  }
  return res;
}

function App() {
  const [words, setWords] = useState<string[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);
  const apiUrl = 'https://alphabetsoupapi.onrender.com/words';

  useEffect(() => {
    function getWords() {
      fetch(apiUrl)
      .then(statusCheck)
      .then(res => res.json())
      .then(res => setWords(res))
      .then(() => setLoaded(true))
      .catch(console.error);
    }
    getWords();
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
