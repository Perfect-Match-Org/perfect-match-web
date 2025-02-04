// components/survey/content/index.tsx

export const questions = {
    logoPosition: 'right',
    focusFirstQuestionAutomatic: false,
    checkErrorsMode: 'onValueChanged',
    completedHtml: '<h3>Survey Updated!<h3>',

    pages: [
        {
            name: 'Welcome',
            title: 'Perfect Match 2025',
            description: 'Elements marked <> will be shared with your matches.',

            elements: [
                {
                    type: 'panel',
                    name: 'social_media',
                    elements: [
                        {
                            type: 'multipletext',
                            name: 'contact',
                            title: '<> When we find your matches how do you want them to contact you? At least one social media link is required.',
                            validators: [
                                {
                                    type: 'expression',
                                    text: 'Please enter at least one method of contact',
                                    expression:
                                        '{contact.phone} notempty or {contact.insta} notempty or {contact.snapchat} notempty or {contact.wechat} notempty or {contact.fb} notempty or {contact.email} notempty or {contact.other} notempty',
                                },
                            ],
                            items: [
                                {
                                    name: 'phone',
                                    title: 'Phone number',
                                },
                                {
                                    name: 'insta',
                                    title: 'Instagram handle',
                                },
                                {
                                    name: 'snapchat',
                                    title: 'Snapchat username',
                                },
                                {
                                    name: 'wechat',
                                    title: 'WeChat username',
                                },
                                {
                                    name: 'fb',
                                    title: 'Facebook profile link',
                                },
                                {
                                    name: 'email',
                                    title: 'Email / GCal Invite',
                                },
                                {
                                    name: 'other',
                                    title: 'Other',
                                },
                            ],
                            colCount: 1,
                        },
                    ],
                },
            ],
        },
        {
            name: 'Cornell',
            title: 'Cornell',
            description: 'Elements marked <> will be shared with your matches.',

            elements: [
                {
                    type: 'radiogroup',
                    name: 'lockIn',
                    title: 'Best place to lock-in?',
                    isRequired: true,
                    choices: [
                        {
                            value: 'cocktail',
                            text: 'Cocktail Lounge',
                        },
                        {
                            value: 'olin',
                            text: 'Olin Stacks',
                        },
                        {
                            value: 'adwhite',
                            text: 'AD White',
                        },
                        {
                            value: 'mann',
                            text: 'Mann',
                        },
                        {
                            value: 'dorm',
                            text: 'My cozy dorm'
                        },
                    ],
                },
                {
                    type: 'radiogroup',
                    name: 'redFlagClub',
                    title: 'What club is the biggest red flag?',
                    isRequired: true,
                    choices: [
                        {
                            value: 'greeklife',
                            text: 'Greek life',
                        },
                        {
                            value: 'projectteam',
                            text: 'Engineering Project Team',
                        },
                        {
                            value: 'bizclub',
                            text: 'Business club / frat',
                        },
                        {
                            value: 'performance',
                            text: 'Performance-related club (dance, a capella, etc)',
                        },
                        {
                            value: 'perfectmatch',
                            text: 'Perfect Match Team'
                        },
                    ],
                },
                {
                    type: 'radiogroup',
                    name: 'worstFirstKiss',
                    title: 'Worst place to have your first kiss?',
                    isRequired: true,
                    choices: [
                        {
                            value: 'uris',
                            text: 'Uris G01 in a full lecture',
                        },
                        {
                            value: 'okenshields',
                            text: 'Okenshields wok line',
                        },
                        {
                            value: 'duffield',
                            text: 'Duffield during project team fest',
                        },
                        {
                            value: '7/11',
                            text: '7/11 after Level B',
                        },
                        {
                            value: 'barton',
                            text: 'Barton Hall during career fair'
                        },
                    ],
                },
                {
                    type: 'radiogroup',
                    name: 'task',
                    title: 'Next year, I want to complete this task (from 161 Things Every Cornellian Should Do)',
                    isRequired: true,
                    choices: [
                        {
                            value: 'bridge',
                            text: '“Kiss on the suspension bridge at midnight.”',
                        },
                        {
                            value: 'stacks',
                            text: '“Have sex in the stacks.”',
                        },
                        {
                            value: 'picnic',
                            text: '“Have a midnight picnic in the Ag Quad”',
                        },
                        {
                            value: 'ra',
                            text: '“Drink with your R.A.”',
                        },
                    ],
                },
                {
                    type: 'radiogroup',
                    name: 'hill',
                    title: 'What Cornell hill would you die on?',
                    isRequired: true,
                    choices: [
                        {
                            value: 'slopeday',
                            text: 'Slope day isn’t worth the hype',
                        },
                        {
                            value: 'terrace',
                            text: 'Terrace is overrated',
                        },
                        {
                            value: 'bizvsstem',
                            text: 'Business is harder than STEM',
                        },
                        {
                            value: 'okenshields',
                            text: 'Okenshields is the best dining hall',
                        },
                    ],
                },
                {
                    type: 'radiogroup',
                    name: 'bathroom',
                    title: 'Top-tier, shit-worthy bathroom?',
                    isRequired: true,
                    hasOther: true,
                    choices: [
                        {
                            value: 'uris',
                            text: 'Uris'
                        },
                        {
                            value: 'psb',
                            text: 'PSB'
                        },
                        {
                            value: 'tang',
                            text: 'Tang'
                        },
                        {
                            value: 'mvr',
                            text: "MVR"
                        },
                        {
                            value: 'own',
                            text: 'My own...'
                        }
                    ]
                },
                {
                    type: 'radiogroup',
                    name: 'olinVsUris',
                    title: 'Olin or Uris?',
                    isRequired: true,
                    choices: [
                        {
                            value: 'olin',
                            text: 'Olin',
                        },
                        {
                            value: 'uris',
                            text: 'Uris',
                        }
                    ],
                },
                {
                    type: 'radiogroup',
                    name: 'northVsWest',
                    title: 'North or West?',
                    isRequired: true,
                    choices: [
                        {
                            value: 'north',
                            text: 'North',
                        },
                        {
                            value: 'west',
                            text: 'West',
                        }
                    ],
                },
                {
                    type: 'radiogroup',
                    name: 'trilliumOrTerrace',
                    title: 'Trillium or Terrace?',
                    isRequired: true,
                    choices: [
                        {
                            value: 'trillium',
                            text: 'Trillium',
                        },
                        {
                            value: 'terrace',
                            text: 'Terrace',
                        }
                    ],
                },
                {
                    type: 'radiogroup',
                    name: 'celciusOrCoffee',
                    title: 'Celsius or Coffee?',
                    isRequired: true,
                    choices: [
                        {
                            value: 'celsius',
                            text: 'Celsius',
                        },
                        {
                            value: 'coffee',
                            text: 'Coffee',
                        }
                    ],
                },
                {
                    type: 'radiogroup',
                    name: 'walkOrBus',
                    title: 'Walk or Bus?',
                    isRequired: true,
                    choices: [
                        {
                            value: 'walk',
                            text: 'Walk',
                        },
                        {
                            value: 'bus',
                            text: 'Bus',
                        }
                    ],
                },
                {
                    type: 'radiogroup',
                    name: 'fallOrSpring',
                    title: 'Fall Semester or Spring Semester?',
                    isRequired: true,
                    choices: [
                        {
                            value: 'fall',
                            text: 'Fall',
                        },
                        {
                            value: 'spring',
                            text: 'Spring',
                        }
                    ],
                },
            ],
        },
        {
            name: 'Interests',
            elements: [
                {
                    type: 'html',
                    name: 'disclaimer',
                    html: '<br><span style = "font-size:16px"><strong>Note: Questions marked with a "<>" may be shared with your matches. All other information will remain private and confidential</strong></span>',
                },
                {
                    type: 'checkbox',
                    name: 'interests',
                    title: '<> I am passionate about... (Select your top 3, and feel free to elaborate on them in your bio!)',
                    maxSelectedChoices: 3,
                    isRequired: true,
                    choices: [
                        {
                            value: 'travel',
                            text: 'Travel',
                        },
                        {
                            value: 'tech',
                            text: 'Science/Tech',
                        },
                        {
                            value: 'music',
                            text: 'Music',
                        },
                        {
                            value: 'art',
                            text: 'Art',
                        },
                        {
                            value: 'fitness',
                            text: 'Fitness',
                        },
                        {
                            value: 'literature',
                            text: 'Literature/Reading',
                        },
                        {
                            value: 'food',
                            text: 'Food',
                        },
                        {
                            value: 'film',
                            text: 'Entertainment and film',
                        },
                        {
                            value: 'sports',
                            text: 'Sports',
                        },
                        {
                            value: 'games',
                            text: 'Games',
                        },
                    ],
                },
                {
                    type: 'checkbox',
                    name: 'music',
                    title: 'Favorite Music Genre(s): [can check all that apply]',
                    isRequired: true,
                    choices: [
                        {
                            value: 'pop',
                            text: 'Pop',
                        },
                        {
                            value: 'rock',
                            text: 'Rock',
                        },
                        {
                            value: 'indie',
                            text: 'Indie',
                        },
                        {
                            value: 'rap',
                            text: 'Rap',
                        },
                        {
                            value: 'jazz',
                            text: 'Jazz',
                        },
                        {
                            value: 'blues',
                            text: 'Blues',
                        },
                        {
                            value: 'reggaeton',
                            text: 'Reggaeton',
                        },
                        {
                            value: 'rAndB',
                            text: 'R&B',
                        },
                        {
                            value: 'classical',
                            text: 'Classical',
                        },
                        {
                            value: 'kpop',
                            text: 'K-pop',
                        },
                        {
                            value: 'edm',
                            text: 'EDM',
                        },
                        {
                            value: 'afrobeat',
                            text: 'Afrobeat',
                        },
                        {
                            value: 'house',
                            text: 'House',
                        },
                        {
                            value: 'country',
                            text: 'Country',
                        },
                    ],
                },
                {
                    name: 'hookupsong',
                    isRequired: false,

                    type: 'text',
                    title: 'The most recent song on my hook-up playlist is…',
                },
            ],
        },
        {
            name: 'Relationship Tendencies',
            elements: [
                {
                    type: 'radiogroup',
                    name: 'tv',
                    title: 'Which of these recent shows will you binge-watch with your match?',
                    isRequired: true,
                    choices: [
                        {
                            value: 'squid',
                            text: 'Squid Game',
                        },
                        {
                            value: 'singlesInferno',
                            text: 'Singles Inferno',
                        },
                        {
                            value: 'xoKitty',
                            text: 'XO Kitty',
                        },
                        {
                            value: 'himym',
                            text: 'How I Met Your Mother',
                        },
                        {
                            value: 'breakingBad',
                            text: 'Breaking Bad',
                        },
                        {
                            value: 'gameOfThrones',
                            text: 'Game of Thrones',
                        },
                        {
                            value: 'jjk',
                            text: 'Jujutsu Kaisen',
                        },
                    ],
                },
                {
                    type: 'radiogroup',
                    name: 'date',
                    title: 'Where would you go on a first date?',
                    isRequired: true,
                    choices: [
                        {
                            value: 'farm',
                            text: 'Indian Creek Farm',
                        },
                        {
                            value: 'catCafe',
                            text: 'Alley Cat Cafe',
                        },
                        {
                            value: 'market',
                            text: 'Farmer\'s Market',
                        },
                        {
                            value: 'gorge',
                            text: 'Gorge Walk',
                        },
                        {
                            value: 't&b',
                            text: 'Thompson and Bleeker',
                        },
                        {
                            value: 'levelb',
                            text: 'Level B',
                        },
                    ],
                },
                {
                    type: 'radiogroup',
                    name: 'whopays',
                    title: 'Would you prefer that your match ___ on the first date',
                    isRequired: true,
                    choices: [
                        {
                            value: 'pays',
                            text: 'Pays',
                        },
                        {
                            value: 'splits',
                            text: 'Splits',
                        },
                        {
                            value: 'youpay',
                            text: 'Lets you pay',
                        },
                        {
                            value: 'doesntmatter',
                            text: "It doesn't matter",
                        },
                    ],
                },
                {
                    type: 'radiogroup',
                    name: 'ick',
                    title: 'What’s your biggest ick in a relationship?',
                    isRequired: true,
                    choices: [
                        //Owns Spiritual Crystals, Bad Tipper, From Westchester, Claps when the plane lands, Calls their favorite sports team ‘we’
                        {
                            value: 'crystals',
                            text: 'Owns Spiritual Crystals',
                        },
                        {
                            value: 'tipper',
                            text: 'Bad Tipper',
                        },
                        {
                            value: 'westchester',
                            text: 'From Westchester',
                        },
                        {
                            value: 'plane',
                            text: 'Claps when the plane lands',
                        },
                        {
                            value: 'sportsteam',
                            text: 'Calls their favorite sports team \'we\'',
                        },
                    ],
                },
                {
                    type: 'radiogroup',
                    name: 'greenflag',
                    title: 'What’s the biggest green flag you look for in a partner?',
                    isRequired: true,
                    choices: [
                        {
                            value: 'gcaldate',
                            text: 'Send you a GCal invite for the date',
                        },
                        {
                            value: 'petlike',
                            text: 'Your pet likes them',
                        },
                        {
                            value: 'screentime',
                            text: 'Low screen time',
                        },
                        {
                            value: 'smellsgood',
                            text: 'Smells good',
                        },
                        {
                            value: 'gymrat',
                            text: 'Gym goer',
                        },
                        {
                            value: 'kids',
                            text: 'Good with kids',
                        },
                        {
                            value: 'gpa',
                            text: '4.0 GPA',
                        },
                    ],
                },
                {
                    type: 'radiogroup',
                    name: 'lovelanguage',
                    title: 'What\'s your most important love language?',
                    isRequired: true,
                    choices: [
                        {
                            value: 'acts',
                            text: 'Acts of service',
                        },
                        {
                            value: 'quality',
                            text: 'Quality time',
                        },
                        {
                            value: 'gifts',
                            text: 'Receiving gifts',
                        },
                        {
                            value: 'touch',
                            text: 'Physical touch',
                        },
                        {
                            value: 'words',
                            text: 'Words of affirmation',
                        },
                        {
                            value: 'unsure',
                            text: 'Not sure',
                        },
                    ],
                },
            ],
        },
        {
            name: 'General Tendencies',
            elements: [
                {
                    type: 'dropdown',
                    name: 'sleeptime',
                    title: 'What time do you go to bed?',
                    isRequired: true,
                    choices: ['6pm', '7pm', '8pm', '9pm', '10pm', '11pm', '12am', '1am', '2am', '3am', '4am', '5am', '6am'],
                },
                {
                    type: 'dropdown',
                    name: 'waketime',
                    title: 'What time do you wake up?',
                    isRequired: true,
                    choices: [
                        '3am',
                        '4am',
                        '5am',
                        '6am',
                        '7am',
                        '8am',
                        '9am',
                        '10am',
                        '11am',
                        '12pm',
                        '1pm',
                        '2pm',
                        '3pm',
                    ],
                },
                {
                    type: 'radiogroup',
                    name: 'plans',
                    title: 'Your plans get messed up for the day. You would...?',
                    isRequired: true,
                    choices: [
                        {
                            value: 'shift',
                            text: 'Shift your day’s schedule',
                        },
                        {
                            value: 'flow',
                            text: 'Go with the flow',
                        },
                        {
                            value: 'cancel',
                            text: 'Cancel all your plans',
                        },
                        {
                            value: 'new',
                            text: 'Contact someone to make entirely new plans',
                        },
                    ],
                },
                {
                    type: 'checkbox',
                    name: 'humor',
                    title: 'My sense of humor is...',
                    isRequired: true,
                    choices: [
                        {
                            value: 'pranks',
                            text: 'Planning pranks',
                        },
                        {
                            value: 'sarcastic',
                            text: 'Sarcastic',
                        },
                        {
                            value: 'puns',
                            text: 'Punny',
                        },
                        {
                            value: 'deprecating',
                            text: 'Self-deprecating',
                        },
                        {
                            value: 'improv',
                            text: 'Committing to the bit',
                        },
                        {
                            value: 'references',
                            text: 'Pop culture references',
                        },
                        {
                            value: 'darkhumor',
                            text: 'Dark humor'
                        }
                    ],
                },
                {
                    type: 'checkbox',
                    name: 'sociability',
                    title: 'Which of these phrases resonate with you? (Check all that apply)',
                    isRequired: true,
                    hasNone: true,
                    choices: [
                        {
                            value: 'party',
                            text: 'I like parties',
                        },
                        {
                            value: 'activities',
                            text: 'I enjoy laid-back activities',
                        },
                        {
                            value: 'in_touch',
                            text: 'I\'m not on social media',
                        },
                        {
                            value: 'popular',
                            text: 'I consider myself to be popular',
                        },
                        {
                            value: 'canceled',
                            text: 'I secretly cheer when my plans get cancelled'
                        },
                        {
                            value: 'homebody',
                            text: 'I\'m a homebody'
                        }
                    ],
                },
            ],
        },
        {
            name: 'Personality',
            elements: [
                {
                    type: 'rating',
                    name: 'p1',
                    title: 'Most of my time is spent with the same group of friends.',
                    isRequired: true,
                    rateValues: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
                },
                {
                    type: 'rating',
                    name: 'p2',
                    title: 'I like people who always seek adventure.',
                    isRequired: true,
                    rateValues: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
                },
                {
                    type: 'rating',
                    name: 'p3',
                    title: 'I am more of an improvisor than a planner.',
                    isRequired: true,
                    rateValues: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
                },
                {
                    type: 'rating',
                    name: 'p4',
                    title: 'I don’t mind being the center of attention.',
                    isRequired: true,
                    rateValues: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
                },
                {
                    type: 'rating',
                    name: 'p5',
                    title: 'I tend to put myself first and others second.',
                    isRequired: true,
                    rateValues: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
                },

                {
                    type: 'rating',
                    name: 'p6',
                    title: 'I see myself as more of a compromiser than a fighter.',
                    isRequired: true,
                    rateValues: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
                },
                {
                    type: 'rating',
                    name: 'p7',
                    title: 'I like it when people always say what’s on their mind.',
                    isRequired: true,
                    rateValues: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
                },
                {
                    type: 'rating',
                    name: 'p8',
                    title: "I'd take a challenging (but interesting) class over an easy (but boring) class.",
                    isRequired: true,
                    rateValues: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
                },
                {
                    type: 'rating',
                    name: 'p9',
                    title: 'When a friend is sad, I am more likely to offer solutions to the problem rather than emotional support.',
                    isRequired: true,
                    rateValues: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
                },
                {
                    type: 'rating',
                    name: 'p10',
                    title: 'When I have a personal problem, I try to solve it on my own rather than talk to others.',
                    isRequired: true,
                    rateValues: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
                },
                {
                    type: 'rating',
                    name: 'p11',
                    title: 'I spend time exploring unrealistic but intriguing ideas.',
                    isRequired: true,
                    rateValues: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
                },
                {
                    type: 'radiogroup',
                    name: 'generalPersonality',
                    title: 'In general, I want my matches to be...',
                    isRequired: true,
                    choices: [
                        {
                            value: 'simlar',
                            text: 'More different to me in personality',
                        },
                        {
                            value: 'different',
                            text: 'More similar to me in personality',
                        },
                        {
                            value: 'either',
                            text: 'Either',
                        },
                    ],
                },
                {
                    type: 'panel',
                    name: 'panel1',
                    elements: [
                        {
                            type: 'rating',
                            name: 'introvert',
                            title: 'I am...',
                            isRequired: true,
                            rateMax: 10,
                            minRateDescription: 'Very introverted',
                            maxRateDescription: 'Very extroverted',
                        },
                        {
                            type: 'radiogroup',
                            name: 'introvert_same',
                            indent: 3,
                            title: 'I prefer my partner to be...',
                            isRequired: true,
                            choices: [
                                {
                                    value: 'same',
                                    text: 'The same',
                                },
                                {
                                    value: 'less',
                                    text: 'Less extroverted',
                                },
                                {
                                    value: 'more',
                                    text: 'More extroverted',
                                },
                                {
                                    value: 'doesnt_matter',
                                    text: "It doesn't matter",
                                },
                            ],
                        },
                    ],
                },
                {
                    type: 'panel',
                    name: 'panel2',
                    elements: [
                        {
                            type: 'rating',
                            name: 'easygoing',
                            title: 'I am...',
                            isRequired: true,
                            rateMax: 10,
                            minRateDescription: 'Easygoing',
                            maxRateDescription: 'Assertive',
                        },
                        {
                            type: 'radiogroup',
                            name: 'easygoing_same',
                            indent: 3,
                            title: 'I prefer my partner to be...',
                            isRequired: true,
                            choices: [
                                {
                                    value: 'same',
                                    text: 'The same',
                                },
                                {
                                    value: 'less',
                                    text: 'Less assertive',
                                },
                                {
                                    value: 'more',
                                    text: 'More assertive',
                                },
                                {
                                    value: 'doesnt_matter',
                                    text: "It doesn't matter",
                                },
                            ],
                        },
                    ],
                },
                {
                    type: 'radio',
                    name: 'whySingle',
                    isRequired: true,
                    choices: [
                        {
                            value: 'soulmate',
                            text: 'I haven’t found my soul mate yet'
                        },
                        {
                            value: 'commitment',
                            text: '#commitmentissues'
                        },
                        {
                            value: 'lockedIn',
                            text: 'Too locked in'
                        },
                        {
                            value: 'noRizz',
                            text: 'No rizz'
                        },
                        {
                            value: 'idk',
                            text: 'Idk man'
                        }
                    ]
                }
            ],
        },
        {
            name: 'Finale',
            elements: [
                {
                    type: 'text',
                    name: 'numdated',
                    isRequired: true,

                    title: 'How many people have you dated in the last 5 years?',
                    validators: [
                        {
                            type: 'numeric',
                            text: '',
                            minValue: 0,
                            maxValue: 200,
                        },
                    ],
                },
                {
                    type: 'text',
                    name: 'longestrelationship',
                    title: 'How many months was your longest relationship? (put 0 if not applicable)',
                    requiredErrorText: 'You answer must be between 0 and 300',
                    isRequired: true,
                    validators: [
                        {
                            type: 'numeric',
                            text: '',
                            minValue: 0,
                            maxValue: 300,
                        },
                    ],
                },
                {
                    type: 'dropdown',
                    name: 'ricePurity',
                    title: 'What is your <a style="color: #f7a4af" href="https://ricepuritytest.com"><u>Rice Purity Score?</u></a>',
                    isRequired: true,
                    choices: ['0-20', '21-40', '41-60', '61-80', '81-100', 'Skip'],
                },
                // {
                //     type: 'checkbox',
                //     name: 'apps',
                //     title: 'What dating apps do you use',
                //     hasNone: true,

                //     isRequired: true,
                //     choices: [
                //         {
                //             value: 'tinder',
                //             text: 'Tinder',
                //         },
                //         {
                //             value: 'bumble',
                //             text: 'Bumble',
                //         },
                //         {
                //             value: 'grindr',
                //             text: 'Grindr',
                //         },
                //         {
                //             value: 'hinge',
                //             text: 'Hinge',
                //         },
                //     ],
                // },
                {
                    type: 'rating',
                    name: 'politics',
                    title: 'What are your political tendencies?',
                    rateMax: 10,
                    isRequired: true,
                    minRateDescription: 'Left',
                    maxRateDescription: 'Right',
                },
                {
                    type: 'rating',
                    name: 'politically_active',
                    title: 'I consider myself politically active.',
                    isRequired: true,
                    minRateDescription: 'Very inactive',
                    maxRateDescription: 'Very active',
                },
                {
                    type: 'matrix',
                    name: 'habits',
                    title: 'How often do you use the following?',
                    columns: [
                        {
                            value: 'never',
                            text: 'Never',
                        },
                        {
                            value: 'rarely',
                            text: 'Rarely',
                        },
                        {
                            value: 'sometimes',
                            text: 'Monthly',
                        },
                        {
                            value: 'often',
                            text: 'Weekly',
                        },
                        {
                            value: 'very_frequently',
                            text: 'Daily',
                        },
                    ],
                    rows: [
                        {
                            value: 'drinking',
                            text: 'Alcohol',
                        },
                        {
                            value: 'smoking',
                            text: 'Cigarettes/E-cigs',
                        },
                        {
                            value: 'zyns',
                            text: 'Nicotine Pouches (e.g. Zyns)',
                        },
                        {
                            value: 'weed',
                            text: 'Marijuana',
                        },
                        {
                            value: 'other',
                            text: 'Other drugs',
                        },
                    ],
                },
                {
                    type: 'matrix',
                    name: 'partner_habits',
                    title: 'At MAXIMUM, how often is it okay for your partner to use the following?',
                    columns: [
                        {
                            value: 'never',
                            text: 'Never',
                        },
                        {
                            value: 'rarely',
                            text: 'Rarely',
                        },
                        {
                            value: 'sometimes',
                            text: 'Monthly',
                        },
                        {
                            value: 'often',
                            text: 'Weekly',
                        },
                        {
                            value: 'dont_care',
                            text: "Don't care",
                        },
                    ],
                    rows: [
                        {
                            value: 'drinking',
                            text: 'Alcohol',
                        },
                        {
                            value: 'smoking',
                            text: 'Cigarettes/E-cigs ',
                        },
                        {
                            value: 'zyns',
                            text: 'Nicotine Pouches (e.g. Zyns)',
                        },
                        {
                            value: 'weed',
                            text: 'Marijuana',
                        },
                        {
                            value: 'other',
                            text: 'Other drugs',
                        },
                    ],
                },
                {
                    type: 'checkbox',
                    name: 'deal_breakers',
                    title: 'What is deal breaker for you? (Check all that apply)',
                    isRequired: true,
                    choices: [
                        {
                            value: 'politics',
                            text: 'Difference in political views',
                        },
                        {
                            value: 'religion',
                            text: 'Difference in religious views',
                        },
                        {
                            value: 'social',
                            text: 'Difference in social habits',
                        },
                    ],
                    hasNone: true,
                },
                {
                    type: 'html',
                    name: 'disregard1',
                    html: 'Disclaimer: <br><i>Perfect Match does not take any responsibility and is not liable for any distress caused through the use of our service. By responding to this form, you are giving Perfect Match the right to process your data and match you with another individual at Cornell. Perfect Match takes precautions to protect your privacy and to keep your information secure. We strive to be transparent in the way we process your data. Please see our <a href="/about" style="color: #24438d" target="_blank"><u>about page</u></a> for more information.</i>',
                },
            ],
        },
    ],
    showProgressBar: 'top',
    progressBarType: 'buttons',
    completeText: 'Submit',
    showPreviewBeforeComplete: 'showAllQuestions',
    showQuestionNumbers: false,
    widthMode: 'static',
    width: '1200px',
};
