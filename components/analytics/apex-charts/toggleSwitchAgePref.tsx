import React from 'react';
import AgePrefFemale from './agePrefFemale';
import AgePrefMale from './agePrefMale';
import styles from '../../../styles/Statistics.module.css';

const AgePrefToggle = () => {
    const [female, toggleShow] = React.useState(true);

    return (
        <div>
            <button className="text-lg text-gray-500 border border-solid border-gray-500 hover:bg-gray-100 rounded p-3" onClick={() => toggleShow(!female)}>
                {female ? 'Switch to the Graph for Men' : 'Switch to the Graph for Women'}
            </button>
            {female && (
                <div>
                    <h3 className="text-gray-500 mx-[5%] text-base sm:mx-0 font-bold mt-6 -mb-4 sm:text-lg sm:mt-8 sm:mb-0">
                        <span className="text-rose-400">Female Participants'</span> Age Preferences for their Matches
                    </h3>
                    <div className={styles.chart}>
                        <AgePrefFemale />
                    </div>
                </div>
            )}
            {!female && (
                <div>
                    <h3 className="text-gray-500 mx-[5%] text-base sm:mx-0 font-bold mt-6 -mb-4 sm:text-lg sm:mt-8 sm:mb-0">
                        <span className="text-sky-400">Male Participants'</span> Age Preferences for their Matches
                    </h3>
                    <AgePrefMale />
                </div>
            )}

        </div>
    );
};

export default AgePrefToggle;