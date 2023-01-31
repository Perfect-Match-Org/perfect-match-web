// components/survey/content/index.tsx
export const questions = {
  logoPosition: "right",
  completedHtml:
    "<h3>Profile Updated!</h3><h5>Share Perfect Match with your friends and/or on social media! The more participants we get, the more matches we can generate per person.</h5>",

  focusFirstQuestionAutomatic: false,
  checkErrorsMode: "onValueChanged",
  pages: [
    {
      elements: [
        {
          type: "panel",
          name: "profile",
          title:
            "All fields with an asterisk (*) are required fields. Fields marked <> will be shared with matches",
          elements: [
            {
              type: "text",
              name: "firstName",
              title: "First name",
              isRequired: true,
            },
            {
              type: "text",
              name: "lastName",
              startWithNewLine: false,
              title: "Last name",
              isRequired: true,
            },
            {
              type: "radiogroup",
              name: "gender",
              title: "I IDENTIFY as...",
              isRequired: true,
              hasOther: true,
              choices: [
                {
                  value: "male",
                  text: "A man",
                },
                {
                  value: "female",
                  text: "A woman",
                },
                {
                  value: "nonbinary",
                  text: "A non-binary individual",
                },
              ],
            },
            {
              type: "checkbox",
              name: "genderPref",
              title: "MATCH me with... (Check all that apply)",
              isRequired: true,
              hasOther: false,
              startWithNewLine: false,
              choices: [
                {
                  value: "male",
                  text: "Men",
                },
                {
                  value: "female",
                  text: "Women",
                },
                {
                  value: "nonbinary",
                  text: "Non-binary individuals",
                },
                {
                  value: "anyone",
                  text: "Anyone",
                },
              ],
            },
            {
              type: "text",
              name: "age",
              title: "Age",
              requiredErrorText: "You Age must be between 17 and 110",
              isRequired: false,
              validators: [
                {
                  type: "numeric",
                  text: "",
                  minValue: 17,
                  maxValue: 40,
                },
              ],
            },
            {
              type: "dropdown",
              name: "height",
              title: "Height",
              isRequired: true,
              choices: [
                {
                  value: "55",
                  text: "4'7 or shorter",
                },
                {
                  value: "56",
                  text: "4'8",
                },
                {
                  value: "57",
                  text: "4'9",
                },
                {
                  value: "58",
                  text: "4'10",
                },
                {
                  value: "59",
                  text: "4'11",
                },
                {
                  value: "60",
                  text: "5'0",
                },
                {
                  value: "61",
                  text: "5'1",
                },
                {
                  value: "62",
                  text: "5'2",
                },
                {
                  value: "63",
                  text: "5'3",
                },
                {
                  value: "64",
                  text: "5'4",
                },
                {
                  value: "65",
                  text: "5'5",
                },
                {
                  value: "66",
                  text: "5'6",
                },
                {
                  value: "67",
                  text: "5'7",
                },
                {
                  value: "68",
                  text: "5'8",
                },
                {
                  value: "69",
                  text: "5'9",
                },
                {
                  value: "70",
                  text: "5'10",
                },
                {
                  value: "71",
                  text: "5'11",
                },
                {
                  value: "72",
                  text: "6'0",
                },
                {
                  value: "73",
                  text: "6'1",
                },
                {
                  value: "74",
                  text: "6'2",
                },
                {
                  value: "75",
                  text: "6'3",
                },
                {
                  value: "76",
                  text: "6'4",
                },
                {
                  value: "77",
                  text: "6'5",
                },
                {
                  value: "78",
                  text: "6'6 or taller",
                },
              ],
            },
            {
              type: "text",
              name: "city",
              title: "<> Hometown",
              startWithNewLine: false,
              isRequired: false,
            },
            {
              type: "checkbox",
              name: "race",
              title: "What is your race/ethnicity? (Check all that apply)",
              isRequired: true,
              hasOther: true,
              choices: [
                {
                  value: "white",
                  text: "White",
                },
                {
                  value: "black",
                  text: "Black or African American",
                },
                {
                  value: "eastasian",
                  text: "East Asian",
                },
                {
                  value: "southasian",
                  text: "South Asian",
                },
                {
                  value: "latino",
                  text: "Hispanic or Latino",
                },
                {
                  value: "native_american",
                  text: "American Indian or Alaska Native",
                },
                {
                  value: "hawaiian",
                  text: "Native Hawaiian or Other Pacific Islander",
                },
                {
                  value: "middle_eastern",
                  text: "Middle Eastern",
                },
              ],
            },
            {
              type: "radiogroup",
              name: "year",
              title: "<> Year",
              isRequired: true,
              startWithNewLine: false,

              choices: [
                {
                  value: "freshman",
                  text: "Freshman",
                },
                {
                  value: "sophomore",
                  text: "Sophomore",
                },
                {
                  value: "junior",
                  text: "Junior",
                },
                {
                  value: "senior",
                  text: "Senior",
                },
                {
                  value: "masters",
                  text: "Masters Student",
                },
                {
                  value: "phd",
                  text: "PhD Student",
                },
                {
                  value: "faculty",
                  text: "Faculty/Staff",
                },
                {
                  value: "alumni",
                  text: "Alumni",
                },
              ],
            },
            {
              type: "dropdown",
              name: "college",
              title: "College",
              choices: [
                "Agriculture and Life Sciences",
                "Architecture, Art, and Planning",
                "Arts and Sciences",
                "Hotel Adminstration",
                "Dyson",
                "Engineering",
                "Human Ecology",
                "Industrial and Labor Relations",
                "Public Policy",
                "Graduate/Tech/Medical/Law",
                "Other",
              ],
            },
            {
              type: "dropdown",
              name: "major",
              title: "<> Major",
              isRequired: true,
              hasOther: true,
              choices: [
                "Africana Studies",
                "Agricultural Sciences",
                "American Studies",
                "Animal Science",
                "Anthropology",
                "Applied Economics and Management",
                "Archaeology",
                "Architecture",
                "Asian Studies",
                "Astronomy",
                "Atmospheric Science",
                "Biological Engineering",
                "Biological Sciences",
                "Biology & Society",
                "Biomedical Engineering",
                "Biometry and Statistics",
                "Chemical Engineering",
                "Chemistry",
                "China and Asia-Pacific Studies",
                "Civil Engineering",
                "Classics (Classics, Classical Civ., Greek, Latin)",
                "College Scholar",
                "Communication",
                "Comparative Literature",
                "Computer Science",
                "Design and Environmental Analysis",
                "Development Sociology",
                "Earth and Atmospheric Sciences",
                "Economics",
                "Electrical and Computer Engineering",
                "Engineering Physics",
                "English",
                "Entomology",
                "Environment & Sustainability",
                "Environmental Engineering",
                "Feminist, Gender & Sexuality Studies",
                "Fiber Science and Apparel Design",
                "Fine Arts",
                "Food Science",
                "French",
                "German Studies",
                "Global & Public Health Sciences",
                "Government",
                "History",
                "History of Architecture (transfer students only)",
                "History of Art",
                "Hotel AdministrationSchool of Hotel Administration",
                "Human Biology, Health and Society",
                "Human Development",
                "Independent Major—Arts and Sciences",
                "Independent Major—Engineering",
                "Industrial and Labor Relations",
                "Information Science",
                "Information Science, Systems, and Technology",
                "Interdisciplinary Studies",
                "International Agriculture and Rural Development",
                "Italian",
                "Landscape Architecture",
                "Linguistics",
                "Materials Science and Engineering",
                "Mathematics",
                "Mechanical Engineering",
                "Music",
                "Near Eastern Studies",
                "Nutritional Sciences",
                "Operations Research and Engineering",
                "Performing and Media Arts",
                "Philosophy",
                "Physics",
                "Plant Sciences",
                "Policy Analysis and Management",
                "Psychology",
                "Religious Studies",
                "Science and Technology Studies",
                "Sociology",
                "Spanish",
                "Statistical Science",
                "Urban and Regional Studies",
                "Viticulture and Enology",
              ],
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
              name: "relationshipType",
              title:
                "What type of relationship are you looking for with you match??",
              isRequired: true,
              choices: [
                {
                  value: "romantic",
                  text: "Romantic",
                },
                {
                  value: "casual",
                  text: "Casual",
                },
                {
                  value: "platonic",
                  text: "Platonic",
                },
              ],
            },
            {
              type: "multipletext",
              name: "agePref",
              title: "What age range would you like your matches to be in?",
              isRequired: true,
              items: [
                {
                  name: "youngest",
                  title: "Youngest",
                  inputType: "number",

                  validators: [
                    {
                      requiredErrorText: "You Age must be between 17 and 110",

                      type: "numeric",
                      text: "",
                      minValue: 17,
                      maxValue: 40,
                    },
                  ],
                },
                {
                  name: "oldest",
                  title: "Oldest",
                  inputType: "number",

                  validators: [
                    {
                      requiredErrorText: "You Age must be between 17 and 110",

                      type: "numeric",
                      text: "",
                      minValue: 17,
                      maxValue: 40,
                    },
                  ],
                },
              ],
            },

            {
              type: "checkbox",
              name: "activities",
              title: "Check all involvements that apply to you.",
              isRequired: true,
              choices: [
                {
                  value: "athlete",
                  text: "Student athlete",
                },
                {
                  value: "greeklife",
                  text: "Greek life",
                },
                {
                  value: "proffrat",
                  text: "Professional fraternity",
                },
                {
                  value: "profclub",
                  text: "Professional club",
                },
                {
                  value: "projectteam",
                  text: "Project team",
                },
                {
                  value: "clubsports",
                  text: "Club sports",
                },
                {
                  value: "socialclub",
                  text: "Social club",
                },
                {
                  value: "culturalclub",
                  text: "Cultural club",
                },
                {
                  value: "otherclub",
                  text: "Other club",
                },
                {
                  value: "ra",
                  text: "RA (Resident advisor)",
                },
                {
                  value: "ta",
                  text: "TA (Teaching Assistant)",
                },
              ],
              hasNone: true,
            },
            {
              type: "text",
              name: "describeYourself",
              title:
                "<> Choose the best three words to describe your personality. (e.g. funny, smart, charming)",
              isRequired: true,
            },

            {
              type: "comment",
              name: "bio",
              title:
                "<> Bio! What should you match know about you?  Please answer one or more of the prompts below. Your bio can be as short as a sentence encouraging matches to reach out to you or as long as a few paragraphs. We will share it with your matches to help start the conversation! Need some ideas?: a. How would your ideal wingperson describe you? b. What would you like your match to know about you? c. Any bio of your choice!",
              isRequired: true,
            },
          ],
        },
      ],
    },
  ],
  completeText: "Save",
  showQuestionNumbers: false,
  widthMode: "static",
  width: "1200px",
};
