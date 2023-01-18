import './styles.css';

export default function Grid(props: any) {
  const words = props.words;
  const loaded = props.loaded;
  console.log(words, loaded);

  return (
    loaded ?
      <div>
        <div className='row'>
          <p className='box'>{words[0][0]}</p>
          <p className='box'>{words[0][1]}</p>
          <p className='box'>{words[0][2]}</p>
          <p className='box last-col'>{words[0][3]}</p>
        </div>
        <div className='row'>
          <p className='box'>{words[1][0]}</p>
          <p className='box'>{words[1][1]}</p>
          <p className='box'>{words[1][2]}</p>
          <p className='box last-col'>{words[1][3]}</p>
        </div>
        <div className='row'>
          <p className='box'>{words[2][0]}</p>
          <p className='box'>{words[2][1]}</p>
          <p className='box'>{words[2][2]}</p>
          <p className='box last-col'>{words[2][3]}</p>
        </div>
        <div className='row'>
          <p className='box last-row'>{words[3][0]}</p>
          <p className='box last-row'>{words[3][1]}</p>
          <p className='box last-row'>{words[3][2]}</p>
          <p className='box last-col last-row'>{words[3][3]}</p>
        </div>
      </div>
      :
      <div></div>
  )
}
