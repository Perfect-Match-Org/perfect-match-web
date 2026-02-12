import MatchTile from './matchTile';
import React from 'react';

function Matches({ matches, userId, refresh, matchCount }: any) {
    const showNote = matchCount > 8 ? "" : "hidden"
    return (
        <div className='grid grid-cols-1g gap-20 pt-8 [grid-auto-rows:900px] sm:[grid-auto-rows:500px] '>
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
                        contact={matchData.survey}
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