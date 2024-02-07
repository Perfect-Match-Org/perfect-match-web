export const questions = {
    completedHtml: '<h3>Crushes Updated!</h3>',
    elements: [
        {
            type: 'html',
            name: 'disregard2',
            html: "Have a crush on campus? Let us be your Cupid! Our unique Crush Match feature uses an algorithm that's all about making sparks fly. Just enter your Crush's NetID, and if they feel the same way (put you as their crush), voila! – it's a <b>Perfect Match</b>! And if not, don't worry - no one will ever know your secret. <br><br> But what if your crush hasn't filled out the survey? Fear not! We've got a new secret weapon this year.<br><br><b>Do You Want to Nudge Your Crush?</b><br><br>We get it – sometimes crushes need a little push. If you're not sure your crush will participate, we can send them a sweet anonymous nudge. It's a simple, \"Hey, someone's thinking of you!\" – a prompt to fill out the survey and find out who their secret admirer is. Romance could be just a survey away!",
        },
        {
            type: 'matrixdynamic',
            name: 'crushes',
            addRowText: 'Add Person',
            columnColCount: 0,
            title: 'Name up to five Crushes!',
            rowCount: 0,
            maxRowCount: 5,
            columns: [
                {
                    cellType: 'text',
                    name: 'netid',
                    title: 'NetID',
                    isRequired: true,
                    placeHolder: 'abc123',
                },
                {
                    cellType: 'radiogroup',
                    name: 'reachout',
                    title: '💌 Should we send your crush an anonymous hint?',
                    isRequired: true,
                    choices: [
                        {
                            value: 'yes',
                            text: 'Yes, please. Maybe a little hint is just what they need.',
                        },
                        {
                            value: 'no',
                            text: "No, I actually want to stay single for Valentine's Day.",
                        },
                    ],
                },
            ],
        },
        {
            type: 'matrixdynamic',
            name: 'forbidden',
            addRowText: 'Add Person',
            columnColCount: 0,
            title: 'Enter up to 50 Forbidden Matches.',
            description:
                "Forbidden Match is an optional feature that allows you to indicate any Cornellian (or Cornellians) that you don't want to be matched with. Slide in those NetIDs you'd rather not match with—exes, pals, family—and we'll make sure they're nowhere near your love lottery. It's quick, discreet, and between us.",
            rowCount: 0,
            maxRowCount: 50,
            columns: [
                {
                    cellType: 'text',
                    name: 'netid',
                    title: 'NetID',
                    isRequired: true,
                    placeHolder: 'abc123',
                },
            ],
        },
    ],
};
