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
  const apiUrl = 'https://alphabetsoupapi.onrender.com/words';

  useEffect(() => {
    function getWords() {
      fetch(apiUrl)
      .then(statusCheck)
      .then(res => res.json())
      .then(res => setWords(res.data))
      .then(console.log)
      .catch(console.error);
    }
    getWords();
  }, []);

  return (
    <div>
      <h1>
        Alphabet Soup
      </h1>
      <Grid data={words}/>
    </div>
  );
}

export default App;
