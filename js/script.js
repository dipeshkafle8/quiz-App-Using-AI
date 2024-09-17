import { GoogleGenerativeAI } from "@google/generative-ai";
const API_KEY = "AIzaSyCtG-1OI63dz-acmwk688bedTLhqiCNW2Y";
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const question = document.getElementById("question");
const options = document.getElementById("options");
const submit = document.getElementById("submit");
const previous = document.getElementById("previous");
const next = document.getElementById("next");

let Questions;

function displayQuestionsOnUI() {
  Questions.forEach((element) => {
    console.log(element);
  });
  console.log(typeof Questions);
}

async function getQuestionsFromAI() {
  let result = await model.generateContent(
    "Provide the random array of objects having properties like question option and correct answer(note:provide atleast 10 data,noting extra text only json so that i can do parse)"
  );
  let temp = result.response.text();
  const tempQuestions = temp.split("\n");
  tempQuestions.pop();
  tempQuestions.shift();
  Questions = JSON.parse(tempQuestions.join("\n"));
  displayQuestionsOnUI();
}

getQuestionsFromAI();
