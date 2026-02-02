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
                                        '{contact.phone} notempty or {contact.insta} notempty or {contact.snapchat} notempty or {contact.wechat} notempty or {contact.text} notempty or {contact.whatsapp} notempty or {contact.other} notempty',
                                },
                            ],
                            items: [
                                {
                                    name: 'phone',
                                    title: 'Phone',
                                },
                                {
                                    name: 'text',
                                    title: 'Text',
                                },
                                {
                                    name: 'insta',
                                    title: 'Instagram',
                                },
                                {
                                    name: 'snapchat',
                                    title: 'Snapchat',
                                },
                                {
                                    name: 'wechat',
                                    title: 'WeChat',
                                },
                                {
                                    name: 'whatsapp',
                                    title: 'WhatsApp'
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
                    name: 'nicheRedFlag',
                    title: 'Biggest niche Cornell red flag?',
                    isRequired: true,
                    choices: [
                        {
                            value: 'zeus',
                            text: 'Only hangs out at Zeus',
                        },
                        {
                            value: 'perfmale',
                            text: 'Attended the performative male contest',
                        },
                        {
                            value: 'moonclub',
                            text: 'Runs the Moon Club',
                        },
                        {
                            value: 'bouncers',
                            text: 'Knows all the CTown bouncers by name',
                        },
                    ],
                },
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
                            text: 'My cozy room'
                        },
                    ],
                },
                {
                    type: 'radiogroup',
                    name: 'greenFlagClub',
                    title: 'What club is the biggest green flag?',
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
                    name: 'cornellIck',
                    title: 'Which sentence would give you the ick immediately?',
                    isRequired: true,
                    choices: [
                        {
                            value: 'busy',
                            text: '“I’m just really busy this week with prelims(?)”',
                        },
                        {
                            value: 'coffeechat',
                            text: '“Let’s move our date, I have a coffee chat”',
                        },
                        {
                            value: 'labels',
                            text: '“I don’t really believe in labels”',
                        },
                        {
                            value: 'outofhere',
                            text: '“I can’t wait to get out of here”',
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
                            value: 'prof',
                            text: '“Flirt with your professor”',
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
                    type: 'checkbox',
                    name: 'favActivity',
                    title: 'Favorite activities on campus?',
                    isRequired: true,
                    choices: [
                        {
                            value: 'climbing',
                            text: '🧗 at Lindseth Climbing Center',
                        },
                        {
                            value: 'badminton',
                            text: '🏸 at Helen Newman',
                        },
                        {
                            value: 'skating',
                            text: 'Ice ⛸️ at Lynah Rink',
                        },
                        {
                            value: 'tennis',
                            text: '🎾 on McClintock Courts',
                        },
                        {
                            value: 'bowling',
                            text: '🎳 at Helen Newman'
                        },
                        {
                            value: 'volleyball',
                            text: 'Beach 🏐on Dickson courts'
                        },
                        {
                            value: 'movie',
                            text: 'I’d rather stay in the lounge and watch a movie!'
                        }
                    ],
                },
                {
                    type: 'radiogroup',
                    name: 'biggestRedFlag',
                    title: 'Biggest red flag?',
                    isRequired: true,
                    choices: [
                        {
                            value: 'latenight',
                            text: 'Only texts after 11pm',
                        },
                        {
                            value: 'ex',
                            text: 'Mentions their ex on the first date',
                        },
                        {
                            value: 'friends',
                            text: '“Forgets” to introduce you to friends',
                        },
                        {
                            value: 'disappears',
                            text: 'Disappears during prelim week',
                        },
                        {
                            value: 'public',
                            text: 'Sees you in public and pretends not to'
                        },
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
                    name: 'favSong',
                    isRequired: false,

                    type: 'text',
                    title: 'My favorite song right now is…',
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
                            value: 'stranger',
                            text: 'Stranger Things',
                        },
                        {
                            value: 'severance',
                            text: 'Severance',
                        },
                        {
                            value: 'singlesInferno',
                            text: 'Single’s Inferno',
                        },
                        {
                            value: 'knight',
                            text: 'A Knight of the Seven Kingdoms',
                        },
                        {
                            value: 'office',
                            text: 'The Office',
                        },
                        {
                            value: 'rivalry',
                            text: 'Heated Rivalry',
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
                        {
                            value: 'greekpeak',
                            text: 'Greek Peak',
                        }
                    ],
                },
                {
                    type: 'radiogroup',
                    name: 'whopays',
                    title: 'Who pays on the first date?',
                    isRequired: true,
                    choices: [
                        {
                            value: 'pays',
                            text: 'Your date',
                        },
                        {
                            value: 'splits',
                            text: 'Split',
                        },
                        {
                            value: 'youpay',
                            text: 'You',
                        },
                        {
                            value: 'doesntmatter',
                            text: "It doesn't matter",
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
                            value: 'details',
                            text: 'Remembers the small details about you',
                        },
                        {
                            value: 'friends',
                            text: 'Gets along with your friends',
                        },
                        {
                            value: 'ambitions',
                            text: 'Has goals and ambitions',
                        },
                        {
                            value: 'stupid',
                            text: 'Not afraid of looking stupid',
                        },
                        {
                            value: 'strangers',
                            text: 'Kind to strangers',
                        },
                    ],
                },
                {
                    type: 'radiogroup',
                    name: 'lovelanguage',
                    title: 'How do you like to receive affection?',
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
                {
                    type: 'radiogroup',
                    name: 'showlovelanguage',
                    title: 'How do you like to show affection? ',
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
                {
                    type: 'radiogroup',
                    name: 'romanceTrope',
                    title: 'What’s your favorite romance trope?',
                    isRequired: true,
                    choices: [
                        {
                            value: 'enemies',
                            text: 'Enemies to lovers',
                        },
                        {
                            value: 'fake',
                            text: 'Fake dating',
                        },
                        {
                            value: 'triangle',
                            text: 'Love triangle',
                        },
                        {
                            value: 'childhood',
                            text: 'Childhood friends to lovers',
                        },
                        {
                            value: 'step',
                            text: 'Step siblings',
                        },
                        {
                            value: 'vanilla',
                            text: 'Vanilla romance',
                        },
                    ],
                },
                {
                    type: 'radiogroup',
                    name: 'lastRelationship',
                    title: 'How did your last relationship go?',
                    isRequired: true,
                    choices: [
                        {
                            value: 'longterm',
                            text: 'We broke up because of long term incompatibility',
                        },
                        {
                            value: 'toxic',
                            text: 'We hate each other',
                        },
                        {
                            value: 'casual',
                            text: 'It wasn’t that deep',
                        },
                        {
                            value: 'neverdated',
                            text: 'I’ve never dated',
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
                        },
                        {
                            value: "notsingle",
                            text: "I'm not single"
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
                    name: 'sexualPartners',
                    title: 'How many sexual partners have you had?',
                    requiredErrorText: 'You answer must be between 0 and 300',
                    isRequired: false,
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
                {
                    type: 'matrix',
                    name: 'politicalViews',
                    title: 'Rate your political tendencies (1-10)',
                    columns: [
                        { value: 1, text: '1' },
                        { value: 2, text: '2' },
                        { value: 3, text: '3' },
                        { value: 4, text: '4' },
                        { value: 5, text: '5' },
                        { value: 6, text: '6' },
                        { value: 7, text: '7' },
                        { value: 8, text: '8' },
                        { value: 9, text: '9' },
                        { value: 10, text: '10' },
                    ],
                    rows: [
                        {
                            value: 'view',
                            text: 'Left (1) to Right (10)',
                        },
                        {
                            value: 'social',
                            text: 'Socially liberal (1) to conservative (10)',
                        },
                        {
                            value: 'activity',
                            text: 'How politically active are you (1 is lowest, 10 is highest)?',
                        },
                        {
                            value: 'cornellImpact',
                            text: 'How much has Cornell affected your political opinions (1 is lowest, 10 is highest)?',
                        },
                    ],
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
                        {
                            value: 'intimate',
                            text: 'Number of intimate partners',
                        },
                        {
                            value: 'broke',
                            text: 'Being financially broke',
                        },
                        {
                            value: 'height',
                            text: 'Height',
                        },
                        {
                            value: 'fitness',
                            text: 'Fitness level',
                        },
                        {
                            value: 'distance',
                            text: 'Long distance',
                        },
                        {
                            value: 'porn',
                            text: 'Watches porn',
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
