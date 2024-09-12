import { GoogleGenerativeAI } from "@google/generative-ai";
const API_KEY = "AIzaSyCtG-1OI63dz-acmwk688bedTLhqiCNW2Y";
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const question = document.getElementById("question");
const options = document.getElementById("options");
const submit = document.getElementById("submit");
const previous = document.getElementById("previous");
const next = document.getElementById("next");
