import React, { useEffect, useState } from "react";
import "./main.css";
export default function Main() {
  const [language, setlanguage] = useState("hindi");
  const [lastWord, setLastWord] = useState("");
  var [text, setText] = useState("");
  const [options, setOptions] = useState([]);
  function changeText(value) {
    setText(value);
    if (value.includes(" ")) {
      let temp = value.split(" ");
      setLastWord(temp[temp.length - 1]);
    } else {
      setLastWord(value);
    }
    //console.log(text);
  }

  function textHandle(val) {
    let textarea = document.getElementById("textarea");
    let lastIndex = text.lastIndexOf(" ");
    let str = text.substring(0, lastIndex);
    textarea.value = str + " " + val;
  }
  useEffect(() => {
    setTimeout(() => {
      fetch(
        `https://xlit.quillpad.in/quillpad_backend2/processWordJSON?lang=${language}&inString=${lastWord}`
      )
        .then((x) => x.json())
        .then((y) => setOptions(y.twords[0].options));
    }, 1000);
  }, [lastWord]);

  function button(item, index) {
    return (
      <button
        className="suggestion-item"
        key={index}
        value={item}
        onClick={(e) => textHandle(e.target.value)}
      >
        {item}
      </button>
    );
  }
  return (
    <div>
      <h1>Transliteration Keyboard</h1>
      <label className="label">Select language : </label>
      <select
        className="options"
        id="select"
        onChange={(e) => setlanguage(e.target.value)}
      >
        <option className="item" value="hindi">
          Hindi
        </option>
        <option className="item" value="tamil">
          Tamil
        </option>
        <option className="item" value="telugu">
          Telugu
        </option>
        <option className="item" value="punjabi">
          Punjabi
        </option>
        <option className="item" value="gujarati">
          Gujarati
        </option>
        <option className="item" value="bengali">
          Bengali
        </option>
        <option className="item" value="marathi">
          Marathi
        </option>
        <option className="item" value="malayalam">
          Malayalam
        </option>
        <option className="item" value="kannada">
          Kannada
        </option>
        <option className="item" value="nepali">
          Nepali
        </option>
      </select>

      <div>
        <textarea
          placeholder="Type something here"
          className="textarea"
          id="textarea"
          onChange={(e) => changeText(e.target.value)}
        ></textarea>
      </div>

      <div className="suggestions">
        <div className="text">Select from these options</div>
        {options &&
          options.map((item, index) => {
            //console.log(item);
            return (
              <button
                className="suggestion-item"
                key={index}
                value={item}
                onClick={(e) => textHandle(e.target.value)}
              >
                {item}
              </button>
            );
          })}
      </div>
    </div>
  );
}
