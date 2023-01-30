import React from "react";
import * as Survey from "survey-react";
import { questions } from "./content";
import "survey-react/modern.min.css";
const SurveyComponent = (props: any) => {
  Survey.StylesManager.applyTheme("modern");
  const survey = new Survey.Model(questions);

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
    JSON.stringify(props.survey) || window.localStorage.getItem(storageName);

  if (prevData) {
    let data = JSON.parse(prevData);
    survey.data = data;
    if (data.pageNo) {
      survey.currentPageNo = data.pageNo;
    }
  }
  var defaultThemeColors = Survey.StylesManager.ThemeColors["default"];
  defaultThemeColors["$main-color"] = "#fca5a5";
  defaultThemeColors["$main-hover-color"] = "#ff4d4f";
  defaultThemeColors["$text-color"] = "#4a4a4a";
  defaultThemeColors["$header-color"] = "#4a4a4a";

  defaultThemeColors["$header-background-color"] = "#FFFFFF";
  defaultThemeColors["$body-container-background-color"] = "#fff2f2";
  Survey.StylesManager.applyTheme("default");
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
