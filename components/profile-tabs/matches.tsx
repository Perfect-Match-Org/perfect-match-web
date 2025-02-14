import MatchTile from './matchTile';
import styles from '/styles/Matches.module.css';
import React from 'react';
import Iframe from 'react-iframe';

function Matches({ matches, userId, refresh, matchCount }: any) {
    const [visible, setVisible] = React.useState(false);
    console.log('matches', matchCount);
    const showNote = matchCount > 8 ? "" : "hidden"
    return (
        <div className='grid grid-cols-1g gap-10 [grid-auto-rows:900px] sm:[grid-auto-rows:500px] '>
            {/* Manually Setting Height for Match Card */}

            {matches.map((match: any, index: number) => {
                const matchData = match.partnerAId._id === userId ? match.partnerBId : match.partnerAId;
                const matchFeedback = match.partnerAId._id === userId ? match.partnerAFeedback : match.partnerBFeedback;
                const matchPoked = match.partnerAId._id === userId ? match.pokedA : match.pokedB;
                const mutualCrush = match?.mutual || false;
                return (
                    <MatchTile
                        key={match._id}
                        matchID={match._id}
                        matchData={matchData}
                        contact={matchData.survey.contact}
                        matchFeedback={matchFeedback}
                        refresh={refresh}
                        mutualCrush={mutualCrush}
                        platonic={match.platonic}
                        superMatch={match.superMatch}
                        matchPoked={matchPoked}
                    />
                );
            })}

        </div >
    );
}

export default Matches;