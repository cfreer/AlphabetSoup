import './styles.css';

export default function Grid(props: any) {
  const words = props.data;
  console.log(words);
  return (
    <div>
      <div className='row'>
        <p className='box'>A</p>
        <p className='box'>A</p>
        <p className='box'>A</p>
        <p className='box last-col'>A</p>
      </div>
      <div className='row'>
        <p className='box'>A</p>
        <p className='box'>A</p>
        <p className='box'>A</p>
        <p className='box last-col'>A</p>
      </div>
      <div className='row'>
        <p className='box'>A</p>
        <p className='box'>A</p>
        <p className='box'>A</p>
        <p className='box last-col'>A</p>
      </div>
      <div className='row'>
        <p className='box last-row'>A</p>
        <p className='box last-row'>A</p>
        <p className='box last-row'>A</p>
        <p className='box last-col last-row'>A</p>
      </div>
    </div>
  )
}
