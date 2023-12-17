import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../CSS/prepareQuestion.css";

const PrepareQuestion = () => {
    const loc = useLocation();
    const subject = loc.state.sub;
    const data = loc.state.data;
    const [paper, setPaper] = useState(0);
    const [semester, setSemester] = useState(0);
    const [updated, setUpdated] = useState(false);
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const nav = useNavigate();

    const submitQuestion = () => {
        if (paper != 0 && semester != 0) {
            let questions = [];
            let answers = [];
            let options = []

            document.querySelectorAll(".question").forEach(q => questions.push(q.value));
            document.querySelectorAll(".answer").forEach(a => answers.push(a.value));
            document.querySelectorAll(".option").forEach(o => options.push(o.value));

            axios.post("http://localhost:8000/prepareQuestion", { questions, answers, options, semester, paper, subject })
                .then(nav("/teacherHomePage",{state:{data:data}}) )
                .catch((err) => console.error(`Error occured while pushing questions to the database =>>> ${err}`))
        } else {
            window.alert("Please Select Semester and Paper")
        }
    }
    const confirmation = () => {
        if (window.confirm("Are you sure to submit the question ? Once submitted can't be modified!!!")) {
            submitQuestion();
        }
    }
    return (
        <>
            <section className="exam__format">
                <div id="header"><header>Exam Creation Portal</header></div>
                <div className="select">
                    <select id="semList" onChange={(e) => setSemester(e.target.value)}>
                        <option label="--select-sem--" />
                        <option value="1" label="1" />
                        <option value="2" label="2" />
                        <option value="3" label="3" />
                        <option value="4" label="4" />
                        <option value="5" label="5" />
                        <option value="6" label="6" />
                        <option value="7" label="7" />
                        <option value="8" label="8" />
                        <option value="9" label="9" />
                        <option value="10" label="10" />
                    </select>
                    <select id="paperList" onChange={(e) => setPaper(e.target.value)}>
                        <option label="--select-paper--" />
                        <option value="1" label="1" />
                        <option value="2" label="2" />
                        <option value="3" label="3" />
                        <option value="4" label="4" />
                        <option value="5" label="5" />
                    </select>
                </div>
                <div className="questions">
                    <div className="marks10">
                        <h3>Answer each question (1 x 10)</h3>
                        <div className="marks10-box">
                            {
                                arr.map((i, index) => (
                                    <div className="question" key={index}>
                                        <div><span>{i}.</span><textarea cols="100" rows="2" placeholder="Enter The Question" className="question"></textarea></div>
                                        <p>Ans.: <input type="text" placeholder="Enter Your Answer" className="answer" /></p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="mcq">
                        <h3>Multiple Choice Question (1 x 10)</h3>
                        <div className="mcq-box">

                            {
                                arr.map((i, index) => (
                                    <div className="question" key={Number(i) + 10}>
                                        <div><span>{Number(i) + 10}.</span><textarea cols="100" rows="2" placeholder="Enter The Question" className="question"></textarea></div>
                                        <p>Ans.: <input type="text" placeholder="Enter Your Answer" className="answer" /></p>
                                        <div className="options">
                                            <div className="option">
                                                <span>A) <input type="text" placeholder="Enter the option" className="option" /></span>
                                                <span>B) <input type="text" placeholder="Enter the option" className="option" /></span>
                                            </div>
                                            <div className="option">
                                                <span>C) <input type="text" placeholder="Enter the option" className="option" /></span>
                                                <span>D) <input type="text" placeholder="Enter the option" className="option" /></span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <button type="button" onClick={() => confirmation()}>SUBMIT</button>
            </section>
        </>
    )
}

export default PrepareQuestion;