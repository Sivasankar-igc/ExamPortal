import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../CSS/adminHomePage.css";

const AdminHP = () => {
    const [isScheduleClick, setIsScheduleClick] = useState(false);
    const [showStudent, setShowStudent] = useState(false);
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const nav = useNavigate();

    return (
        <>
            <section className="admin__hp__wrapper">
                <div className="action__button">
                    {isScheduleClick ? <button onClick={() => isScheduleClick ? setIsScheduleClick(false) : setIsScheduleClick(true)}>Cancel Scheduling</button> : <button onClick={() => isScheduleClick ? setIsScheduleClick(false) : setIsScheduleClick(true)}>Schedule Exam</button>}
                    {showStudent ? <button onClick={() => showStudent ? setShowStudent(false) : setShowStudent(true)}>Cancel</button> : <button onClick={() => showStudent ? setShowStudent(false) : setShowStudent(true)}>Show Student</button>}
                </div>
                {
                    isScheduleClick ?
                        <div className="showSemester">
                            {
                                arr.map((e, index) => (
                                    <button onClick={() => nav("/showSubjects", { state: { semester: e } })} key={index}>Semester {e}</button>
                                ))
                            }
                        </div>
                        : ""
                }
                {
                    showStudent ?
                        <div className="showSemester">
                            {
                                arr.map((e, index) => (
                                    <button onClick={() => nav("/showSubjects", { state: { semester: e } })} key={index}>Semester {e}</button>
                                ))
                            }
                        </div>
                        : ""
                }
            </section>
        </>
    )
}

export default AdminHP;