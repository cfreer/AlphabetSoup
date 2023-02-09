import './styles.css';

export default function Grid(props: any) {
  const words = props.words;
  const loaded = props.loaded;
  const shuffledWords = props.shuffledWords;

  return (
    loaded ?
      <div>
        <div className='row'>
          <p className='box'>{shuffledWords[0][0]}</p>
          <p className='box'>{shuffledWords[0][1]}</p>
          <p className='box'>{shuffledWords[0][2]}</p>
          <p className='box last-col'>{shuffledWords[0][3]}</p>
        </div>
        <div className='row'>
          <p className='box'>{shuffledWords[1][0]}</p>
          <p className='box'>{shuffledWords[1][1]}</p>
          <p className='box'>{shuffledWords[1][2]}</p>
          <p className='box last-col'>{shuffledWords[1][3]}</p>
        </div>
        <div className='row'>
          <p className='box'>{shuffledWords[2][0]}</p>
          <p className='box'>{shuffledWords[2][1]}</p>
          <p className='box'>{shuffledWords[2][2]}</p>
          <p className='box last-col'>{shuffledWords[2][3]}</p>
        </div>
        <div className='row'>
          <p className='box last-row'>{shuffledWords[3][0]}</p>
          <p className='box last-row'>{shuffledWords[3][1]}</p>
          <p className='box last-row'>{shuffledWords[3][2]}</p>
          <p className='box last-col last-row'>{shuffledWords[3][3]}</p>
        </div>
      </div>
      :
      <div></div>
  )
}
