import express from "express";
import cors from "cors";
import { stdCol, qstCol, teaCol } from "./database.js";

const web = express();
web.use(express.json());
web.use(cors());
web.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 8000;

web.post("/prepareQuestion", async (req, res) => {
    try {
        const { questions, answers, options, semester, paper, subject } = req.body;

        let len = 0;

        const questionFormat = new qstCol({
            semester: semester,
            paper: paper,
            subject: subject,
            isStarted: false,
            isFinished: false
        })
        await questionFormat.save();

        for (let i = 0; i < 20; i++) {
            await qstCol.updateOne({ semester: semester, paper: paper }, {
                $push: {
                    questions: {
                        question: String(questions[i]).toUpperCase(),
                        answer: String(answers[i]).toUpperCase()
                    }
                }
            })
        }

        while (len < 40) {
            await qstCol.updateOne({ semester: semester, paper: paper }, {
                $push: {
                    options: [options[len++], options[len++], options[len++], options[len++]]
                }
            })
        }
    } catch (error) {
        console.error(`Couldn't prepare the question =>>> ${error}`);
    }
})

web.post("/checkIfPrepared", async (req, res) => {
    try {
        const { subject } = req.body;
        const data = await qstCol.findOne({ subject: subject })
        data != null ? res.status(200).send(true) : res.status(200).send(false);
    } catch (error) {
        console.error(`Error =>>> ${error}`)
    }
})

web.post("/teacherLogin", async (req, res) => {
    const { roll, password } = req.body;

    const data = await teaCol.findOne({ roll: roll, password: password });
    data != null ? res.status(200).send(data) : res.status(200).send(null);
})

web.post("/studentLogin", async (req, res) => {
    const { roll, password } = req.body;

    const data = await stdCol.findOne({ roll: roll, password: password });
    data != null ? res.status(200).send(data) : res.status(200).send(null);
})

web.post("/getExamQuestion", async (req, res) => {
    try {
        const { sem } = req.body;
        const data = await qstCol.findOne({ semester: sem, isStarted: true });
        data != null ? res.status(200).send(data) : res.status(200).send(null);
    } catch (error) {
        console.error(`Error occured at Server end while retrieving questions for student =>>> ${error}`)
    }
})

web.post("/showExamSubjects", async (req, res) => {
    try {
        const { semester } = req.body;
        const data = await qstCol.find({ semester: semester });
        data != null ? res.status(200).send(data) : res.status(200).send(null);
    } catch (error) {
        console.error(`error occured while retrieving the exams for the admin =>>> ${error}`)
    }
})
web.post("/scheduleExam", async (req, res) => {
    try {
        const { subject, hour, minute } = req.body;
        const data = await qstCol.updateOne({ subject: subject }, { $set: { isStarted: true } });

        data.modifiedCount == 1 ? res.status(200).send(true) : res.status(200).send(false);
    } catch (error) {
        console.error(`error occured while scheduling exam at server side =>>> ${error}`)
    }
})
web.post("/cancelExam", async (req, res) => {
    try {
        const { subject } = req.body;
        const data = await qstCol.updateOne({ subject: subject }, { $set: { isStarted: false } });

        data.modifiedCount == 1 ? res.status(200).send(true) : res.status(200).send(false);
    } catch (error) {
        console.error(`error occured while scheduling exam at server side =>>> ${error}`)
    }
})
async function add() {
    const data1 = new stdCol({
        name: "random1",
        roll: "21IMCA027",
        password: "21ICMA027",
        semester: 5,
    })
    const data2 = new stdCol({
        name: "random2",
        roll: "21IMCA028",
        password: "21ICMA028",
        semester: 3,
    })
    const data3 = new stdCol({
        name: "random3",
        roll: "20IMCA027",
        password: "20ICMA027",
        semester: 5,
    })
    const data4 = new stdCol({
        name: "random4",
        roll: "19IMCA027",
        password: "19ICMA027",
        semester: 5,
    })
    const data5 = new stdCol({
        name: "siva",
        roll: "21IMCA046",
        password: "21ICMA046",
        semester: 5,
    })
    const data6 = new stdCol({
        name: "random6",
        roll: "21IMCA020",
        password: "21ICMA020",
        semester: 5,
    })
    const data7 = new stdCol({
        name: "random7",
        roll: "21IMCA007",
        password: "21ICMA007",
        semester: 5,
    })
    const data8 = new stdCol({
        name: "random8",
        roll: "21IMCA012",
        password: "21ICMA012",
        semester: 5,
    })
    await stdCol.insertMany([data1, data2, data3, data4, data5, data6, data7, data8])
}
web.listen(PORT, () => console.log(`server running at port number ${PORT}`));