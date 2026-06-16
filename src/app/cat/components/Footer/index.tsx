'use client'

import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useState } from "react";

export default function Footer() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [info, setInfo] = useState("");
  const [captcha, setCaptcha] = useState("");

  return (
    <footer className="w-full bg-slate-50 text-black px-2 py-4 grid grid-cols-3 gap-4">
      <div></div>
      <div>
        <h3>
          Contact form
        </h3>
        <form name="contact" method="post" data-netlify="true" className=" flex flex-col gap-4 mt-4">
          <TextField
            id="t-name"
            label="Name"
            placeholder="Write your name here"
            variant="outlined"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <TextField
            id="t-email"
            label="E-MAIL"
            placeholder="Write your email here"
            variant="outlined"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <TextField
            id="t-info"
            label="INFORMATION ABOUT THE PROJECT"
            placeholder="Write some information about the project here"
            variant="outlined"
            onChange={(e) => setInfo(e.target.value)}
            value={info}
            multiline
          />
          <input
            id="captcha"
            className=" hidden"
            type="text"
            onChange={(e) => setCaptcha(e.target.value)}
            value={captcha}
          />
          <Button
            variant="contained"
            color="primary"
            className="btn"
            type="submit"
            disabled={captcha !== "" || (name === "" || email === "" || info === "")}
          >
            Submit
          </Button>
        </form>
      </div>
      <div></div>
    </footer>
  )
}