// components/survey/content/index.tsx
export const questions = {
  title: "Perfect Match Survey 2023",
  logoPosition: "right",
  focusFirstQuestionAutomatic: false,
  checkErrorsMode: "onValueChanged",
  pages: [
    // {
    //     "name": "Profile",
    //     "title": "Profile",
    //     "elements": [{
    //         "type": "panel",
    //         "name": "profile",
    //         "title": "All fields with an asterisk (*) are required fields.",
    //         "elements": [{
    //             "type": "text",
    //             "name": "first-name",
    //             "title": "First name",
    //             "isRequired": true
    //         }, {
    //             "type": "text",
    //             "name": "last-name",
    //             "startWithNewLine": false,
    //             "title": "Last name",
    //             "isRequired": true
    //         }, {
    //             "type": "radiogroup",
    //             "name": "gender",
    //             "title": "I IDENTIFY as...",
    //             "isRequired": true,
    //             "hasOther": true,
    //             "choices": [
    //                 {
    //                     "value": "male",
    //                     "text": "A man"
    //                 },
    //                 {
    //                     "value": "female",
    //                     "text": "A woman"
    //                 },
    //                 {
    //                     "value": "nonbinary",
    //                     "text": "A non-binary individual"
    //                 }
    //             ]
    //         }, {
    //             "type": "checkbox",
    //             "name": "genderpref",
    //             "title": "MATCH me with... (Check all that apply)",
    //             "isRequired": true,
    //             "hasOther": false,
    //             "startWithNewLine": false,

    //             "choices": [
    //                 {
    //                     "value": "male",
    //                     "text": "Men"
    //                 },
    //                 {
    //                     "value": "female",
    //                     "text": "Women"
    //                 },
    //                 {
    //                     "value": "nonbinary",
    //                     "text": "Non-binary individuals"
    //                 },
    //                 {
    //                     "value": "anyone",
    //                     "text": "Anyone"
    //                 }
    //             ]
    //         },
    //         {
    //             "type": "text",
    //             "name": "age",
    //             "title": "Age",
    //             "requiredErrorText": "You Age must be between 17 and 110",
    //             "isRequired": false,
    //             "validators": [{
    //                 "type": "numeric",
    //                 "text": "",
    //                 "minValue": 17,
    //                 "maxValue": 110
    //             }]
    //         }, {
    //             type: "dropdown",
    //             name: "year",
    //             title: "Year",
    //             "startWithNewLine": false,

    //             choices: ["Freshman", "Sophomore", "Junior", "Senior", "Graduate Student", "Staff/Faculty"],

    //         }, {
    //             "type": "dropdown",
    //             "name": "height",
    //             "title": "Height",
    //             "isRequired": true,
    //             "choices": [
    //                 {
    //                     "value": "under",
    //                     "text": "4'7 or shorter"
    //                 },
    //                 {
    //                     "value": "56",
    //                     "text": "4'8"
    //                 },
    //                 {
    //                     "value": "57",
    //                     "text": "4'9"
    //                 },
    //                 {
    //                     "value": "58",
    //                     "text": "4'10"
    //                 },
    //                 {
    //                     "value": "59",
    //                     "text": "4'11"
    //                 },
    //                 {
    //                     "value": "60",
    //                     "text": "5'0"
    //                 },
    //                 {
    //                     "value": "61",
    //                     "text": "5'1"
    //                 },
    //                 {
    //                     "value": "62",
    //                     "text": "5'2"
    //                 },
    //                 {
    //                     "value": "63",
    //                     "text": "5'3"
    //                 },
    //                 {
    //                     "value": "64",
    //                     "text": "5'4"
    //                 },
    //                 {
    //                     "value": "65",
    //                     "text": "5'5"
    //                 },
    //                 {
    //                     "value": "66",
    //                     "text": "5'6"
    //                 },
    //                 {
    //                     "value": "67",
    //                     "text": "5'7"
    //                 },
    //                 {
    //                     "value": "68",
    //                     "text": "5'8"
    //                 },
    //                 {
    //                     "value": "69",
    //                     "text": "5'9"
    //                 },
    //                 {
    //                     "value": "70",
    //                     "text": "5'10"
    //                 },
    //                 {
    //                     "value": "71",
    //                     "text": "5'11"
    //                 },
    //                 {
    //                     "value": "72",
    //                     "text": "6'0"
    //                 },
    //                 {
    //                     "value": "73",
    //                     "text": "6'1"
    //                 },
    //                 {
    //                     "value": "74",
    //                     "text": "6'2"
    //                 },
    //                 {
    //                     "value": "75",
    //                     "text": "6'3"
    //                 },
    //                 {
    //                     "value": "76",
    //                     "text": "6'4"
    //                 },
    //                 {
    //                     "value": "77",
    //                     "text": "6'5"
    //                 },
    //                 {
    //                     "value": "over",
    //                     "text": "6'6 or taller"
    //                 }
    //             ]
    //         },
    //         {
    //             "type": "text",
    //             "name": "city",
    //             "title": "<> Hometown",
    //             "startWithNewLine": false,

    //             "isRequired": false
    //         },
    //         {
    //             "type": "checkbox",
    //             "name": "race",
    //             "title": "What is your race/ethnicity? (Check all that apply)",
    //             "isRequired": true,
    //             "hasOther": true,
    //             "choices": [
    //                 {
    //                     "value": "white",
    //                     "text": "White"
    //                 },
    //                 {
    //                     "value": "black",
    //                     "text": "Black or African American"
    //                 },
    //                 {
    //                     "value": "eastasian",
    //                     "text": "East Asian"
    //                 },
    //                 {
    //                     "value": "southasian",
    //                     "text": "South Asian"
    //                 },
    //                 {
    //                     "value": "latino",
    //                     "text": "Hispanic or Latino"
    //                 },
    //                 {
    //                     "value": "native_american",
    //                     "text": "American Indian or Alaska Native"
    //                 },
    //                 {
    //                     "value": "hawaiian",
    //                     "text": "Native Hawaiian or Other Pacific Islander"
    //                 },
    //                 {
    //                     "value": "middle_eastern",
    //                     "text": "Middle Eastern"
    //                 },
    //             ]
    //         },
    //         {
    //             "type": "radiogroup",
    //             "name": "year",
    //             "title": "<> Year",
    //             "isRequired": true,
    //             "startWithNewLine": false,

    //             "choices": [
    //                 {
    //                     "value": "freshman",
    //                     "text": "Freshman"
    //                 },
    //                 {
    //                     "value": "sophomore",
    //                     "text": "Sophomore"
    //                 },
    //                 {
    //                     "value": "junior",
    //                     "text": "Junior"
    //                 },
    //                 {
    //                     "value": "senior",
    //                     "text": "Senior"
    //                 },
    //                 {
    //                     "value": "masters",
    //                     "text": "Masters Student"
    //                 },
    //                 {
    //                     "value": "phd",
    //                     "text": "PhD Student"
    //                 },
    //                 {
    //                     "value": "faculty",
    //                     "text": "Faculty/Staff"
    //                 },
    //                 {
    //                     "value": "alumni",
    //                     "text": "Alumni"
    //                 }
    //             ]
    //         },
    //         {
    //             type: "dropdown",
    //             name: "college",
    //             title: "College",
    //             choices: ["Agriculture and Life Sciences", "Architecture, Art, and Planning", "Arts and Sciences", "Hotel Adminstration", "Dyson", "Engineering", "Human Ecology", "Industrial and Labor Relations", "Public Policy", "Graduate/Tech/Medical/Law", "Other"],

    //         },
    //         {
    //             "type": "dropdown",
    //             "name": "major",
    //             "title": "<> Major",
    //             "isRequired": true,
    //             "hasOther": true,
    //             "choices": [
    //                 "Africana Studies",
    //                 "Agricultural Sciences",
    //                 "American Studies",
    //                 "Animal Science",
    //                 "Anthropology",
    //                 "Applied Economics and Management",
    //                 "Archaeology",
    //                 "Architecture",
    //                 "Asian Studies",
    //                 "Astronomy",
    //                 "Atmospheric Science",
    //                 "Biological Engineering",
    //                 "Biological Sciences",
    //                 "Biology & Society",
    //                 "Biomedical Engineering",
    //                 "Biometry and Statistics",
    //                 "Chemical Engineering",
    //                 "Chemistry",
    //                 "China and Asia-Pacific Studies",
    //                 "Civil Engineering",
    //                 "Classics (Classics, Classical Civ., Greek, Latin)",
    //                 "College Scholar",
    //                 "Communication",
    //                 "Comparative Literature",
    //                 "Computer Science",
    //                 "Design and Environmental Analysis",
    //                 "Development Sociology",
    //                 "Earth and Atmospheric Sciences",
    //                 "Economics",
    //                 "Electrical and Computer Engineering",
    //                 "Engineering Physics",
    //                 "English",
    //                 "Entomology",
    //                 "Environment & Sustainability",
    //                 "Environmental Engineering",
    //                 "Feminist, Gender & Sexuality Studies",
    //                 "Fiber Science and Apparel Design",
    //                 "Fine Arts",
    //                 "Food Science",
    //                 "French",
    //                 "German Studies",
    //                 "Global & Public Health Sciences",
    //                 "Government",
    //                 "History",
    //                 "History of Architecture (transfer students only)",
    //                 "History of Art",
    //                 "Hotel AdministrationSchool of Hotel Administration",
    //                 "Human Biology, Health and Society",
    //                 "Human Development",
    //                 "Independent Major—Arts and Sciences",
    //                 "Independent Major—Engineering",
    //                 "Industrial and Labor Relations",
    //                 "Information Science",
    //                 "Information Science, Systems, and Technology",
    //                 "Interdisciplinary Studies",
    //                 "International Agriculture and Rural Development",
    //                 "Italian",
    //                 "Landscape Architecture",
    //                 "Linguistics",
    //                 "Materials Science and Engineering",
    //                 "Mathematics",
    //                 "Mechanical Engineering",
    //                 "Music",
    //                 "Near Eastern Studies",
    //                 "Nutritional Sciences",
    //                 "Operations Research and Engineering",
    //                 "Performing and Media Arts",
    //                 "Philosophy",
    //                 "Physics",
    //                 "Plant Sciences",
    //                 "Policy Analysis and Management",
    //                 "Psychology",
    //                 "Religious Studies",
    //                 "Science and Technology Studies",
    //                 "Sociology",
    //                 "Spanish",
    //                 "Statistical Science",
    //                 "Urban and Regional Studies",
    //                 "Viticulture and Enology"
    //             ]
    //         },
    //         {
    //             "type": "comment",
    //             "name": "bio",
    //             "title": "<> Bio! Please answer one or more of the prompts below. Your bio can be as short as a sentence encouraging matches to reach out to you or as long as a few paragraphs. We will share it with your matches to help start the conversation!<br><br>Prompts:<br>a. How would your ideal wingperson describe you?<br>b. What would you like your match to know about you?<br>c. Any bio of your choice!",
    //             "isRequired": true,
    //         }]
    //     }]
    // },
    // {
    //     "name": "Social Media",
    //     "title": "Social Media",
    //     "elements": [{
    //         "type": "panel",
    //         "name": "social-media",
    //         "elements": [{
    //             "type": "multipletext",
    //             "name": "contact",
    //             "title": "<> Please provide your preferred methods of contact. These will be shared with your matches to get in touch. At least one social media link is required.",
    //             "validators": [{
    //                 "type": "expression",
    //                 "text": "Please enter at least one method of contact",
    //                 "expression": "{contact.fb} notempty or {contact.insta} notempty or {contact.linkedin} notempty or {contact.phone} notempty or {contact.other} notempty"
    //             }],
    //             "items": [{
    //                 "name": "fb",
    //                 "title": "Facebook profile link"
    //             },
    //             {
    //                 "name": "insta",
    //                 "title": "Instagram handle"
    //             },
    //             {
    //                 "name": "twitter",
    //                 "title": "Twitter handle"
    //             },
    //             {
    //                 "name": "linkedin",
    //                 "title": "LinkedIn profile link"
    //             },
    //             {
    //                 "name": "phone",
    //                 "title": "Phone number"
    //             }

    //             ],
    //             "colCount": 1
    //         },]
    //     }]
    // },

    // {
    //     "name": "Interests",
    //     "elements": [
    //         {
    //             "type": "html",
    //             "name": "disclaimer",
    //             "html": "<h3>Survey</h3>"
    //         },
    //         {
    //             "type": "html",
    //             "name": "disclaimer",
    //             "html": "<br><span style = \"font-size:16px\"><strong>Note: Questions marked with a \"<>\" may be shared with your matches. All other information will remain private and confidential</strong></span>"
    //         },
    //         {
    //             "type": "multipletext",
    //             "name": "agepref",
    //             "title": "What age range would you like your matches to be in?",
    //             "isRequired": true,
    //             "items": [
    //                 {
    //                     "name": "youngest_v2",
    //                     "title": "Youngest",
    //                     "inputType": "number",
    //                     "min": "18",
    //                     "max": "99"
    //                 },
    //                 {
    //                     "name": "oldest_v2",
    //                     "title": "Oldest",
    //                     "inputType": "number",
    //                     "min": "18",
    //                     "max": "99"
    //                 }
    //             ]
    //         },
    //         {
    //             "type": "checkbox",
    //             "name": "activities",
    //             "title": "Check all involvements that apply to you.",
    //             "isRequired": true,
    //             "choices": [
    //                 {
    //                     "value": "athlete",
    //                     "text": "Student athlete"
    //                 },
    //                 {
    //                     "value": "greeklife",
    //                     "text": "Greek life"
    //                 },
    //                 {
    //                     "value": "proffrat",
    //                     "text": "Professional fraternity"
    //                 },
    //                 {
    //                     "value": "profclub",
    //                     "text": "Professional club"
    //                 },
    //                 {
    //                     "value": "projectteam",
    //                     "text": "Project team"
    //                 },
    //                 {
    //                     "value": "clubsports",
    //                     "text": "Club sports"
    //                 },
    //                 {
    //                     "value": "socialclub",
    //                     "text": "Social club"
    //                 },
    //                 {
    //                     "value": "culturalclub",
    //                     "text": "Cultural club"
    //                 },
    //                 {
    //                     "value": "otherclub",
    //                     "text": "Other club"
    //                 },
    //                 {
    //                     "value": "ra",
    //                     "text": "RA (Resident advisor)"
    //                 },
    //                 {
    //                     "value": "ta",
    //                     "text": "TA (Teaching Assistant)"
    //                 }
    //             ],
    //             "hasNone": true
    //         },

    //     ],
    // },
    // {
    //     "name": "Tendencies",
    //     "elements": [
    //         {
    //             "type": "radiogroup",
    //             "name": "friday",
    //             "title": "What would an average Friday night look like?",
    //             "isRequired": true,
    //             "choices": [
    //                 {
    //                     "value": "pjsnetflix",
    //                     "text": "Netflix and PJs"
    //                 },
    //                 {
    //                     "value": "netflixchill",
    //                     "text": "Netflix and chill"
    //                 },
    //                 {
    //                     "value": "frat_party",
    //                     "text": "Frat party"
    //                 },
    //                 {
    //                     "value": "study",
    //                     "text": "Studying"
    //                 },
    //                 {
    //                     "value": "mixer",
    //                     "text": "Mixer or date night"
    //                 },
    //                 {
    //                     "value": "bars",
    //                     "text": "Bar hopping"
    //                 }
    //             ]
    //         },
    //         {
    //             "type": "radiogroup",
    //             "name": "date",
    //             "title": "Where would you go on a first date?",
    //             "isRequired": true,
    //             "choices": [
    //                 {
    //                     "value": "coffee",
    //                     "text": "Coffee on campus"
    //                 },
    //                 {
    //                     "value": "starbucks",
    //                     "text": "Starbucks"
    //                 },
    //                 {
    //                     "value": "ctb",
    //                     "text": "CTB"
    //                 },
    //                 {
    //                     "value": "commons",
    //                     "text": "Restaurant in the Commons"
    //                 },
    //                 {
    //                     "value": "dininghall",
    //                     "text": "Dining hall"
    //                 },
    //                 {
    //                     "value": "fratparty",
    //                     "text": "Meet up at a frat annex"
    //                 },
    //                 {
    //                     "value": "bubbletea",
    //                     "text": "Bubble tea"
    //                 }
    //             ]
    //         },
    //         {
    //             "type": "radiogroup",
    //             "name": "work",
    //             "title": "At what time of day are you most productive?",
    //             "isRequired": true,
    //             "choices": [
    //                 {
    //                     "value": "morning",
    //                     "text": "Morning"
    //                 },
    //                 {
    //                     "value": "afternoon",
    //                     "text": "Afternoon"
    //                 },
    //                 {
    //                     "value": "evening",
    //                     "text": "Evening"
    //                 },
    //                 {
    //                     "value": "nocturnal",
    //                     "text": "I am nocturnal"
    //                 }
    //             ]
    //         },
    //         {
    //             "type": "multipletext",
    //             "name": "sleephabits",
    //             "title": "Sleep Habits",
    //             "items": [
    //                 {
    //                     "name": "sleeptime",
    //                     "isRequired": true,
    //                     "title": "On average, what time do you sleep?"
    //                 },
    //                 {
    //                     "name": "waketime",
    //                     "isRequired": true,
    //                     "title": "On average, what time do you wake up?"
    //                 }
    //             ]
    //         },
    //         {
    //             "type": "radiogroup",
    //             "name": "plans",
    //             "title": "Your plans get messed up for the day. You would...?",
    //             "isRequired": true,
    //             "choices": [
    //                 {
    //                     "value": "shift",
    //                     "text": "Shift your day’s schedule"
    //                 },
    //                 {
    //                     "value": "flow",
    //                     "text": "Go with the flow"
    //                 },
    //                 {
    //                     "value": "cancel",
    //                     "text": "Cancel all your plans"
    //                 },
    //                 {
    //                     "value": "new",
    //                     "text": "Contact someone to make entirely new plans"
    //                 }
    //             ]
    //         },
    //         {
    //             "type": "radiogroup",
    //             "name": "meal",
    //             "title": "Who would you most want to have a meal with?",
    //             "isRequired": true,
    //             "choices": [
    //                 {
    //                     "value": "political",
    //                     "text": "Your favorite political leader"
    //                 },
    //                 {
    //                     "value": "artist",
    //                     "text": "Your favorite artist/musician"
    //                 },
    //                 {
    //                     "value": "athlete",
    //                     "text": "Your favorite athlete"
    //                 },
    //                 {
    //                     "value": "scientist",
    //                     "text": "Your favorite scientist"
    //                 },
    //                 {
    //                     "value": "entrepreneur",
    //                     "text": "Your favorite entrepreneur"
    //                 },
    //                 {
    //                     "value": "actor",
    //                     "text": "Your favorite actor/actress"
    //                 }
    //             ]
    //         },
    //         {
    //             "type": "radiogroup",
    //             "name": "perfectday",
    //             "title": "What would your perfect day look like?",
    //             "isRequired": true,
    //             "choices": [
    //                 {
    //                     "value": "outdoor",
    //                     "text": "Going on an outdoor adventure"
    //                 },
    //                 {
    //                     "value": "netflix",
    //                     "text": "Watching Netflix"
    //                 },
    //                 {
    //                     "value": "newppl",
    //                     "text": "Meeting new people"
    //                 },
    //                 {
    //                     "value": "newfood",
    //                     "text": "Trying new cuisines"
    //                 },
    //                 {
    //                     "value": "museums",
    //                     "text": "Visiting museums"
    //                 },
    //                 {
    //                     "value": "gaming",
    //                     "text": "Playing video games"
    //                 },
    //                 {
    //                     "value": "sleep",
    //                     "text": "Sleeping"
    //                 },
    //                 {
    //                     "value": "friends",
    //                     "text": "Hanging out with close friends"
    //                 },
    //                 {
    //                     "value": "city",
    //                     "text": "Exploring a city"
    //                 },
    //                 {
    //                     "value": "study",
    //                     "text": "Studying"
    //                 }
    //             ]
    //         },
    //         {
    //             "type": "text",
    //             "name": "desscribeyou",
    //             "title": "<> Choose the best three words to describe your personality. (e.g. funny, smart, charming)",
    //             "isRequired": true
    //         },
    //         {
    //             "type": "text",
    //             "name": "describepartner",
    //             "title": "Choose the best three words to describe your ideal partner.",
    //             "isRequired": true
    //         },
    //         {
    //             "type": "radiogroup",
    //             "name": "todolist",
    //             "title": "Do you keep a formal to-do list?",
    //             "isRequired": true,
    //             "choices": [
    //                 {
    //                     "value": "yes",
    //                     "text": "Yes"
    //                 },
    //                 {
    //                     "value": "no",
    //                     "text": "No"
    //                 }
    //             ]
    //         },
    //         {
    //             "type": "radiogroup",
    //             "name": "startover",
    //             "title": "If you could start college all over again, would you?",
    //             "isRequired": true,
    //             "choices": [
    //                 {
    //                     "value": "yes",
    //                     "text": "Yes"
    //                 },
    //                 {
    //                     "value": "no",
    //                     "text": "No"
    //                 }
    //             ]
    //         },
    //         {
    //             "type": "radiogroup",
    //             "name": "timeormoney",
    //             "title": "Would you rather...?",
    //             "isRequired": true,
    //             "choices": [
    //                 {
    //                     "value": "time",
    //                     "text": "Have more time"
    //                 },
    //                 {
    //                     "value": "money",
    //                     "text": "Have more money"
    //                 },
    //                 {
    //                     "value": "influence",
    //                     "text": "Have more influence"
    //                 }
    //             ]
    //         },
    //         {
    //             "type": "radiogroup",
    //             "name": "quality",
    //             "title": "What quality do you value most?",
    //             "isRequired": true,
    //             "choices": [
    //                 {
    //                     "value": "reliability",
    //                     "text": "Reliability"
    //                 },
    //                 {
    //                     "value": "humor",
    //                     "text": "Humor"
    //                 },
    //                 {
    //                     "value": "thoughtfulness",
    //                     "text": "Thoughtfulness"
    //                 },
    //                 {
    //                     "value": "independence",
    //                     "text": "Independence"
    //                 }
    //             ]
    //         },
    //         {
    //             "type": "checkbox",
    //             "name": "humor",
    //             "title": "My sense of humor is...",
    //             "isRequired": true,
    //             "choices": [
    //                 {
    //                     "value": "physical",
    //                     "text": "Physical, slapstick, pranks "
    //                 },
    //                 {
    //                     "value": "witty",
    //                     "text": "Witty, dry, sarcastic"
    //                 },
    //                 {
    //                     "value": "puns",
    //                     "text": "Punny"
    //                 },
    //                 {
    //                     "value": "observational",
    //                     "text": "Observational"
    //                 },
    //                 {
    //                     "value": "deprecating",
    //                     "text": "Self-deprecating"
    //                 },
    //                 {
    //                     "value": "improv",
    //                     "text": "Improvisational"
    //                 },
    //                 {
    //                     "value": "surreal",
    //                     "text": "Surreal, absurd"
    //                 },
    //                 {
    //                     "value": "cultural",
    //                     "text": "Highbrow, literary, cultural references"
    //                 }
    //             ]
    //         },
    //         {
    //             "type": "checkbox",
    //             "name": "sociability",
    //             "title": "How would you describe your social presence? (Check all that apply)",
    //             "isRequired": true,
    //             "hasNone": true,
    //             "choices": [
    //                 {
    //                     "value": "skilled",
    //                     "text": "I am skilled at handling social situations"
    //                 },
    //                 {
    //                     "value": "party",
    //                     "text": "I like parties"
    //                 },
    //                 {
    //                     "value": "storyteller",
    //                     "text": "I am a good storyteller"
    //                 },
    //                 {
    //                     "value": "in_touch",
    //                     "text": "I am good at keeping in touch "
    //                 },
    //                 {
    //                     "value": "popular",
    //                     "text": "I consider myself to be popular"
    //                 },
    //                 {
    //                     "value": "energetic",
    //                     "text": "I am energetic "
    //                 }
    //             ]
    //         },
    //         {
    //             "type": "checkbox",
    //             "name": "interests",
    //             "title": "<> I am passionate about... (Select your top 3, and feel free to elaborate on them in your bio!)",
    //             "isRequired": true,
    //             "choices": [
    //                 {
    //                     "value": "travel",
    //                     "text": "Travel"
    //                 },
    //                 {
    //                     "value": "tech",
    //                     "text": "Science/Tech"
    //                 },
    //                 {
    //                     "value": "music",
    //                     "text": "Music"
    //                 },
    //                 {
    //                     "value": "art",
    //                     "text": "Art"
    //                 },
    //                 {
    //                     "value": "fitness",
    //                     "text": "Fitness"
    //                 },
    //                 {
    //                     "value": "literature",
    //                     "text": "Literature/Reading"
    //                 },
    //                 {
    //                     "value": "food",
    //                     "text": "Food"
    //                 },
    //                 {
    //                     "value": "film",
    //                     "text": "Entertainment and film"
    //                 },
    //                 {
    //                     "value": "sports",
    //                     "text": "Sports"
    //                 },
    //                 {
    //                     "value": "games",
    //                     "text": "Games"
    //                 }
    //             ]
    //         }
    //     ]
    // },
    // {
    //     "name": "Personality",
    //     "elements": [
    //         {
    //             "type": "rating",
    //             "name": "p1",
    //             "title": "Most of my time is spent with the same group of friends.",
    //             "isRequired": true,
    //             "rateValues": [
    //                 "Strongly Disagree",
    //                 "Disagree",
    //                 "Neutral",
    //                 "Agree",
    //                 "Strongly Agree"
    //             ]
    //         },
    //         {
    //             "type": "rating",
    //             "name": "p2",
    //             "title": "I like people who always seek adventure.",
    //             "isRequired": true,
    //             "rateValues": [
    //                 "Strongly Disagree",
    //                 "Disagree",
    //                 "Neutral",
    //                 "Agree",
    //                 "Strongly Agree"
    //             ]
    //         },
    //         {
    //             "type": "rating",
    //             "name": "p3",
    //             "title": "I am more of an improvisor than a planner.",
    //             "isRequired": true,
    //             "rateValues": [
    //                 "Strongly Disagree",
    //                 "Disagree",
    //                 "Neutral",
    //                 "Agree",
    //                 "Strongly Agree"
    //             ]
    //         },
    //         {
    //             "type": "rating",
    //             "name": "p4",
    //             "title": "I don’t mind being the center of attention.",
    //             "isRequired": true,
    //             "rateValues": [
    //                 "Strongly Disagree",
    //                 "Disagree",
    //                 "Neutral",
    //                 "Agree",
    //                 "Strongly Agree"
    //             ]
    //         },
    //         {
    //             "type": "rating",
    //             "name": "p5",
    //             "title": "I find it easy to talk about emotions.",
    //             "isRequired": true,
    //             "rateValues": [
    //                 "Strongly Disagree",
    //                 "Disagree",
    //                 "Neutral",
    //                 "Agree",
    //                 "Strongly Agree"
    //             ]
    //         },
    //         {
    //             "type": "rating",
    //             "name": "p6",
    //             "title": "I tend to put myself first and others second.",
    //             "isRequired": true,
    //             "rateValues": [
    //                 "Strongly Disagree",
    //                 "Disagree",
    //                 "Neutral",
    //                 "Agree",
    //                 "Strongly Agree"
    //             ]
    //         },
    //         {
    //             "type": "rating",
    //             "name": "p7",
    //             "title": "If I had a business, I would find it difficult to fire loyal but underperforming employees.",
    //             "isRequired": true,
    //             "rateValues": [
    //                 "Strongly Disagree",
    //                 "Disagree",
    //                 "Neutral",
    //                 "Agree",
    //                 "Strongly Agree"
    //             ]
    //         },
    //         {
    //             "type": "rating",
    //             "name": "p8",
    //             "title": "I see myself as more of a compromiser than a fighter.",
    //             "isRequired": true,
    //             "rateValues": [
    //                 "Strongly Disagree",
    //                 "Disagree",
    //                 "Neutral",
    //                 "Agree",
    //                 "Strongly Agree"
    //             ]
    //         },
    //         {
    //             "type": "rating",
    //             "name": "p9",
    //             "title": "I would describe my friends as imaginative and creative.",
    //             "isRequired": true,
    //             "rateValues": [
    //                 "Strongly Disagree",
    //                 "Disagree",
    //                 "Neutral",
    //                 "Agree",
    //                 "Strongly Agree"
    //             ]
    //         },
    //         {
    //             "type": "rating",
    //             "name": "p10",
    //             "title": "Winning an argument matters more to me than making sure no one is upset.",
    //             "isRequired": true,
    //             "rateValues": [
    //                 "Strongly Disagree",
    //                 "Disagree",
    //                 "Neutral",
    //                 "Agree",
    //                 "Strongly Agree"
    //             ]
    //         },
    //         {
    //             "type": "rating",
    //             "name": "p11",
    //             "title": "I like it when people always say what’s on their mind.",
    //             "isRequired": true,
    //             "rateValues": [
    //                 "Strongly Disagree",
    //                 "Disagree",
    //                 "Neutral",
    //                 "Agree",
    //                 "Strongly Agree"
    //             ]
    //         },
    //         {
    //             "type": "rating",
    //             "name": "p12",
    //             "title": "I get anxious right before exams.",
    //             "isRequired": true,
    //             "rateValues": [
    //                 "Strongly Disagree",
    //                 "Disagree",
    //                 "Neutral",
    //                 "Agree",
    //                 "Strongly Agree"
    //             ]
    //         },
    //         {
    //             "type": "rating",
    //             "name": "p13",
    //             "title": "I have the ability to change my mood quickly.",
    //             "isRequired": true,
    //             "rateValues": [
    //                 "Strongly Disagree",
    //                 "Disagree",
    //                 "Neutral",
    //                 "Agree",
    //                 "Strongly Agree"
    //             ]
    //         },
    //         {
    //             "type": "rating",
    //             "name": "p14",
    //             "title": "I'd take a challenging (but interesting) class over an easy (but boring) class.",
    //             "isRequired": true,
    //             "rateValues": [
    //                 "Strongly Disagree",
    //                 "Disagree",
    //                 "Neutral",
    //                 "Agree",
    //                 "Strongly Agree"
    //             ]
    //         },
    //         {
    //             "type": "rating",
    //             "name": "p15",
    //             "title": "When a friend is sad, I am more likely to offer solutions to the problem rather than emotional support.",
    //             "isRequired": true,
    //             "rateValues": [
    //                 "Strongly Disagree",
    //                 "Disagree",
    //                 "Neutral",
    //                 "Agree",
    //                 "Strongly Agree"
    //             ]
    //         },
    //         {
    //             "type": "rating",
    //             "name": "p16",
    //             "title": "When I have a personal problem, I try to solve it on my own rather than talk to others.",
    //             "isRequired": true,
    //             "rateValues": [
    //                 "Strongly Disagree",
    //                 "Disagree",
    //                 "Neutral",
    //                 "Agree",
    //                 "Strongly Agree"
    //             ]
    //         },
    //         {
    //             "type": "rating",
    //             "name": "p17",
    //             "title": "I enjoy debating with other people.",
    //             "isRequired": true,
    //             "rateValues": [
    //                 "Strongly Disagree",
    //                 "Disagree",
    //                 "Neutral",
    //                 "Agree",
    //                 "Strongly Agree"
    //             ]
    //         },
    //         {
    //             "type": "rating",
    //             "name": "p18",
    //             "title": "I spend time exploring unrealistic but intriguing ideas.",
    //             "isRequired": true,
    //             "rateValues": [
    //                 "Strongly Disagree",
    //                 "Disagree",
    //                 "Neutral",
    //                 "Agree",
    //                 "Strongly Agree"
    //             ]
    //         },
    //         {
    //             "type": "rating",
    //             "name": "p19",
    //             "title": "Personal style is important to me.",
    //             "isRequired": true,
    //             "rateValues": [
    //                 "Strongly Disagree",
    //                 "Disagree",
    //                 "Neutral",
    //                 "Agree",
    //                 "Strongly Agree"
    //             ]
    //         },
    //         {
    //             "type": "panel",
    //             "name": "panel1",
    //             "elements": [
    //                 {
    //                     "type": "rating",
    //                     "name": "introvert",
    //                     "title": "I am...",
    //                     "isRequired": true,
    //                     "rateMax": 10,
    //                     "minRateDescription": "Very introverted",
    //                     "maxRateDescription": "Very extroverted"
    //                 },
    //                 {
    //                     "type": "radiogroup",
    //                     "name": "introvert_same",
    //                     "indent": 3,
    //                     "title": "I prefer my partner to be...",
    //                     "isRequired": true,
    //                     "choices": [
    //                         {
    //                             "value": "same",
    //                             "text": "The same"
    //                         },
    //                         {
    //                             "value": "less",
    //                             "text": "Less extroverted"
    //                         },
    //                         {
    //                             "value": "more",
    //                             "text": "More extroverted"
    //                         },
    //                         {
    //                             "value": "doesnt_matter",
    //                             "text": "It doesn't matter"
    //                         }
    //                     ]
    //                 }
    //             ]
    //         },
    //         {
    //             "type": "panel",
    //             "name": "panel3",
    //             "elements": [
    //                 {
    //                     "type": "rating",
    //                     "name": "easygoing",
    //                     "title": "I am...",
    //                     "isRequired": true,
    //                     "rateMax": 10,
    //                     "minRateDescription": "Easygoing",
    //                     "maxRateDescription": "Assertive"
    //                 },
    //                 {
    //                     "type": "radiogroup",
    //                     "name": "easygoing_same",
    //                     "indent": 3,
    //                     "title": "I prefer my partner to be...",
    //                     "isRequired": true,
    //                     "choices": [
    //                         {
    //                             "value": "same",
    //                             "text": "The same"
    //                         },
    //                         {
    //                             "value": "less",
    //                             "text": "Less assertive"
    //                         },
    //                         {
    //                             "value": "more",
    //                             "text": "More assertive"
    //                         },
    //                         {
    //                             "value": "doesnt_matter",
    //                             "text": "It doesn't matter"
    //                         }
    //                     ]
    //                 }
    //             ]
    //         },
    //     ]
    // },
    {
      name: "Finale",
      elements: [
        {
          type: "text",
          name: "numdated",
          title: "How many people have you dated in the last 5 years?",
        },
        {
          type: "text",
          name: "longestrelationship",
          title: "How many months was your longest relationship?",
        },
        {
          type: "radiogroup",
          name: "commitment",
          title: "What are you looking for by taking this survey?",
          isRequired: true,
          choices: [
            {
              value: "plantomeet",
              text: "I plan to meet my matches",
            },
            {
              value: "willsee",
              text: "I will potentially meet with my matches",
            },
            {
              value: "meetfriends",
              text: "I just want to meet new people",
            },
            {
              value: "fun",
              text: "I am taking this for fun and will probably not make an effort to meet",
            },
          ],
        },
        {
          type: "radiogroup",
          name: "pairedwith",
          title: "I would like to be paired with someone who...",
          isRequired: true,
          choices: [
            {
              value: "similar",
              text: "Has mostly similar interests to me",
            },
            {
              value: "different",
              text: "Has mostly different interests than me",
            },
            {
              value: "either",
              text: "I am fine with either",
            },
          ],
        },
        {
          type: "rating",
          name: "politics",
          title: "What are your political tendencies?",
          rateMax: 10,
          isRequired: true,
          minRateDescription: "Left",
          maxRateDescription: "Right",
        },
        {
          type: "rating",
          name: "politically_active",
          title: "I consider myself politically active.",
          isRequired: true,
          minRateDescription: "Very inactive",
          maxRateDescription: "Very active",
        },
        {
          type: "matrix",
          name: "habits",
          title: "How often do you use the following?",
          columns: [
            {
              value: "never",
              text: "Never",
            },
            {
              value: "rarely",
              text: "Rarely",
            },
            {
              value: "sometimes",
              text: "Monthly",
            },
            {
              value: "often",
              text: "Weekly",
            },
            {
              value: "very frequently",
              text: "Daily",
            },
          ],
          rows: [
            {
              value: "drinking",
              text: "Alcohol",
            },
            {
              value: "smoking",
              text: "Cigarettes/E-cigs ",
            },
            {
              value: "weed",
              text: "Marijuana",
            },
            {
              value: "other",
              text: "Other drugs",
            },
          ],
        },
        {
          type: "matrix",
          name: "partner_habits",
          title:
            "At MAXIMUM, how often is it okay for you partner to use the following?",
          columns: [
            {
              value: "never",
              text: "Never",
            },
            {
              value: "rarely",
              text: "Rarely",
            },
            {
              value: "sometimes",
              text: "Monthly",
            },
            {
              value: "often",
              text: "Weekly",
            },
            {
              value: "dont_care",
              text: "Don't care",
            },
          ],
          rows: [
            {
              value: "drinking",
              text: "Alcohol",
            },
            {
              value: "smoking",
              text: "Cigarettes/E-cigs ",
            },
            {
              value: "weed",
              text: "Marijuana",
            },
            {
              value: "other",
              text: "Other drugs",
            },
          ],
        },
        {
          type: "checkbox",
          name: "deal_breakers",
          title: "What is deal breaker for you? (Check all that apply)",
          isRequired: true,
          choices: [
            {
              value: "politiics",
              text: "Difference in political views",
            },
            {
              value: "social",
              text: "Difference in social habits",
            },
          ],
          hasNone: true,
        },
        {
          type: "html",
          name: "disregard1",
          html: "Disclaimer: <br><i>Perfect Match does not take any responsibility and is not liable for any distress caused through the use of our service. By responding to this form, you are giving Perfect Match the right to process your data and match you with another individual at Cornell. Perfect Match takes precautions to protect your privacy and to keep your information secure. We strive to be transparent in the way we process your data and will be sharing our project’s process with you soon!</i>",
        },
      ],
    },
  ],
  showProgressBar: "top",
  progressBarType: "buttons",
  completeText: "Submit",
  showPreviewBeforeComplete: "showAllQuestions",
  showQuestionNumbers: false,
  widthMode: "static",
  width: "1200px",
};
