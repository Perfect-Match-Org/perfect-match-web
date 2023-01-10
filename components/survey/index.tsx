// components/survey/index.tsx
import React from "react"
import * as Survey from "survey-react" // import surveyjs
import { questions } from "./content" // these are the survey questions

// Modern theme
import "survey-react/modern.min.css"
// Default theme
// import 'survey-react/survey.min.css';

const SurveyComponent = () => {
    // Apply theme
    Survey.StylesManager.applyTheme("modern")

    // Create a modal
    const survey = new Survey.Model(questions)


    // Save data incase user refreshing page while filling out form
    survey.sendResultOnPageNext = true
    const storageName = "SurveyNextjs"
    function saveSurveyData(survey: any) {
        let data = survey.data
        data.pageNo = survey.currentPageNo
        window.localStorage.setItem(storageName, JSON.stringify(data))
        console.log(data)
    }
    survey.onPartialSend.add(function (survey: any) {
        saveSurveyData(survey)
    })
    const prevData = window.localStorage.getItem(storageName) || null
    if (prevData) {
        let data = JSON.parse(prevData)
        survey.data = data
        if (data.pageNo) {
            survey.currentPageNo = data.pageNo
        }


        //When Survey is Complete send data 
        survey.onComplete.add(function (survey: any, options: any) {
            saveSurveyData(survey)
            console.log(survey.data)
            fetch('/api/survey', method = POST, body = { surveyData })
            // window.location.href = "/survey/finish";
        })

    }

    // Render the survey
    return (
        <Survey.Survey model={survey} />
    )
}

export default SurveyComponent