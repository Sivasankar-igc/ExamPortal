import { useLocation, useNavigate } from "react-router-dom";

const StudentHP = () => {
    const data = useLocation().state.data;
    const sem = data.semester;
    const name = data.name;
    const roll = data.roll;
    const nav = useNavigate();

    return (
        <>
            
            <section className="teacher__hp__wrappper">
                <div id="teacher__hp__box">
                    <div className="teacher__info__box">
                        <div className="tinfo"><span>Name &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;</span> <div>{data.name}</div></div>
                        <div className="tinfo"><span>Roll &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;</span> <div>{data.roll}</div></div>
                        <div className="tinfo"><span>Semester &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;:</span><div>&nbsp;&nbsp;{sem}</div></div>
                    </div>
                    <button onClick={()=>nav("/exam",{state:{sem:sem, name:name, roll:roll}})}>GIVE EXAM</button>
                </div>
            </section>
        </>
    )
}

export default StudentHP;