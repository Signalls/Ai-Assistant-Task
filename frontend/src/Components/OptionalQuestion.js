import React, { useState ,useEffect } from 'react';

const OptionalQuestion = ({sendDataToParent,updateScore,score, onQuizComplete}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1);
  const [selectedOption, setSelectedOption] = useState(null);
  //const [score, setScore] = useState(0); // State for selected option

  // Retrieve quiz data from local storage
  const quizData = JSON.parse(localStorage.getItem('questionData'));
  const optionData = JSON.parse(localStorage.getItem('optionData'));
  const optionAnswer = JSON.parse(localStorage.getItem('answerData'));


  const handleAnswer = () => {
    if (selectedOption !== null) {
      const currentQuestion = quizData[currentQuestionIndex];
      const correctAnswer = optionAnswer[currentQuestionIndex]
      const jsonString = JSON.stringify(correctAnswer); // Replace with your JSON string
      const jsonObject = JSON.parse(jsonString);

      const correctAnswerValue = jsonObject.correctAnswer;
      const dataToSend =`${currentQuestion.question}`;
      let newScore = 0;
      if(correctAnswerValue === selectedOption.label){
        newScore += 10;
         //sendDataToParent(dataToSend);
         updateScore(newScore);
      }
      else{
        sendDataToParent(dataToSend);
      }
      console.log(correctAnswerValue);
      console.log(selectedOption.label);

     


      // Handle the logic for displaying the next question
      if (currentQuestionIndex < quizData.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        // Handle the case when all questions are answered
        alert('Quiz completed!');
        onQuizComplete();
      }
    } else {
      alert('Please select an option before answering.');
    }
  };

  const handleOptionChange = (event) => {
    const selectedOptionValue = event.target.value;
    const selectedOptionLabel = event.target.nextSibling.textContent; // Get the label text

    setSelectedOption({ value: selectedOptionValue, label: selectedOptionLabel });
  };

  if (currentQuestionIndex < quizData.length) {
    const currentQuestion = quizData[currentQuestionIndex];
    const currentOptions = optionData[currentQuestionIndex];

    return (
      <div className="question-container">
        <p className="question-text">
          {currentQuestion.question}
        </p>
        <div className="options">
          {currentOptions.options
            .filter((option) => option.trim() !== '') // Filter out empty options
            .map((option, index) => (
              <div key={index}>
                <label>
                  <input
                    type="radio"
                    name="piValue"
                    value={String.fromCharCode(65 + index)}
                    onChange={handleOptionChange}
                    checked={selectedOption && selectedOption.value === String.fromCharCode(65 + index)}
                  />
                  {option}
                </label>
                <br />
              </div>
            ))}
        </div>
        <button className="btn" onClick={handleAnswer}>
          Answer
        </button>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Quiz Completed</h1>
        {/* You can display a completion message or a summary here */}
      </div>
    );
  }
};

export default OptionalQuestion;
