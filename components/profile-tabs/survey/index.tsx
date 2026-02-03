import React, { useState } from 'react';
import * as Survey from 'survey-react';
import { questions } from './content';
import 'survey-react/modern.min.css';

const SurveyComponent = (props: any) => {
    Survey.StylesManager.applyTheme('modern');

    const survey = new Survey.Model(questions);
    survey.sendResultOnPageNext = true;
    const storageName = 'SurveyNextjs';

    survey.onTextMarkdown.add(function (survey: any, options: any) {
        options.html = options.text;
    });

    function saveSurveyData(survey: any) {
        let data = survey.data;
        data.pageNo = survey.currentPageNo;
        window.localStorage.setItem(storageName, JSON.stringify(data));
    }

    survey.onPartialSend.add(saveSurveyData);
    survey.onValueChanged.add(saveSurveyData);
    survey.onCurrentPageChanged.add(saveSurveyData);
    survey.onCurrentPageChanged.add(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    const prevData = JSON.stringify(props.survey);

    if (props.survey?.complete) {
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

    const [done, setDone] = useState(props.survey?.complete);

    survey.onComplete.add(async function (survey: any, options: any) {
        window.localStorage.removeItem(storageName);
        await fetch('/api/survey', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...survey.data, complete: true })
        });
        setDone(true);
    });
    if (done) {
        return (
            <div className="rounded-xl bg-pmpink2-100 p-8 text-center">
                <h2 className="text-3xl font-dela-gothic text-pmred-500">Survey submitted!</h2>
                <p className="mt-4 text-pmblue-500">We’ll let you know when matchmaking starts.</p>
                <button onClick={() => setDone(false)}
                    className="
                        mt-4
                        px-6 
                        py-2
                        rounded-full
                        bg-white
                        text-pmred-500 
                        border-4
                        border-pmblue-500 
                        font-bold
                        shadow-[6px_6px_0px_0px_rgba(36,67,141,1)]
                        transition-all
                        hover:translate-x-[4px]
                        hover:translate-y-[4px]
                        hover:shadow-[2px_2px_0px_0px_rgba(36,67,141,1)]
                        active:translate-x-[6px]
                        active:translate-y-[6px]
                        active:shadow-none" >
                    Review answers
                </button>
                <div className="
                        mt-10
                        px-2
                        py-6
                        bg-white
                        text-pmred-500
                        border-4
                        border-pmblue-500
                        shadow-[10px_10px_0px_0px_rgba(36,67,141,1)]" >
                    <p className="text-pmred-500 text-xl font-bold">Psst…want an extra shot at finding your soulmate?</p>
                    <p className="text-pmblue-500">Try Dating with Data, a research study on dating apps run by researchers at the University of Chicago.</p>
                    <p className="text-pmblue-500 font-semibold">It&apos;s like a dating app…except you get paid $20 just for using it!</p>
                    <p className="text-pmblue-500">Learn more at <a className="underline" href="https://datingwithdata.com">DatingWithData.com</a>, and sign up <a className="underline" href="https://uchicago.co1.qualtrics.com/jfe/form/SV_08qzg4aRgjVWxJY">here</a>!</p>
                </div>
            </div>
        );
    };

    var defaultThemeColors = Survey.StylesManager.ThemeColors['default'];
    defaultThemeColors['$main-color'] = '#fb7185';
    defaultThemeColors['$main-hover-color'] = '#fb7185';
    defaultThemeColors['$header-color'] = '#fb7185';
    defaultThemeColors['$primary'] = '#fb7185';
    defaultThemeColors['$error-color'] = '#FFC8E3';
    defaultThemeColors['$error-background-color'] = '#FFC8E3';
    defaultThemeColors['$answer-background-color'] = '#rgba(255, 157, 165, 0.5)';

    defaultThemeColors['$progress-buttons-color'] = '#f1f5f9';

    Survey.StylesManager.applyTheme('default');
    return <Survey.Survey model={survey} />;
};

export default SurveyComponent;
