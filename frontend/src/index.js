import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import HomePage from "./landing_page/home/HomePage";
import AboutPage from "./landing_page/about/AboutPage";
import SupportPage from "./landing_page/support/SupportPage";
import SignUp from "./landing_page/signup/Signup";
import Universe from "./landing_page/products/Universe";
import PricingPage from "./landing_page/pricing/PricingPage";
import NotFound from "./landing_page/NotFound";
import { ClerkProvider } from '@clerk/clerk-react'
import Chatbot from "./chatbot/chatbot";


// Import your Publishable Key
const PUBLISHABLE_KEY = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

// ✅ Debug line — check if your key is being read correctly
console.log("Loaded Clerk Key:", PUBLISHABLE_KEY);

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key');
}


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
  <BrowserRouter>
  <Chatbot></Chatbot>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/support" element={<SupportPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
  </ClerkProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
