import { useNavigate } from "react-router-dom";
import "../CSS/homePage.css";

const HomePage = () => {
    const nav = useNavigate();
    return (
        <>
            <section className="homePage">
                <button onClick={() => nav("/adminLogin")}>Login As Admin</button>
                <button onClick={() => nav("/teacherLogin")}>Login As Teacher</button>
                <button onClick={() => nav("/studentLogin")}>Login As Student</button>
            </section>
        </>
    )
}

export default HomePage;