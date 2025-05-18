"use client";
import React, { useState } from "react";
import FirstStep from "./_components/FirstStep";
import SecondStep from "./_components/SecondStep";

const SignupPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [email, setEmail] = useState<string>("");

  const Allsteps = [FirstStep, SecondStep][currentStep];

  return  <Allsteps
  setCurrentStep={setCurrentStep}
  currentStep={currentStep}
  setEmail={setEmail}
  email={email}
/>;
};

export default SignupPage;
