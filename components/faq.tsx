class About {

    render() {

        const data = {
            title: `FAQ`,
            rows: [
                {
                    title: "What is Perfect Match?",
                    content: `Perfect Match is a matchmaking quiz ideated in February 2019. Our machine learning algorithm uses your survey to pair you with other Cornell students— your Perfect Matches! Last year, we had over 4,200 participants. Share the link with your friends, and help spread some joy in 2022!`
                },
                {
                    title: "When will the survey close?",
                    content: "We stop accepting responses at 11:59PM EST on February 12. Results will be released soon after the deadline passes."
                },
                {
                    title: "Can I change my information after I submit the survey?",
                    content: "Yes! Log back into the site at any time before the deadline, and you will be able to edit your answers and your profile through your dashboard."
                },
                {
                    title: "How many matches will I get?",
                    content: "Most participants get between 4 and 7 matches."
                },
                {
                    title: "What should I do when I receive my Matches?",
                    content: `It’s up to you! Contact your Matches in any way you’d like. We will provide some suggestions for how to connect when matches are released.`
                },
                {
                    title: "What algorithm does Perfect Match use?",
                    content: `The Perfect Match algorithm can be broken into two parts: scoring and matching. First, we use our machine learning algorithm to score compatability between you and all other participants who satisfy your main criteria, as determined by your responses. We then use a variant of the Hungarian algorithm to generate optimal matches based on these scores.`
                },
                {
                    title: "What happens to my data?",
                    content: `Your data is safe with us! We will never share your data with a third party, and we will only interact with your information as needed to resolve user issues. We may collect anonymous statistics to improve our algorithm, but your identity will always be separated from such reports.`
                }
            ]
        }

        const styles = {
            bgColor: 'white',
            titleTextColor: '#444444',
            rowTitleColor: 'black',
            rowContentColor: '#555555'
        }
        return (
            <div className={ }>



                <br></br>

                {/* <h1 className={classes.aboutHeader}>About</h1> */}
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <div className={ }>
                    <p>Contact Us:</p>
                    <p>Any burning questions? Check out our <a style={{ color: "#FB6466" }} href="https://www.reddit.com/r/Cornell/comments/si84vm/perfect_match_2022_launch_and_ama/" target="_blank">Reddit AMA</a>.</p>
                    <p>Be sure to follow us on <a style={{ color: "#FB6466" }} href="https://www.instagram.com/cornellperfectmatch/" target="_blank">Instagram!</a> We'll respond to any DMs.</p>
                    <p>Contact us through email at <a style={{ color: "#FB6466" }} href="mailto:cornell.perfectmatch@gmail.com">cornell.perfectmatch@gmail.com</a>.</p>
                    <br></br>
                </div>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
            </div>
        );
    }
}

export default About;
