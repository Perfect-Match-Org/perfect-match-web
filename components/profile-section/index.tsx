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

  const prevData = JSON.stringify(props.profile);

  if (prevData) {
    let data = JSON.parse(prevData);
    survey.data = data;
    if (data.pageNo) {
      survey.currentPageNo = data.pageNo;
    }
  }
  var defaultThemeColors = Survey.StylesManager.ThemeColors["default"];
  defaultThemeColors["$main-color"] = "#fda4af";
  defaultThemeColors["$main-hover-color"] = "#fda4af";
  defaultThemeColors["$header-color"] = "#fda4af";
  defaultThemeColors["$primary"] = "#fda4af";
  defaultThemeColors["$error-color"] = "#fecdd3";
  defaultThemeColors["$progress-buttons-color"] = "#f1f5f9";
  defaultThemeColors["$error-background-color"] = "#fecdd3";
  defaultThemeColors["$answer-background-color"] = "#rgba(255, 157, 165, 0.5)";
  Survey.StylesManager.applyTheme("default");

  survey.onComplete.add(function (survey: any, options: any) {
    saveSurveyData(survey);
    fetch("/api/profile", {
      method: "POST",
      body: JSON.stringify(survey.data),
    }).then((res) => props.refresh());
  });

  return <Survey.Survey model={survey} />;
};

export default SurveyComponent;
