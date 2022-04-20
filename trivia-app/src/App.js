
import './App.css';
import React, {useEffect, useState} from 'react';
//import Button from '@mui/material/Button';

function App() {
  
  // useState to return name of var(questions) + function to modify the state var
  const [questions, setQuestions] = useState([]);

  //useEffect hok to fetch questions
  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple")
    .then((response) =>response.json())
    .then((response) =>{
      setQuestions(response.results);
    });

  }, []);

  function Question({ question }){

    //store choices in  a const
    const choices = (question) => {
      let answers = question.incorrect_answers;
      answers = [...answers, question.correct_answer];
      return answers;
    };
    return(
      // create questions
      
      //     set result as correct or false
      <div>
        {/* display question */}
        <h3>
          {question.question}
        </h3>
          {/* question choices -> map the choices
          one click -> disable clicking again +  */}
          <div> 
            {choices(question).map((choice)=> (
          <button
            onClick= {() =>{
              alert('clicked');
            }}>
          </button>
            ))}
        </div>
      </div>
    );
  }
  
  // function
  return (
    // App title
    <div>
      <div>
        <h1>Trivia App:)</h1>
        {/* map questions */}
      </div> 
      {questions.map((question) =>(
        <Question question={question}></Question>
      ))}
    </div>
  );
}

export default App;
