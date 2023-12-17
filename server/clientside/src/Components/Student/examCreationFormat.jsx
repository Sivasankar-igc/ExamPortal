import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../../CSS/examCreationFormat.css";

const ExamCreationFormat = () => {
    const loc = useLocation();
    const sem = loc.state.sem;
    const [questions, setQuestions] = useState(null);
    let i = 0;

    if (sem != undefined) {
        useEffect(() => {
            axios.post("http://localhost:8000/getExamQuestion", { sem })
                .then((res) => res.data != "" ? setQuestions(res.data) : window.alert("You have no exam"))
                .catch((err) => console.error(`Error occured while getting questions =>>> ${err}`))
        },[])
    }
    const checkAnswer=()=>{
        let mark = 0;
        let answerInput = document.querySelectorAll(".answer");
        let mcqInput = document.querySelectorAll('input[type="radio"]:checked');
        mcqInput.forEach((mcq)=>{
            console.log(mcq.value)
        })
        questions.questions.slice(0,10).map((question, index)=>{
            if(question.answer == answerInput[index].value){
                mark++;
            }
        })
        console.log(mark)
    }
    return (
        <>
            {
                questions != null ?
                    <section className="student__exam__format">
                        <div id="header"><header>{questions.subject} Examination</header></div>
                        <div className="basic__info">
                            <div className="left">
                                <div><p>Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: </p><p>{loc.state.name}</p></div>
                                <div><p>Roll&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: </p><p>{loc.state.roll}</p></div>
                                <div><p>Semester : </p><p>{sem}</p></div>
                            </div>
                            <div className="right">
                                <div><p>Paper &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : </p><p>I</p></div>
                                <div><p>Full mark &nbsp;: </p><p>30</p></div>
                                <div><p>Time &nbsp; &nbsp; &nbsp;&nbsp; : </p><p>1.00 hours</p></div>
                            </div>
                        </div>
                        <div className="questions">
                            <div className="marks10">
                                <h3>Answer each question (1 x 10)</h3>
                                <div>
                                    {
                                        questions.questions.slice(0, 10).map((question, index) => (
                                            <div key={index} className="question">
                                                <p>{index + 1}. {question.question}</p>
                                                <p>Ans.: <input type="text" placeholder="Enter Your Answer" className="answer"/></p>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="mcq">
                                <h3>Multiple Choice Question (1 x 10)</h3>
                                <div>
                                    {
                                        questions.questions.slice(10, 20).map((question, index) => (
                                            <div key={index} className="question">
                                                <p>{index + 11}. {question.question}</p>
                                                <div className="options">
                                                    <div className="option">
                                                        <div>A) <input type="radio" name={"opt" + index} id={"opt" + index + 1} value={questions.options[i]} /><label htmlFor={"opt" + index + 1}>{questions.options[i++]}</label></div>
                                                        <div>B) <input type="radio" name={"opt" + index} id={"opt" + index + 2} value={questions.options[i]} /><label htmlFor={"opt" + index + 2}>{questions.options[i++]}</label></div>
                                                    </div>
                                                    <div className="option">
                                                        <div>C) <input type="radio" name={"opt" + index} id={"opt" + index + 3} value={questions.options[i]} /><label htmlFor={"opt" + index + 3}>{questions.options[i++]}</label></div>
                                                        <div>D) <input type="radio" name={"opt" + index} id={"opt" + index + 4} value={questions.options[i]} /><label htmlFor={"opt" + index + 4}>{questions.options[i++]}</label></div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                        <div id="btn"><button onClick={()=>checkAnswer()}>SUBMIT</button></div>
                    </section> : <div>You Have No Exam Today. Keep Learning!!!!</div>
            }
        </>
    )
}

export default ExamCreationFormat;