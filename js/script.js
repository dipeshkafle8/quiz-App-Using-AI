import { GoogleGenerativeAI } from "@google/generative-ai";
const API_KEY = "AIzaSyCtG-1OI63dz-acmwk688bedTLhqiCNW2Y";
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const question = document.getElementById("questions");
const options = document.getElementById("options");
const submit = document.getElementById("submit");
const previous = document.getElementById("previous");
const next = document.getElementById("next");

let Questions;
let index = 0;
let marks = 0;
let answer;
let correctAnswer;

function displayQuestionsOnUI() {
  if (index > 0) {
    previous.disabled = false;
  } else {
    previous.disabled = true;
  }

  question.innerHTML = "";
  options.innerHTML = "";
  let element = Questions[index];
  correctAnswer = Questions[index].correctAnswer;

  let h1 = document.createElement("h1");
  h1.innerText = `${index + 1}.${element.question}`;
  console.log(Questions);

  Questions[index].options.forEach((option, i) => {
    const input = document.createElement("input");
    const label = document.createElement("label");
    input.setAttribute("type", "radio");
    input.setAttribute("name", "question");
    input.setAttribute("value", option);
    input.setAttribute("id", `option${i}`);

    input.addEventListener("click", (e) => {
      answer = e.target.value;
    });

    label.setAttribute("for", `option${i}`);
    label.innerText = option;

    options.appendChild(input);
    options.appendChild(label);
    options.appendChild(document.createElement("br"));
  });
  question.append(h1);
  question.append(options);

  console.log(typeof Questions);
}

function displayMarksOnUI() {
  alert(`You have scored :${marks}`);
}

function handleOnNextButton() {
  if (index == 9) {
    displayMarksOnUI();
    next.remove();
    previous.remove();
    submit.remove();
  } else {
    index++;
    submit.disabled = false;
    displayQuestionsOnUI();
  }
}

function handleOnPreviousButton() {
  if (index > 0) {
    index--;
    displayQuestionsOnUI();
  }
  if (index == 0) {
    previous.disabled = true;
  }
}

function handleOnSubmit() {
  if (answer == correctAnswer) {
    marks++;
  }
  alert("Successfully Submitted");
  submit.disabled = true;
}

async function getQuestionsFromAI() {
  let result = await model.generateContent(
    "Provide the random array of objects having properties like question option and correct answer(note:provide atleast 10 data,noting extra text only json so that i can parse them into array)"
  );
  let temp = result.response.text();
  const tempQuestions = temp.split("\n");
  tempQuestions.pop();
  tempQuestions.shift();
  Questions = JSON.parse(tempQuestions.join("\n"));
  displayQuestionsOnUI();
}

next.addEventListener("click", () => {
  handleOnNextButton();
});
previous.addEventListener("click", () => {
  handleOnPreviousButton();
});
submit.addEventListener("click", () => {
  handleOnSubmit();
});

getQuestionsFromAI();
