import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import SideBar from '../Components/SideBar';
import RightBar from '../Components/RightBar';
import AskQuestion from '../Components/AskQuestion';
import Answer from '../Components/Answer'; // Import the Answer component
import OptionalQuestion from '../Components/OptionalQuestion';

const Home = ({onSelectTopic, onClick}) => {
  const [text, setText] = useState(false);
  const [appuser, setAppUser] = useState("");
  const [data, setData] = useState(""); // Changed 'data' to 'setData'
  const [showAskQuestion, setShowAskQuestion] = useState(false);
  const [showOption, setOption] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedValue, setSelectedValue] = useState(null);
  let [options, setOptions] = useState("");
  let [isLoading, setIsLoading] = useState(false);
  let [isDone, setisDone] = useState(false);
  let [isShowpanel, setShowpanel] = useState(false);
  let [showCongrat, setshowCongrat] = useState(false);

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
          setIsLoading(false);
          setShowpanel(true);
          setData(response);
          console.log(response);
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

  const handleTopicSelect = async (topic) => {
    const userId = localStorage.getItem("Id");
    setShowAskQuestion(false);
    setShowpanel(false);
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
          const responseOption = await response.text();
          const qaPairs = responseOption.split(/\d+\.\s+/);
          qaPairs.shift();
          const questionData = [];
          const optionData = [];
          const answerData = [];

          qaPairs.forEach((qaPair) => {
            const lines = qaPair.split('\n');
            const question = lines[0].trim();
            const answerIndex = lines.findIndex(line => line.includes('Answer'));
            const options = lines.slice(1, answerIndex).map(line => line.trim());
            const correctAnswer = lines[answerIndex].split(': ')[1].trim();

            questionData.push({question});
            optionData.push({options});
            answerData.push({correctAnswer});
          });

          localStorage.setItem('questionData', JSON.stringify(questionData));
          localStorage.setItem('optionData', JSON.stringify(optionData));
          localStorage.setItem('answerData', JSON.stringify(answerData));

          setOptions(responseOption);
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
    setShowpanel(true);
    try {
      const result = await CreateNewchat(data);
      console.log(result);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const updateScore = (newScore) => {
    setScore((prevScore) => prevScore + newScore);
    console.log(score);
  };

  const handleQuizComplete = () => {
    setScore(0);
    console.log("Quiz completed! Score reset.");
    setshowCongrat(true);
    setOption(!showOption);
  };

  return (
    <div className='main-content'>
      <Header/>
      <RightBar selectedTopic={selectedTopic}onSelectTopic={handleTopicSelect} onClick={handleButtonClick} text={!text ? "Ask Question" : "Close Panel" } showAskQuestion={showAskQuestion} />
      <SideBar user={appuser} updateScore={score} />
      <div className='bottom-component'>
       {showOption?<OptionalQuestion options ={options}updateScore={updateScore} onQuizComplete={handleQuizComplete}score={score}sendDataToParent={receiveDataFromChild}showOption={showOption}/>:""}
        {showAskQuestion ? <AskQuestion onSubmit={CreateNewchat} /> : ""}
        {showAskQuestion?<Answer answer={data} />:" "}
      </div>
    </div>
  );
}

export default Home;
