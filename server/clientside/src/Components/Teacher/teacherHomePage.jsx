import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "../../CSS/teacherHomePage.css";

const TeacherHP = () => {
    const data = useLocation().state.data;
    const nav = useNavigate();

    const checkIfPrepared = (subject) => {
        axios.post("http://localhost:8000/checkIfPrepared", { subject })
            .then((res) => res.data == true ? window.alert("Question already prepared") : nav("/examPreparation", { state: { sub: subject, data: data } }))
            .catch((err) => console.error(`error while preparing the question =>>> ${err}`))
    }

    return (
        <>
            <section className="teacher__hp__wrappper">
                <div id="teacher__hp__box">
                    <div className="teacher__info__box">
                        <div className="tinfo"><span>Name &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;</span> <div>{data.name}</div></div>
                        <div className="tinfo"><span>Roll &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;</span> <div>{data.roll}</div></div>
                        <div className="tinfo"><span>Subjects Teach:&nbsp;&nbsp;</span>{
                            data.subjectTaught.map((sub, index) => (
                                <div className="sub" key={index}>{sub}</div>
                            ))
                        }</div>
                    </div>
                    <div className="prepare__question">
                        Prepare Questions For:
                        <div>
                            {
                                data.subjectTaught.map((sub, index) => (
                                    <button key={index} onClick={() => checkIfPrepared(sub)}>{sub}</button>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default TeacherHP;