import React from "react";
import * as Survey from "survey-react"; // import surveyjs
import { questions } from "./content"; // these are the survey questions
import "survey-react/modern.min.css";
import "survey-react/defaultV2.min.css";

const SurveyComponent = (props: any) => {
  Survey.StylesManager.applyTheme("modern");
  const survey = new Survey.Model(questions);

  survey.sendResultOnPageNext = true;
  const storageName = "CrushesNextjs";

  function saveSurveyData(survey: any) {
    let data = survey.data;
    data.pageNo = survey.currentPageNo;
    window.localStorage.setItem(storageName, JSON.stringify(data));
  }

  survey.onPartialSend.add(function (survey: JSON) {
    saveSurveyData(survey);
  });
  const dataCrushes = props.crushes.map((crush: any) => {
    return { netid: crush.split("@")[0] };
  });
  const dataForbidden = props.forbidden.map((forbid: any) => {
    return { netid: forbid.split("@")[0] };
  });
  const prevData = JSON.stringify({
    crushes: dataCrushes,
    forbidden: dataForbidden,
  });

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
  defaultThemeColors["$add-button-color"] = "#fda4af";
  defaultThemeColors["$answer-background-color"] = "#rgba(255, 157, 165, 0.5)";
  Survey.StylesManager.applyTheme("default");
  survey.onComplete.add(async function (survey: any, options: any) {
    saveSurveyData(survey);
    let crushes: String[] = [];
    let forbidden: String[] = [];
    survey.data.crushes &&
      survey.data.crushes.forEach((crush: any) => {
        crushes.push(crush.netid + "@cornell.edu");
      });
    survey.data.forbidden &&
      survey.data.forbidden.forEach((forbid: any) => {
        forbidden.push(forbid.netid + "@cornell.edu");
      });
    await fetch(`/api/restrict`, {
      method: "POST",
      body: JSON.stringify({ crushes: crushes, forbidden: forbidden }),
    }).then((res) => props.refresh());
  });

  return <Survey.Survey model={survey} />;
};

export default SurveyComponent;
