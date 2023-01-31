import React from "react";
import * as Survey from "survey-react"; // import surveyjs
import { questions } from "./content"; // these are the survey questions
import "survey-react/modern.min.css";
import "survey-react/defaultV2.min.css";

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
    JSON.stringify({ ...props.crushes, ...props.forbidden }) ||
    window.localStorage.getItem(storageName);

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
  Survey.StylesManager.applyTheme();

  survey.onComplete.add(function (survey: any, options: any) {
    saveSurveyData(survey);
    let crushes: String[] = [];
    let forbidden: String[] = [];
    survey.data.crushes.forEach((crush: any) => {
      crushes.push(crush.netid + "@cornell.edu");
    });
    survey.data.forbidden.forEach((forbid: any) => {
      forbidden.push(forbid.netid + "@cornell.edu");
    });
    const baseURL = process.env.NEXT_PUBLIC_API_URL;
    fetch(`${baseURL}/api/restrict`, {
      method: "POST",
      body: JSON.stringify({ crushes: crushes, forbidden: forbidden }),
    });
  });

  return <Survey.Survey model={survey} />;
};

export default SurveyComponent;
