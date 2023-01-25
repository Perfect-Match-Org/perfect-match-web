export const questions = {

  completedHtml:
    "<h3>Crushes Updated!</h3><br><h5>Share Perfect Match with your friends and/or on social media! The more participants we get, the more matches we can generate per person.</h5>",
  elements: [

    {
      type: "html",
      name: "disregard2",
      html: "Crush Match is an optional feature that allows you to indicate a Crush (or Crushes) to our algorithm by use of their NetID. If your Crush is crushing on you as well, the quiz will pair you together and make you a <strong>Perfect Match</strong>! And if not, don’t worry – no one will ever know your secret.\n",
    },
    {
      type: "matrixdynamic",
      addRowText: "Add Person",
      columnColCount: 0,
      title:
        "Name up to three Crushes. If you enter more than three, the extra ones will be discarded.",
      rowCount: 0,
      columns: [
        {
          cellType: "text",
          name: "netid",
          title: "NetID",
          isRequired: true,
          placeHolder: "abc123",
        },
      ],
    },
    {
      type: "html",
      name: "disregard2",
      html: "Forbidden Match is an optional feature that allows you to indicate any Cornellian (or Cornellians) that you don't want to be matched with – exes, friends, siblings, etc. Enter their NetID, and our algorithm will remove any possibilty of a match. Any NetIDs provided will be private\n",
    },
    {
      type: "matrixdynamic",
      name: "forbidden",
      addRowText: "Add Person",
      columnColCount: 0,
      title: "Enter up to 50 Forbidden Matches.",
      rowCount: 0,
      columns: [
        {
          cellType: "text",
          name: "netid",
          title: "NetID",
          isRequired: true,
          placeHolder: "abc123",
        },
      ],
    },
  ],
};
