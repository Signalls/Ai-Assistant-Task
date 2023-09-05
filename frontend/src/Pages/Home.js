import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import SideBar from '../Components/SideBar';
import RightBar from '../Components/RightBar';
import AskQuestion from '../Components/AskQuestion';
import Answer from '../Components/Answer'; // Import the Answer component
import OptionalQuestion from '../Components/OptionalQuestion';

const Home = ({onSelectTopic,onClick}) => {
  const [text, setText] = useState(false);
  const [appuser, setAppUser] = useState("");
  const [data, setData] = useState(""); // Changed 'data' to 'setData'
  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState("");
  const [showAskQuestion, setShowAskQuestion] = useState(false);
  const [showOption, setOption] = useState(false);
  const [score, setScore] = useState(0);




  useEffect(() => {
    const fetchUserProfile = async () => {
      const authToken = localStorage.getItem("authToken");
      if (authToken) {
        try {
          const response = await fetch(`https://localhost:7137/api/Account/user/profile?token=${authToken}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (response.ok) {
            const data = await response.json();
            const Id = data.result.id;
            localStorage.setItem("Id", Id);
            setAppUser(data.result.userName);
          } else {
            console.error("Failed to retrieve user profile");
          }
        } catch (error) {
          console.error("An error occurred:", error);
        }
      } else {
        console.log("Authentication token not found.");
      }
    };

    fetchUserProfile();
  }, []);

  const handleButtonClick = () => {
    setShowAskQuestion(!showAskQuestion);
    setText(!text);
  };
  const handleShowOption = () => {
    setOption(!showOption);
  };

  const CreateNewchat = async (question) => {
    const userId = localStorage.getItem("Id");
    if (userId) {
      try {
        const response = await fetch(`https://localhost:7137/api/Chat/Newchat?UserId=${userId}&question=${question}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          // Use setData to update the 'data' state
          const responseText = await response.text();
          setData(responseText); // Update 'data' state with the response
          console.log(responseText);
        } else {
          console.error("Failed to retrieve user get answer");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    } else {
      console.log("User not found.");
    }
  };
  const [selectedTopic, setSelectedTopic] = useState(null);
   let [options, setOptions] = useState("");

  // Function to handle the selected topic
  const handleTopicSelect = async (topic) => {
    const userId = localStorage.getItem("Id");
    console.log(topic);
    if (userId) {
      try {
        const response = await fetch(`https://localhost:7137/api/Chat/Question/${topic}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          // Use setData to update the 'data' state
          const responseOption = await response.text();
                                    // Input string containing questions and answers
// Split the input string into individual questions and answers
const qaPairs = responseOption.split(/\d+\.\s+/);

// Remove the empty string at the beginning
qaPairs.shift();

// Initialize an array to store the questions and answers separately
const questionData = [];
const optionData = [];
const answerData = [];


// Loop through each question-answer pair
qaPairs.forEach((qaPair) => {
  // Split the pair into lines
  // Split the pair into lines
const lines = qaPair.split('\n');

// Extract the question (first line)
const question = lines[0].trim();

// Find the index of the line that contains "Answer"
const answerIndex = lines.findIndex(line => line.includes('Answer'));

// Extract the options (lines 1 to before the answer line)
const options = lines.slice(1, answerIndex).map(line => line.trim());

// Extract the correct answer (last line)
const correctAnswer = lines[answerIndex].split(': ')[1].trim();

  

  // Store the question data as an object
  questionData.push({question});
  optionData.push({options});
  answerData.push({correctAnswer});

});

// Store question data in local storage
localStorage.setItem('questionData', JSON.stringify(questionData));
localStorage.setItem('optionData', JSON.stringify(optionData));
localStorage.setItem('answerData', JSON.stringify(answerData));


// To retrieve the data from local storage later, you can use:
// const storedQuestionData = JSON.parse(localStorage.getItem('questionData'));

          setOptions(responseOption); // Update 'data' state with the response
          console.log(responseOption);
          setOption(!showOption);
        } else {
          console.error("Failed to retrieve user get answer");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    } else {
      console.log("User not found.");
    }
  };
  const receiveDataFromChild = async (data) => {
         setShowAskQuestion(true);
    try {
      const result = await CreateNewchat(data);
      console.log(result); // Handle the result of CreateNewchat
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  
  const updateScore = (newScore) => {
    setScore((prevScore) => prevScore + newScore);
    console.log(score);
  };
  const handleQuizComplete = () => {
    // Clear the score when the quiz is completed
    setScore(0);
    console.log("Quiz completed! Score reset.");
    setOption(!showOption);
  };
  
  return (
    <div className='main-content'>
      <Header/>
      <RightBar selectedTopic={selectedTopic}onSelectTopic={handleTopicSelect} updateScore={score} onClick={handleButtonClick} text={!text ? "Ask Question" : "Close Panel" } showAskQuestion={showAskQuestion} />
      <SideBar user={appuser}/>
      <div className='bottom-component'>
       {showOption?<OptionalQuestion options ={options}updateScore={updateScore} onQuizComplete={handleQuizComplete}score={score}sendDataToParent={receiveDataFromChild}showOption={showOption}/>:""}
        {showAskQuestion ? <AskQuestion onSubmit={CreateNewchat} text={question}/> : ""}
        {/* Render the Answer component here */}
        {showAskQuestion?<Answer answer={data} />:" "}
      </div>
    </div>
  );
}

export default Home;
