
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
  const getRandomInt = x => {
    return Math.floor(Math.random() * x);
  }

  function Question({ question }){

    //answer ->set if correct or incorrect after answer choice is clicked
    const [answer, setAnswer] = useState("");

    //store choices in  a const
    const choices = (question) => {
      let answerChoices = [...question.incorrect_answers];
      answerChoices.splice(getRandomInt(question.incorrect_answers.length),0, question.correct_answer);
      return answerChoices;
    };
    return(
      // create questions
      
      //     set result as correct or false
      <div>
        {/* display question */}
        <div>
          <h3> {question.question} </h3>
          <h4> {answer} </h4>
        </div>
          {/* question choices -> map the choices
          one click -> disable clicking again +  */}
          <div> 
            {choices(question).map((choice)=> (
            <button
              onClick= {() =>{
                //if correct, alert correct
                if(choice === question.correct_answer) setAnswer('CORRECT:)');
                else setAnswer('NOPE :o');
              }}>
                {choice}
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
        <h1>Trivia App </h1>
        {/* map questions */}
      </div> 
      {questions.map((question) =>(
        <Question question={question}></Question>
      ))}
    </div>
  );
}

export default App;
