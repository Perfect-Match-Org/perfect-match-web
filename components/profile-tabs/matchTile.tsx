function MatchTile({ matchData, contact }: any) {
    const emoji = ['😃', '😆', '😄', '😆', '😊', '😎', '😳'];
    const color = ['text-rose-400', 'text-orange-400', 'text-yellow-400', 'text-lime-500', 'text-emerald-400', 'text-sky-400', 'text-purple-400'];
    return (
        <div className="grid gap-8 mb-6 lg:mb-16 md:grid-cols-1">
            <div className="items-center rounded-lg shadow-lg sm:flex mx-[1%] sm:mx-[6%] lg:mx-[12%]">
                <div className="flex sm:contents">
                    <div className="text-8xl mt-4 sm:mt-0 sm:text-9xl mx-auto sm:ml-12 sm:mr-0">{emoji[Math.floor(Math.random() * (6 - 0 + 1) + 0)]}</div>
                </div>
                <div className="p-3 pt-1 sm:pl-10 sm:pr-16 sm:py-5">
                    <h3 className="text-2xl font-bold font-botracking-tight text-gray-500">
                        <span className={color[Math.floor(Math.random() * (6 - 0 + 1) + 0)]}>{matchData.profile.firstName}</span>
                    </h3>
                    <hr className="h-0.5 my-2 bg-rose-200 border-0"></hr>
                    <p className="text-gray-500">
                        📚 {matchData.profile.year.charAt(0).toUpperCase() + matchData.profile.year.slice(1)},{' '}
                        {matchData.profile.major.charAt(0).toUpperCase() + matchData.profile.major.slice(1)}
                    </p>
                    <p className="text-gray-500 ">📍 {matchData.profile.city}</p>
                    <p className="mt-3 sm:mt-4 mb-3 text-gray-500">
                        Three words to describe me: <span className="font-bold">{matchData.profile.describeYourself}</span>!
                    </p>
                    <p className="mb-3 sm:mb-4 text-gray-500">
                        First song on my hookup playlist: 🎶
                        <span className="font-bold"> {matchData.survey.hookupsong}</span>
                    </p>
                    <p className="mb-4 sm:mb-6 text-gray-500">
                        Bio: <span className="font-bold">{matchData.profile.bio}</span>
                    </p>
                    {contact.insta && (
                        <p className="mb-4 sm:mb-6 text-gray-500">
                            Instagram: <span className="font-bold">{contact.insta}</span>
                        </p>
                    )}
                    {contact.fb && (
                        <p className="mb-4 sm:mb-6 text-gray-500">
                            Facebook: <span className="font-bold">{contact.fb}</span>
                        </p>
                    )}
                    {contact.twitter && (
                        <p className="mb-4 sm:mb-6 text-gray-500">
                            Twitter: <span className="font-bold">{contact.twitter}</span>
                        </p>
                    )}
                    {contact.linkedin && (
                        <p className="mb-4 sm:mb-6 text-gray-500">
                            LinkedIn: <span className="font-bold">{contact.linkedin}</span>
                        </p>
                    )}
                    {contact.phone && (
                        <p className="mb-4 sm:mb-6 text-gray-500">
                            Phone Number: <span className="font-bold">{contact.phone}</span>
                        </p>
                    )}
                    {contact.snap && (
                        <p className="mb-4 sm:mb-6 text-gray-500">
                            Snapchat: <span className="font-bold">{contact.snap}</span>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MatchTile;
