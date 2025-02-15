import React from 'react';
import * as Survey from 'survey-react'; // import surveyjs
import { questions } from './content'; // these are the survey questions
import 'survey-react/modern.min.css';
import 'survey-react/defaultV2.min.css';

type Crush = {
    email: string;
    reachout: boolean;
};

const SurveyComponent = (props: any) => {
    Survey.StylesManager.applyTheme('modern');
    const survey = new Survey.Model(questions);

    survey.sendResultOnPageNext = true;
    const storageName = 'CrushesNextjs';

    function saveSurveyData(survey: any) {
        let data = survey.data;
        data.pageNo = survey.currentPageNo;
        window.localStorage.setItem(storageName, JSON.stringify(data));
    }

    survey.onTextMarkdown.add(function (survey: any, options: any) {
        options.html = options.text;
    });

    survey.onPartialSend.add(function (survey: any) {
        saveSurveyData(survey);
    });
    const dataCrushes = props.crushes.map((crush: any) => {
        if (typeof crush === 'string') {
            return { netid: crush.split('@')[0] };
        }
        return { netid: crush.email.split('@')[0], reachout: crush.reachout ? 'yes' : 'no' };
    });
    const dataForbidden = props.forbidden.map((forbid: any) => {
        return { netid: forbid.split('@')[0] };
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
    var defaultThemeColors = Survey.StylesManager.ThemeColors['default'];
    defaultThemeColors['$main-color'] = '#fb7185';
    defaultThemeColors['$main-hover-color'] = '#fb7185';
    defaultThemeColors['$header-color'] = '#fb7185';
    defaultThemeColors['$primary'] = '#fb7185';
    defaultThemeColors['$error-color'] = '#fecdd3';
    defaultThemeColors['$progress-buttons-color'] = '#f1f5f9';
    defaultThemeColors['$error-background-color'] = '#fecdd3';
    defaultThemeColors['$add-button-color'] = '#fb7185';
    defaultThemeColors['$answer-background-color'] = '#rgba(255, 157, 165, 0.5)';
    Survey.StylesManager.applyTheme('default');
    survey.onComplete.add(async function (survey: any, options: any) {
        saveSurveyData(survey);
        let crushes: Crush[] = [];
        let forbidden: String[] = [];
        survey.data.crushes &&
            survey.data.crushes.forEach((crush: any) => {
                crushes.push({ email: crush.netid + '@cornell.edu', reachout: crush.reachout === 'yes' });
            });
        survey.data.forbidden &&
            survey.data.forbidden.forEach((forbid: any) => {
                forbidden.push(forbid.netid + '@cornell.edu');
            });
        await fetch(`/api/restrict`, {
            method: 'POST',
            body: JSON.stringify({ crushes: crushes, forbidden: forbidden }),
        }).then((res) => props.refresh());
    });

    return <Survey.Survey model={survey} />;
};

export default SurveyComponent;
