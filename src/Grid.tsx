import './styles.css';
let words: string[] = [];
let shuffledWords: string[][] = [];
let colors: string[][] = [...Array(4)].map(e => Array(4));
const SHUFFLED_WORDS_KEY = "shuffledWords";

function id(idName: string) {
  return document.getElementById(idName);
}

function toggleNeighbor(idNum: number) {
  id(idNum.toString())?.classList.toggle("neighbor");
}

function getLocation(id: number) {
  const r = Math.floor((id - 1) / 4);
  const c = Math.floor((id - 1) % 4);
  return [r, c];
}

function getId(r: number, c: number) {
  return (4 * r) + c + 1;
}

function swap(element: HTMLParagraphElement, neighbor: HTMLParagraphElement) {
  const temp = element.textContent;
  element.textContent = neighbor.textContent;
  neighbor.textContent = temp;
  const [r1, c1] = getLocation(parseInt(element.id));
  const [r2, c2] = getLocation(parseInt(neighbor.id));
  const save = shuffledWords[r1][c1];
  shuffledWords[r1][c1] = shuffledWords[r2][c2];
  shuffledWords[r2][c2] = save;
  setColors();
  clearClicked();
}

function clearClicked() {
  document.querySelector(".clicked")?.classList.remove("clicked");
  const neighbors = document.querySelectorAll(".neighbor");
  neighbors.forEach((neighbor) => {
    neighbor.classList.remove("neighbor");
  })
}

function clearColors() {
  for (let i = 1; i <= 16; i++) {
    id(i.toString())?.classList.remove("green", "yellow", "white");
  }
}

function setColor(r: number, c: number) {
  const letter = words[r][c];
  const shuffledLetter = shuffledWords[r][c];
  if (letter === shuffledLetter) {
    colors[r][c] = 'green';
  } else if (words[r].includes(shuffledLetter)) {
    colors[r][c] = 'yellow';
  } else {
    colors[r][c] = 'white';
  }
  const shuffledLetCount = shuffledWords[r].filter(x => x === shuffledLetter).length;
  const realLetCount = words[r].split(shuffledLetter).length - 1;
  // Have the right number of yellow boxes.
  if (shuffledLetCount > realLetCount) {
    let count = 0;
    for (let i = 0; i < 4; i++) {
      const color = colors[r][i];
      const character = shuffledWords[r][i];
      if (character === shuffledLetter && color !== 'white') {
        count++;
      }
    }
    let i = 0;
    while (count > realLetCount) {
      const color = colors[r][i];
      if (!color) {
        break;
      }
      if (color === 'yellow' && shuffledWords[r][i] === shuffledLetter) {
        colors[r][i] = 'white';
        let classes = id(getId(r, i).toString())?.classList;
        classes?.remove('yellow');
        classes?.add(colors[r][i]);
        count--;
      }
      i++;
    }
  }
  id(getId(r, c).toString())?.classList.add(colors[r][c]);
}

function setColors() {
    clearColors();
    const size = shuffledWords.length;
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        setColor(r, c);
      }
    }
    const isFilled = shuffledWords.some( function (a) { return a.length });
    if (isFilled) {
      localStorage.setItem(SHUFFLED_WORDS_KEY, JSON.stringify(shuffledWords));
    }
}

function handleClick(event: React.MouseEvent<HTMLParagraphElement>) {
  const element = event.currentTarget;
  const isClicked = element.classList.contains("clicked");
  const isNeighbor = element.classList.contains("neighbor");
  if (isClicked) {
    clearClicked();
  } else if (isNeighbor) {
    const prevElement = document.querySelector(".clicked") as HTMLParagraphElement;
    swap(prevElement, element);
  } else {
    clearClicked();
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
}

export default function Grid(props: any) {
  words = props.words;
  const loaded = props.loaded;
  shuffledWords = props.shuffledWords;
  for (let r = 0; r < shuffledWords.length; r++) {
    shuffledWords[r] = [...shuffledWords[r]];
  }
  setColors();

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
