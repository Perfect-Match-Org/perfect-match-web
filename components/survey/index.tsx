// components/survey/index.tsx
import React from "react";
import * as Survey from "survey-react"; // import surveyjs
import { questions } from "./content"; // these are the survey questions

// Modern theme
import "survey-react/modern.min.css";
import { AnyBulkWriteOperation } from "mongodb";
// Default theme
// import 'survey-react/survey.min.css';

const SurveyComponent = (props: any) => {
  // Apply theme
  Survey.StylesManager.applyTheme("modern");

  // Create a modal
  const survey = new Survey.Model(questions);

  // Save data incase user refreshing page while filling out form
  survey.sendResultOnPageNext = true;
  const storageName = "SurveyNextjs";
  function saveSurveyData(survey: any) {
    let data = survey.data;
    data.pageNo = survey.currentPageNo;
    window.localStorage.setItem(storageName, JSON.stringify(data));
  }
  survey.onPartialSend.add(function (survey: JSON) {
    saveSurveyData(survey);
  });
  const prevData =
    window.localStorage.getItem(storageName) || JSON.stringify(props.survey);
  if (prevData) {
    let data = JSON.parse(prevData);
    survey.data = data;
    if (data.pageNo) {
      survey.currentPageNo = data.pageNo;
    }
  }
  //When Survey is Complete send data
  survey.onComplete.add(function (survey: any, options: any) {
    saveSurveyData(survey);
    const baseURL = process.env.NEXT_PUBLIC_API_URL;
    fetch("/api/survey", {
      method: "POST",
      body: JSON.stringify(survey.data),
    });
  });

  // Render the survey
  return <Survey.Survey model={survey} />;
};

export default SurveyComponent;
