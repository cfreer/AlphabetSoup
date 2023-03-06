import './styles.css';

function id(idName: string) {
  return document.getElementById(idName);
}

function toggleNeighbor(idNum: number) {
  id(idNum.toString())?.classList.toggle("neighbor");
}

function clearClicked() {
  document.querySelector(".clicked")?.classList.remove("clicked");
  const neighbors = document.querySelectorAll(".neighbor");
  neighbors.forEach((neighbor) => {
    neighbor.classList.remove("neighbor");
  })
}

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

function handleClick(event: React.MouseEvent<HTMLParagraphElement>) {
  clearClicked();
  const element = event.currentTarget;
  const elId = parseInt(element.id);
  element.classList.toggle("clicked");
  const above = elId - 4;
  const below = elId + 4;
  const left = elId - 1;
  const right = elId + 1;
  if (above >= 1) {
    toggleNeighbor(above);
  }
  if (below <= 26) {
    toggleNeighbor(below);
  }
  if (left % 4 !== 0) {
    toggleNeighbor(left);
  }
  if (elId % 4 !== 0) {
    toggleNeighbor(right);
  }
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
          <p className={'box ' + colors[0][0]} onClick={handleClick} id="1">{shuffledWords[0][0]}</p>
          <p className={'box ' + colors[0][1]} onClick={handleClick} id="2">{shuffledWords[0][1]}</p>
          <p className={'box ' + colors[0][2]} onClick={handleClick} id="3">{shuffledWords[0][2]}</p>
          <p className={'box last-col ' + colors[0][3]} onClick={handleClick} id="4">{shuffledWords[0][3]}</p>
        </div>
        <div className='row'>
          <p className={'box ' + colors[1][0]} onClick={handleClick} id="5">{shuffledWords[1][0]}</p>
          <p className={'box ' + colors[1][1]} onClick={handleClick} id="6">{shuffledWords[1][1]}</p>
          <p className={'box ' + colors[1][2]} onClick={handleClick} id="7">{shuffledWords[1][2]}</p>
          <p className={'box last-col ' + colors[1][3]} onClick={handleClick} id="8">{shuffledWords[1][3]}</p>
        </div>
        <div className='row'>
          <p className={'box ' + colors[2][0]} onClick={handleClick} id="9">{shuffledWords[2][0]}</p>
          <p className={'box ' + colors[2][1]} onClick={handleClick} id="10">{shuffledWords[2][1]}</p>
          <p className={'box ' + colors[2][2]} onClick={handleClick} id="11">{shuffledWords[2][2]}</p>
          <p className={'box last-col ' + colors[2][3]} onClick={handleClick} id="12">{shuffledWords[2][3]}</p>
        </div>
        <div className='row'>
          <p className={'box last-row ' + colors[3][0]} onClick={handleClick} id="13">{shuffledWords[3][0]}</p>
          <p className={'box last-row ' + colors[3][1]} onClick={handleClick} id="14">{shuffledWords[3][1]}</p>
          <p className={'box last-row ' + colors[3][2]} onClick={handleClick} id="15">{shuffledWords[3][2]}</p>
          <p className={'box last-col last-row ' + colors[3][3]} onClick={handleClick} id="16">{shuffledWords[3][3]}</p>
        </div>
      </div>
      :
      <div>
        <p id='loading'>Loading game...</p>
      </div>
  )
}
