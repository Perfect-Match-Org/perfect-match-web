// components/survey/content/index.tsx

export const questions = {
  logoPosition: "right",
  focusFirstQuestionAutomatic: false,
  checkErrorsMode: "onValueChanged",
  completedHtml:
    "<h3>Survey Updated!</h3><br><h5>Share Perfect Match with your friends and/or on social media! The more participants we get, the more matches we can generate per person.</h5>",

  pages: [
    {
      "name": "Welcome",
      "title": "Perfect Match 2023 ",
      "description": "Elements marked <> will be shared with your matches.",


      "elements": [{

        "type": "panel",
        "name": "social-media",
        "elements": [{
          "type": "multipletext",
          "name": "contact",
          "title": "<> When we find your matches how do you want them to contact you? At least one social media link is required.",
          "validators": [{
            "type": "expression",
            "text": "Please enter at least one method of contact",
            "expression": "{contact.fb} notempty or {contact.insta} notempty or {contact.linkedin} notempty or {contact.phone} notempty or {contact.other} notempty"
          }],
          "items": [{
            "name": "fb",
            "title": "Facebook profile link"
          },
          {
            "name": "insta",
            "title": "Instagram handle"
          },
          {
            "name": "twitter",
            "title": "Twitter handle"
          },
          {
            "name": "linkedin",
            "title": "LinkedIn profile link"
          },
          {
            "name": "phone",
            "title": "Phone number"
          }

          ],
          "colCount": 1
        },]
      }]
    },
    {
      "name": "Cornell",
      "title": "Cornell",
      "description": "Elements marked <> will be shared with your matches.",

      "elements": [{

        "type": "radiogroup",
        "name": "faction",
        "title": "What’s the least traumatizing Cornell faction your prospective match could belong to?",
        "isRequired": true,
        "choices": [
          {
            "value": "noshower",
            "text": "Near the top of the class for engineering talent, near the bottom for shower frequency"
          },
          {
            "value": "dyson",
            "text": "Stress-free Dyson pupil, but claims to have a “genuine interest” in Discounted Cash Flow model."
          },
          {
            "value": "phil",
            "text": "Declared their love to you through a timeless sonnet, but won’t be able to use their Philosophy major to support your family"
          },
        ]
      },
      {
        "type": "dropdown",
        "name": "library-ranking",
        "title": "If they’re a 5 in the Hotel Library, they're a _ in Duffield.",
        "isRequired": true,
        "choices": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
      }, {

        "type": "radiogroup",
        "name": "cloth-date",
        "title": "Worst Thing Your Match Could Wear on a Date",
        "isRequired": true,
        "choices": [
          {
            "value": "gries",
            "text": "David Gries 73 Years of Programming Experience T-Shirt"
          },
          {
            "value": "jersey",
            "text": "Cornell Hockey Jersey with some residual fish guts from the Cornell-Harvard game"
          },
          {
            "value": "vest",
            "text": "Patagonia Vest from their past internship"
          },
          {
            "value": "letterman",
            "text": "Scarsdale High School Letterman Jacket"
          },

        ]
      }, {

        "type": "radiogroup",
        "name": "alternative",
        "title": "Choose the best alternative. Your match is a 10, but they ____.",
        "isRequired": true,
        "choices": [
          {
            "value": "gothics",
            "text": "Live in the Gothics"
          },
          {
            "value": "basement",
            "text": "Enjoy studying in the Olin Basement"
          },
          {
            "value": "oken",
            "text": "Favorite Dining Hall is Oken"
          },
          {
            "value": "hinge",
            "text": "Matched with your roomate on Hinge"
          },

        ]
      }, {

        "type": "radiogroup",
        "name": "task",
        "title": "In the next year, I want to complete this task from the 161 Things Every Cornellian Should Do. ",
        "isRequired": true,
        "choices": [
          {
            "value": "hookup",
            "text": "Hook up with your T.A."
          },
          {
            "value": "bridge",
            "text": "Kiss on the suspension bridge at midnight"
          },
          {
            "value": "stacks",
            "text": "Make the library into your bedroom and have sex in the stacks"
          },
          {
            "value": "flirt",
            "text": "Flirt with your professor"
          },

        ]
      }, {
        "name": "hookupsong",
        "type": "text",
        "title": "The First Song of My Hook-Up Playlist Is…"
      }, {
        "name": "slope day",
        "type": "text",
        "title": "Which artist should come for Slope Day 2023?"
      }, {

        "type": "radiogroup",
        "name": "study",
        "title": "Late night study sesh on campus. Where?",
        "isRequired": true,
        "choices": [
          {
            "value": "",
            "text": "Duffield"
          },
          {
            "value": "cock",
            "text": "Cocktail"
          },
          {
            "value": "psb",
            "text": "PSB"
          }, {
            "value": "lib",
            "text": "Library"
          }, {
            "value": "goldwin",
            "text": "Goldwin Classroom"
          }, {
            "value": "room",
            "text": "My Cozy Room"
          },

        ]
      }, {

        "type": "radiogroup",
        "name": "",
        "title": "",
        "isRequired": true,
        "choices": [
          {
            "value": "",
            "text": ""
          },
          {
            "value": "",
            "text": "  "
          },
          {
            "value": "",
            "text": ""
          },

        ]
      },


      ]

    },


    {
      "name": "Interests",
      "elements": [

        {
          "type": "html",
          "name": "disclaimer",
          "html": "<br><span style = \"font-size:16px\"><strong>Note: Questions marked with a \"<>\" may be shared with your matches. All other information will remain private and confidential</strong></span>"
        },
        {
          "type": "multipletext",
          "name": "agepref",
          "title": "What age range would you like your matches to be in?",
          "isRequired": true,
          "items": [
            {
              "name": "youngest_v2",
              "title": "Youngest",
              "inputType": "number",

              "validators": [{
                "requiredErrorText": "You Age must be between 17 and 110",

                "type": "numeric",
                "text": "",
                "minValue": 17,
                "maxValue": 110
              }]
            },
            {
              "name": "oldest_v2",
              "title": "Oldest",
              "inputType": "number",
              "min": "18",
              "max": "99"
            }
          ]
        },
        {
          "type": "checkbox",
          "name": "activities",
          "title": "Check all involvements that apply to you.",
          "isRequired": true,
          "choices": [
            {
              "value": "athlete",
              "text": "Student athlete"
            },
            {
              "value": "greeklife",
              "text": "Greek life"
            },
            {
              "value": "proffrat",
              "text": "Professional fraternity"
            },
            {
              "value": "profclub",
              "text": "Professional club"
            },
            {
              "value": "projectteam",
              "text": "Project team"
            },
            {
              "value": "clubsports",
              "text": "Club sports"
            },
            {
              "value": "socialclub",
              "text": "Social club"
            },
            {
              "value": "culturalclub",
              "text": "Cultural club"
            },
            {
              "value": "otherclub",
              "text": "Other club"
            },
            {
              "value": "ra",
              "text": "RA (Resident advisor)"
            },
            {
              "value": "ta",
              "text": "TA (Teaching Assistant)"
            }
          ],
          "hasNone": true
        },

      ],
    },
    {
      "name": "Tendencies",
      "elements": [
        {
          "type": "radiogroup",
          "name": "friday",
          "title": "What would an average Friday night look like?",
          "isRequired": true,
          "choices": [
            {
              "value": "pjsnetflix",
              "text": "Netflix and PJs"
            },
            {
              "value": "netflixchill",
              "text": "Netflix and chill"
            },
            {
              "value": "frat_party",
              "text": "Frat party"
            },
            {
              "value": "study",
              "text": "Studying"
            },
            {
              "value": "mixer",
              "text": "Mixer or date night"
            },
            {
              "value": "bars",
              "text": "Bar hopping"
            }
          ]
        },
        {

          "type": "checkbox",
          "name": "music",
          "title": "Favorite Music Genre(s): [can check all that apply]",
          "isRequired": true,
          "choices": [
            {
              "value": "pop",
              "text": "Pop"
            },
            {
              "value": "rock",
              "text": "Rock"
            },
            {
              "value": "indie",
              "text": "Indie"
            },
            {
              "value": "rap",
              "text": "Rap"
            }, {
              "value": "jazz",
              "text": "Jazz"
            }, {
              "value": "blues",
              "text": "Blues"
            },
            {
              "value": "r&b",
              "text": "R&B"
            },

          ]
        },
        {
          "type": "radiogroup",
          "name": "date",
          "title": "Where would you go on a first date?",
          "isRequired": true,
          "choices": [
            {
              "value": "coffee",
              "text": "Coffee on campus"
            },
            {
              "value": "starbucks",
              "text": "Starbucks"
            },
            {
              "value": "ctb",
              "text": "CTB"
            },
            {
              "value": "commons",
              "text": "Restaurant in the Commons"
            },
            {
              "value": "dininghall",
              "text": "Dining hall"
            },
            {
              "value": "fratparty",
              "text": "Meet up at a frat annex"
            },
            {
              "value": "bubbletea",
              "text": "Bubble tea"
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "work",
          "title": "At what time of day are you most productive?",
          "isRequired": true,
          "choices": [
            {
              "value": "morning",
              "text": "Morning"
            },
            {
              "value": "afternoon",
              "text": "Afternoon"
            },
            {
              "value": "evening",
              "text": "Evening"
            },
            {
              "value": "nocturnal",
              "text": "I am nocturnal"
            }
          ]
        },
        {
          "type": "multipletext",
          "name": "sleephabits",
          "title": "Sleep Habits",
          "items": [
            {
              "name": "sleeptime",
              "isRequired": true,
              "title": "On average, what time do you sleep?"
            },
            {
              "name": "waketime",
              "isRequired": true,
              "title": "On average, what time do you wake up?"
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "plans",
          "title": "Your plans get messed up for the day. You would...?",
          "isRequired": true,
          "choices": [
            {
              "value": "shift",
              "text": "Shift your day’s schedule"
            },
            {
              "value": "flow",
              "text": "Go with the flow"
            },
            {
              "value": "cancel",
              "text": "Cancel all your plans"
            },
            {
              "value": "new",
              "text": "Contact someone to make entirely new plans"
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "meal",
          "title": "Who would you most want to have a meal with?",
          "isRequired": true,
          "choices": [
            {
              "value": "political",
              "text": "Your favorite political leader"
            },
            {
              "value": "artist",
              "text": "Your favorite artist/musician"
            },
            {
              "value": "athlete",
              "text": "Your favorite athlete"
            },
            {
              "value": "scientist",
              "text": "Your favorite scientist"
            },
            {
              "value": "entrepreneur",
              "text": "Your favorite entrepreneur"
            },
            {
              "value": "actor",
              "text": "Your favorite actor/actress"
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "perfectday",
          "title": "What would your perfect day look like?",
          "isRequired": true,
          "choices": [
            {
              "value": "outdoor",
              "text": "Going on an outdoor adventure"
            },
            {
              "value": "netflix",
              "text": "Watching Netflix"
            },
            {
              "value": "newppl",
              "text": "Meeting new people"
            },
            {
              "value": "newfood",
              "text": "Trying new cuisines"
            },
            {
              "value": "museums",
              "text": "Visiting museums"
            },
            {
              "value": "gaming",
              "text": "Playing video games"
            },
            {
              "value": "sleep",
              "text": "Sleeping"
            },
            {
              "value": "friends",
              "text": "Hanging out with close friends"
            },
            {
              "value": "city",
              "text": "Exploring a city"
            },
            {
              "value": "study",
              "text": "Studying"
            }
          ]
        },
        {
          "type": "text",
          "name": "desscribeyou",
          "title": "<> Choose the best three words to describe your personality. (e.g. funny, smart, charming)",
          "isRequired": true
        },
        {
          "type": "text",
          "name": "describepartner",
          "title": "Choose the best three words to describe your ideal partner.",
          "isRequired": true
        },
        {
          "type": "radiogroup",
          "name": "todolist",
          "title": "Do you keep a formal to-do list?",
          "isRequired": true,
          "choices": [
            {
              "value": "yes",
              "text": "Yes"
            },
            {
              "value": "no",
              "text": "No"
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "startover",
          "title": "If you could start college all over again, would you?",
          "isRequired": true,
          "choices": [
            {
              "value": "yes",
              "text": "Yes"
            },
            {
              "value": "no",
              "text": "No"
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "timeormoney",
          "title": "Would you rather...?",
          "isRequired": true,
          "choices": [
            {
              "value": "time",
              "text": "Have more time"
            },
            {
              "value": "money",
              "text": "Have more money"
            },
            {
              "value": "influence",
              "text": "Have more influence"
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "quality",
          "title": "What quality do you value most?",
          "isRequired": true,
          "choices": [
            {
              "value": "reliability",
              "text": "Reliability"
            },
            {
              "value": "humor",
              "text": "Humor"
            },
            {
              "value": "thoughtfulness",
              "text": "Thoughtfulness"
            },
            {
              "value": "independence",
              "text": "Independence"
            }
          ]
        },
        {
          "type": "checkbox",
          "name": "humor",
          "title": "My sense of humor is...",
          "isRequired": true,
          "choices": [
            {
              "value": "physical",
              "text": "Physical, slapstick, pranks "
            },
            {
              "value": "witty",
              "text": "Witty, dry, sarcastic"
            },
            {
              "value": "puns",
              "text": "Punny"
            },
            {
              "value": "observational",
              "text": "Observational"
            },
            {
              "value": "deprecating",
              "text": "Self-deprecating"
            },
            {
              "value": "improv",
              "text": "Improvisational"
            },
            {
              "value": "surreal",
              "text": "Surreal, absurd"
            },
            {
              "value": "cultural",
              "text": "Highbrow, literary, cultural references"
            }
          ]
        },
        {
          "type": "checkbox",
          "name": "sociability",
          "title": "How would you describe your social presence? (Check all that apply)",
          "isRequired": true,
          "hasNone": true,
          "choices": [
            {
              "value": "skilled",
              "text": "I am skilled at handling social situations"
            },
            {
              "value": "party",
              "text": "I like parties"
            },
            {
              "value": "storyteller",
              "text": "I am a good storyteller"
            },
            {
              "value": "in_touch",
              "text": "I am good at keeping in touch "
            },
            {
              "value": "popular",
              "text": "I consider myself to be popular"
            },
            {
              "value": "energetic",
              "text": "I am energetic "
            }
          ]
        },
        {
          "type": "checkbox",
          "name": "interests",
          "title": "<> I am passionate about... (Select your top 3, and feel free to elaborate on them in your bio!)",
          "isRequired": true,
          "choices": [
            {
              "value": "travel",
              "text": "Travel"
            },
            {
              "value": "tech",
              "text": "Science/Tech"
            },
            {
              "value": "music",
              "text": "Music"
            },
            {
              "value": "art",
              "text": "Art"
            },
            {
              "value": "fitness",
              "text": "Fitness"
            },
            {
              "value": "literature",
              "text": "Literature/Reading"
            },
            {
              "value": "food",
              "text": "Food"
            },
            {
              "value": "film",
              "text": "Entertainment and film"
            },
            {
              "value": "sports",
              "text": "Sports"
            },
            {
              "value": "games",
              "text": "Games"
            }
          ]
        }
      ]
    },
    {
      "name": "Personality",
      "elements": [
        {
          "type": "rating",
          "name": "p1",
          "title": "Most of my time is spent with the same group of friends.",
          "isRequired": true,
          "rateValues": [
            "Strongly Disagree",
            "Disagree",
            "Neutral",
            "Agree",
            "Strongly Agree"
          ]
        },
        {
          "type": "rating",
          "name": "p2",
          "title": "I like people who always seek adventure.",
          "isRequired": true,
          "rateValues": [
            "Strongly Disagree",
            "Disagree",
            "Neutral",
            "Agree",
            "Strongly Agree"
          ]
        },
        {
          "type": "rating",
          "name": "p3",
          "title": "I am more of an improvisor than a planner.",
          "isRequired": true,
          "rateValues": [
            "Strongly Disagree",
            "Disagree",
            "Neutral",
            "Agree",
            "Strongly Agree"
          ]
        },
        {
          "type": "rating",
          "name": "p4",
          "title": "I don’t mind being the center of attention.",
          "isRequired": true,
          "rateValues": [
            "Strongly Disagree",
            "Disagree",
            "Neutral",
            "Agree",
            "Strongly Agree"
          ]
        },
        {
          "type": "rating",
          "name": "p5",
          "title": "I find it easy to talk about emotions.",
          "isRequired": true,
          "rateValues": [
            "Strongly Disagree",
            "Disagree",
            "Neutral",
            "Agree",
            "Strongly Agree"
          ]
        },
        {
          "type": "rating",
          "name": "p6",
          "title": "I tend to put myself first and others second.",
          "isRequired": true,
          "rateValues": [
            "Strongly Disagree",
            "Disagree",
            "Neutral",
            "Agree",
            "Strongly Agree"
          ]
        },
        {
          "type": "rating",
          "name": "p7",
          "title": "If I had a business, I would find it difficult to fire loyal but underperforming employees.",
          "isRequired": true,
          "rateValues": [
            "Strongly Disagree",
            "Disagree",
            "Neutral",
            "Agree",
            "Strongly Agree"
          ]
        },
        {
          "type": "rating",
          "name": "p8",
          "title": "I see myself as more of a compromiser than a fighter.",
          "isRequired": true,
          "rateValues": [
            "Strongly Disagree",
            "Disagree",
            "Neutral",
            "Agree",
            "Strongly Agree"
          ]
        },
        {
          "type": "rating",
          "name": "p9",
          "title": "I would describe my friends as imaginative and creative.",
          "isRequired": true,
          "rateValues": [
            "Strongly Disagree",
            "Disagree",
            "Neutral",
            "Agree",
            "Strongly Agree"
          ]
        },
        {
          "type": "rating",
          "name": "p10",
          "title": "Winning an argument matters more to me than making sure no one is upset.",
          "isRequired": true,
          "rateValues": [
            "Strongly Disagree",
            "Disagree",
            "Neutral",
            "Agree",
            "Strongly Agree"
          ]
        },
        {
          "type": "rating",
          "name": "p11",
          "title": "I like it when people always say what’s on their mind.",
          "isRequired": true,
          "rateValues": [
            "Strongly Disagree",
            "Disagree",
            "Neutral",
            "Agree",
            "Strongly Agree"
          ]
        },
        {
          "type": "rating",
          "name": "p12",
          "title": "I get anxious right before exams.",
          "isRequired": true,
          "rateValues": [
            "Strongly Disagree",
            "Disagree",
            "Neutral",
            "Agree",
            "Strongly Agree"
          ]
        },
        {
          "type": "rating",
          "name": "p13",
          "title": "I have the ability to change my mood quickly.",
          "isRequired": true,
          "rateValues": [
            "Strongly Disagree",
            "Disagree",
            "Neutral",
            "Agree",
            "Strongly Agree"
          ]
        },
        {
          "type": "rating",
          "name": "p14",
          "title": "I'd take a challenging (but interesting) class over an easy (but boring) class.",
          "isRequired": true,
          "rateValues": [
            "Strongly Disagree",
            "Disagree",
            "Neutral",
            "Agree",
            "Strongly Agree"
          ]
        },
        {
          "type": "rating",
          "name": "p15",
          "title": "When a friend is sad, I am more likely to offer solutions to the problem rather than emotional support.",
          "isRequired": true,
          "rateValues": [
            "Strongly Disagree",
            "Disagree",
            "Neutral",
            "Agree",
            "Strongly Agree"
          ]
        },
        {
          "type": "rating",
          "name": "p16",
          "title": "When I have a personal problem, I try to solve it on my own rather than talk to others.",
          "isRequired": true,
          "rateValues": [
            "Strongly Disagree",
            "Disagree",
            "Neutral",
            "Agree",
            "Strongly Agree"
          ]
        },
        {
          "type": "rating",
          "name": "p17",
          "title": "I enjoy debating with other people.",
          "isRequired": true,
          "rateValues": [
            "Strongly Disagree",
            "Disagree",
            "Neutral",
            "Agree",
            "Strongly Agree"
          ]
        },
        {
          "type": "rating",
          "name": "p18",
          "title": "I spend time exploring unrealistic but intriguing ideas.",
          "isRequired": true,
          "rateValues": [
            "Strongly Disagree",
            "Disagree",
            "Neutral",
            "Agree",
            "Strongly Agree"
          ]
        },
        {
          "type": "rating",
          "name": "p19",
          "title": "Personal style is important to me.",
          "isRequired": true,
          "rateValues": [
            "Strongly Disagree",
            "Disagree",
            "Neutral",
            "Agree",
            "Strongly Agree"
          ]
        },
        {
          "type": "panel",
          "name": "panel1",
          "elements": [
            {
              "type": "rating",
              "name": "introvert",
              "title": "I am...",
              "isRequired": true,
              "rateMax": 10,
              "minRateDescription": "Very introverted",
              "maxRateDescription": "Very extroverted"
            },
            {
              "type": "radiogroup",
              "name": "introvert_same",
              "indent": 3,
              "title": "I prefer my partner to be...",
              "isRequired": true,
              "choices": [
                {
                  "value": "same",
                  "text": "The same"
                },
                {
                  "value": "less",
                  "text": "Less extroverted"
                },
                {
                  "value": "more",
                  "text": "More extroverted"
                },
                {
                  "value": "doesnt_matter",
                  "text": "It doesn't matter"
                }
              ]
            }
          ]
        },
        {
          "type": "panel",
          "name": "panel3",
          "elements": [
            {
              "type": "rating",
              "name": "easygoing",
              "title": "I am...",
              "isRequired": true,
              "rateMax": 10,
              "minRateDescription": "Easygoing",
              "maxRateDescription": "Assertive"
            },
            {
              "type": "radiogroup",
              "name": "easygoing_same",
              "indent": 3,
              "title": "I prefer my partner to be...",
              "isRequired": true,
              "choices": [
                {
                  "value": "same",
                  "text": "The same"
                },
                {
                  "value": "less",
                  "text": "Less assertive"
                },
                {
                  "value": "more",
                  "text": "More assertive"
                },
                {
                  "value": "doesnt_matter",
                  "text": "It doesn't matter"
                }
              ]
            }
          ]
        },
      ]
    },
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
