import MatchTile from './matchTile';
import styles from '/styles/Matches.module.css';
import React from 'react';

function Matches({ matches, userId, refresh }: any) {
    const [visible, setVisible] = React.useState(false);
    return (
        <div>
            {matches.map((match: any) => {
                const matchData =
                    match.partnerAId._id === userId ? match.partnerBId : match.partnerAId;
                const matchFeedback =
                    match.partnerAId._id === userId
                        ? match.partnerAFeedback
                        : match.partnerBFeedback;
                return (
                    <MatchTile
                        key={match._id}
                        matchID={match._id}
                        matchData={matchData}
                        contact={matchData.survey.contact}
                        matchFeedback={matchFeedback}
                        refresh={refresh}
                    />
                );
            })}
        </div>
    )
};

export default Matches;
