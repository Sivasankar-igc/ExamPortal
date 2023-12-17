import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "../../CSS/showSubjects.css";

const ShowSubjects = () => {
    const [exams, setExams] = useState(null);
    const loc = useLocation();
    const semester = loc.state.semester;

    useEffect(() => {
        if (semester != undefined) {
            axios.post("http://localhost:8000/showExamSubjects", { semester: semester })
                .then((res) => res.data != "" ? setExams(res.data) : "")
                .catch((err) => console.error(`error occured while getting the exams at clientside =>>> ${err}`));
        }
    }, [])

    const scheduleExam = (subject) => {
        // if (!examScheduled) {
        axios.post("http://localhost:8000/scheduleExam", { subject })
            .then((res) => res.data ? location.reload() : window.alert("something went wrong"))
            .catch((err) => console.error(`error while scheduling the exam at clientside =>>> ${err}`))
        // } else {
        // window.alert("More than one exam can't be scheduled for one semester");
        // }
    }
    const cancelExam = (subject) => {
        axios.post("http://localhost:8000/cancelExam", { subject })
            .then((res) => res.data ? location.reload() : window.alert("something went wrong"))
            .catch((err) => console.error(`error while cancelling the exam at clientside =>>> ${err}`))
    }
    return (
        <>
            {
                exams ?
                    <section className="showExams">
                        <div>
                            <table>
                                <thead>
                                    <tr>
                                        <th style={{ borderRight: "2px solid black" }}>SL NO.</th>
                                        <th style={{ borderRight: "2px solid black" }}>SUBJECT</th>
                                        <th>ACTION</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        exams.map((exam, index) => (
                                            <tr key={exam.subject}>
                                                <td>{Number(index) + 1}</td>
                                                <td>{exam.subject}</td>
                                                <td>{exam.isStarted ? <button onClick={() => cancelExam(exam.subject)}>Cancel</button> : <button key={exam.subject} onClick={() => scheduleExam(exam.subject)}>Start</button>}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </section>
                    : <div>NO EXAM TO SCHEDULE</div>
            }
        </>
    )
}

export default ShowSubjects;