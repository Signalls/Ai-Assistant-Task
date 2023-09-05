import React from 'react'
import SideBar from '../Components/SideBar'
import LoadQuestionsComponent from '../Components/LoadOptions.js'
import { useState} from 'react';

const Adminpage = () => {
    let [isLoading, setIsLoading] = useState(false);
    let [isDone, setisDone] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);

    const loadQuestionsfromdb = async (subject) => {
        setSelectedValue(subject);
        setIsLoading(true);
        console.log(subject);
        const userId = localStorage.getItem("Id");
        if (userId) {
          try {
            const response = await fetch(`https://localhost:7137/api/Chat/chat?userId=${userId}&TopicId=${subject}`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
            });
    
            if (response.ok) {
              const responseText = await response.text();
              setIsLoading(false);
              setisDone(true);
              console.log("Success");
    
            } else {
              console.error("Failed to loadQuestion");
            }
          } catch (error) {
            console.error("An error occurred:", error);
          }
        } else {
          console.log("User not found.");
        }
      };
 
    return (
  <div>
<div>Adminpage</div>
<LoadQuestionsComponent onClick={ loadQuestionsfromdb}/>
        {isLoading?<div className="loading-spinner">Loading Questions from database...</div>:" "}
        {isDone?<div className="loading-spinner">Questions Loaded Successfully!</div>:" "} 
  </div>
  )
}

export default Adminpage