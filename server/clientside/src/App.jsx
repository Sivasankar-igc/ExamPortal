import PrepareQuestion from "./Components/Teacher/prepareQuestion";
import ExamCreationFormat from "./Components/Student/examCreationFormat";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import HomePage from "./Components/homePage";
import TeacherLP from "./Components/Teacher/teacherLoginPage";
import TeacherHP from "./Components/Teacher/teacherHomePage";
import StudentLP from "./Components/Student/studentLoginPage";
import StudentHP from "./Components/Student/studentHomePage";
import AdminLP from "./Components/Admin/adminLogin";
import AdminHP from "./Components/Admin/adminHomePage";
import ShowSubjects from "./Components/Admin/showSubjects";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="teacherLogin" element={<TeacherLP />} />
        <Route path="teacherHomePage" element={<TeacherHP />} />
        <Route path="examPreparation" element={<PrepareQuestion />} />
        <Route path="studentLogin" element={<StudentLP />} />
        <Route path="studentHomePage" element={<StudentHP />} />
        <Route path="exam" element={<ExamCreationFormat />} />
        <Route path="adminLogin" element={<AdminLP />} />
        <Route path="adminHomePage" element={<AdminHP/>}/>
        <Route path="showSubjects" element={<ShowSubjects/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;