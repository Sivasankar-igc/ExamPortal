import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const StudentLP = () => {
    const [roll, setRoll] = useState("");
    const [password, setPassword] = useState("");
    const nav = useNavigate();

    const login = () => {
        axios.post("http://localhost:8000/studentLogin", { roll, password })
            .then((res) => {
                if (res.data != "") {
                    let t_info = res.data;
                    nav("/studentHomePage", { state: { data: t_info } })
                } else {
                    window.alert("Login Failed. Please enter roll and password correctly")
                }
            })
            .catch((err) => console.error(`Student Login Error =>>> ${err}`))
    }
    useEffect(() => {
        const inputs = document.querySelectorAll(".input-container input");
        const background = document.querySelector(".login-wrapper");
        const events = ["mouseenter", "click"]

        inputs.forEach((input) => {

            const spansOfLabelArray = new Array(input.nextSibling.children);  //will target the children of the next recent sibling of the current input as an array

            //will traverse all the elements present in the spansoflabelarray 
            spansOfLabelArray.forEach(spansofLabel => {   //spanoflabel is the array of all the spans present in the spansoflabelarray

                let len = spansofLabel.length;

                for (let i = 0; i < len; i++) {
                    spansofLabel[i].style.left = `${i * 10}px`
                }
            })
            events.forEach(evt => {

                input.addEventListener(evt, () => {

                    spansOfLabelArray.forEach(spansofLabel => {
                        let i = 0, len = spansofLabel.length;
                        let time = setInterval(() => {
                            i < len ? spansofLabel[i++].classList.add("wavySpan") : clearInterval(time)
                        }, 100)
                    })
                })

            })
            input.addEventListener("mouseleave", () => {

                spansOfLabelArray.forEach(spansofLabel => {
                    let i = 0, len = spansofLabel.length;
                    let time = setInterval(() => {
                        i < len ? spansofLabel[i++].classList.remove("wavySpan") : clearInterval(time)
                    }, 100)
                })
            })
        })

        let count = 1;
        let countTemp = count - 1;
        setInterval(() => {
            background.classList.remove(`image${countTemp}`)
            background.classList.add(`image${count}`)
            if (count < 11) {
                count++;
                countTemp = count - 1;
            } else {
                countTemp = count;
                count = 1;
            }
        }, 2000)
    })

    const showPassword = () => {
        let pass_field = document.getElementById("password");

        if (pass_field.type === "password") {
            pass_field.type = "text"
        } else {
            pass_field.type = "password"
        }
    }

    return (
        <>
            <section className="login-wrapper">
                <div className="input-container">
                    <input type="text" name="email-field" id="email-field" onChange={(e)=>setRoll(e.target.value)} required />
                    <label htmlFor="email-field">
                        <span>R</span>
                        <span>o</span>
                        <span>l</span>
                        <span>l</span>
                        <span>N</span>
                        <span>o</span>
                    </label>
                    <span id="show-pass" onClick={showPassword}></span>
                    <input type="password" name="password" id="password" onChange={(e)=>setPassword(e.target.value)}required />
                    <label htmlFor="password">
                        <span>P</span>
                        <span>a</span>
                        <span>s</span>
                        <span>s</span>
                        <span>w</span>
                        <span>o</span>
                        <span>r</span>
                        <span>d</span>
                    </label>
                    <button onClick={() => login()}>LOG IN</button>
                </div>
            </section>
        </>
    )
}

export default StudentLP;