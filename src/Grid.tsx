import './styles.css';

function getColors(words: string[], shuffledWords: string[]) {
  const size = words.length;
  let colors: string[][] = [...Array(4)].map(e => Array(4));;
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const letter = words[r][c];
      const shuffledLetter = shuffledWords[r][c];
      if (letter === shuffledLetter) {
        colors[r][c] = 'green';
      } else if (words[r].includes(shuffledLetter)) {
        colors[r][c] = 'yellow';
      } else {
        colors[r][c] = 'white';
      }
    }
  }
  return colors;
}

export default function Grid(props: any) {
  const words = props.words;
  const loaded = props.loaded;
  const shuffledWords = props.shuffledWords;
  const colors = getColors(words, shuffledWords);

  return (
    loaded ?
      <div>
        <div className='row'>
          <p className={'box ' + colors[0][0]}>{shuffledWords[0][0]}</p>
          <p className={'box ' + colors[0][1]}>{shuffledWords[0][1]}</p>
          <p className={'box ' + colors[0][2]}>{shuffledWords[0][2]}</p>
          <p className={'box last-col ' + colors[0][3]}>{shuffledWords[0][3]}</p>
        </div>
        <div className='row'>
          <p className={'box ' + colors[1][0]}>{shuffledWords[1][0]}</p>
          <p className={'box ' + colors[1][1]}>{shuffledWords[1][1]}</p>
          <p className={'box ' + colors[1][2]}>{shuffledWords[1][2]}</p>
          <p className={'box last-col ' + colors[1][3]}>{shuffledWords[1][3]}</p>
        </div>
        <div className='row'>
          <p className={'box ' + colors[2][0]}>{shuffledWords[2][0]}</p>
          <p className={'box ' + colors[2][1]}>{shuffledWords[2][1]}</p>
          <p className={'box ' + colors[2][2]}>{shuffledWords[2][2]}</p>
          <p className={'box last-col ' + colors[2][3]}>{shuffledWords[2][3]}</p>
        </div>
        <div className='row'>
          <p className={'box last-row ' + colors[3][0]}>{shuffledWords[3][0]}</p>
          <p className={'box last-row ' + colors[3][1]}>{shuffledWords[3][1]}</p>
          <p className={'box last-row ' + colors[3][2]}>{shuffledWords[3][2]}</p>
          <p className={'box last-col last-row ' + colors[3][3]}>{shuffledWords[3][3]}</p>
        </div>
      </div>
      :
      <div>
        <p id='loading'>Loading game...</p>
      </div>
  )
}
