import React from "react";
import * as Survey from "survey-react";
import { questions } from "./content";
import "survey-react/modern.min.css";

const SurveyComponent = (props: any) => {
	Survey.StylesManager.applyTheme("modern");
	const survey = new Survey.Model(questions);

	survey.onTextMarkdown.add(function (survey: any, options: any) {
		options.html = options.text;
	});
	survey.sendResultOnPageNext = true;
	const storageName = "ProfileNextjs";

	function saveSurveyData(survey: any) {
		let data = survey.data;
		data.pageNo = survey.currentPageNo;
		window.localStorage.setItem(storageName, JSON.stringify(data));
	}

	survey.onPartialSend.add(saveSurveyData);
	survey.onValueChanged.add(saveSurveyData);
	survey.onCurrentPageChanged.add(saveSurveyData);

	const prevData = JSON.stringify(props.profile);

	if (props.profile.complete) {
		let data = JSON.parse(prevData);
		survey.data = data;
		if (data.pageNo) {
			survey.currentPageNo = data.pageNo;
		}
	} else {
		let data = window.localStorage.getItem(storageName);
		if (data) {
			survey.data = JSON.parse(data);
		}
	}
	var defaultThemeColors = Survey.StylesManager.ThemeColors["default"];
	defaultThemeColors["$main-color"] = "#fb7185";
	defaultThemeColors["$main-hover-color"] = "#fb7185";
	defaultThemeColors["$header-color"] = "#fb7185";
	defaultThemeColors["$primary"] = "#fb7185";
	defaultThemeColors["$error-color"] = "#fecdd3";
	defaultThemeColors["$progress-buttons-color"] = "#f1f5f9";
	defaultThemeColors["$error-background-color"] = "#fecdd3";
	defaultThemeColors["$answer-background-color"] = "#rgba(255, 157, 165, 0.5)";
	Survey.StylesManager.applyTheme("default");

	survey.onComplete.add(async function (survey: any, options: any) {
		saveSurveyData(survey);
		await fetch("/api/profile", {
			method: "POST",
			body: JSON.stringify({ ...survey.data, ...{ complete: true } }),
		}).then((res) => props.refresh());
	});

	return <Survey.Survey model={survey} />;
};

export default SurveyComponent;
