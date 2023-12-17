const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/IQVIA")
    .then(() => console.log("IQVIA database is connected"))
    .catch((err) => console.error(`Error occured while connecting to the database =>>> ${err}`))

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: false,
        required: true
    },
    roll: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String
    },
    semester: {
        type: Number
    }
});

const questionFormatSchema = new mongoose.Schema({
    semester: {
        type: Number
    },
    paper: {
        type: Number
    },
    subject: {
        type: String,
        unique: true
    },
    questions: [
        {
            question: { type: String },
            answer: { type: String }
        }
    ],
    options: [],
    isStarted: { type: Boolean },
    isFinished: { type: Boolean }
})

const teacherSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: false,
        required: true
    },
    roll: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String
    },
    subjectTaught: []
})

const stdCol = new mongoose.model("studentCollection", studentSchema);
const qstCol = new mongoose.model("questionFormatCollection", questionFormatSchema);
const teaCol = new mongoose.model("teacherCollection", teacherSchema);

module.exports = { stdCol, qstCol, teaCol };