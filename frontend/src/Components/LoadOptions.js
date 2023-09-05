// LoadQuestionsComponent.jsx
const LoadQuestionsComponent = (props) => {
    const handleClick = (value) => {
      props.onClick(value);
      console.log(value);
    };
  
    return (
      <div className="load-questions">
        <h4>Load Questions</h4>
        <div className="button-container">
          <button value={1} onClick={() => handleClick(1)} className="load-button">
            Maths
          </button>
          <button value={2} onClick={() => handleClick(2)}className="load-button">
            Art
          </button>
          <button value={3} onClick={() => handleClick(3)} className="load-button">
            Science
          </button>
          <button value={4} onClick={() => handleClick(4)} className="load-button">
            English
          </button>
          <button value={5} onClick={() => handleClick(5)} className="load-button">
            History
          </button>
          <button value={6} onClick={() => handleClick(6)} className="load-button">
            Tech
          </button>
        </div>
      </div>
    );
  };
  
  export default LoadQuestionsComponent;
  