import Range from './component/range';
import './styles.css';

const App = () => {
  return (
    <>
      <div className="centrado animate__animated animate__backInLeft">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Logo_of_Mango_%28new%29.svg/2560px-Logo_of_Mango_%28new%29.svg.png"></img>
      </div>

      <Range min={0} max={1000} />
    </>
  );
};

export default App;
