import React, { useState } from "react";
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AskQuestion = ({ onSubmit, question}) => {
  const [text, setText] = useState(question || ''); // Use the 'question' prop as initial value

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!text) {
      alert('Please add a question');
      return;
    }
    
    onSubmit(text);
    setText("");
  };

  return (
    <form className='askquestion-form' onSubmit={handleSubmit}>
      <div className="askquestionform-control">
        <div className="input-container">
          <input
            type="text"
            placeholder='Ask Question'
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="text-input"
          />
          <button type='submit' className="icon-button">
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>    
        </div>
      </div>
    </form>
  );
}

export default AskQuestion;
