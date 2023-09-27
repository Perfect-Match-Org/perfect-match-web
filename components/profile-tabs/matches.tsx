import MatchTile from './matchTile';
import styles from '/styles/Matches.module.css';
import React from 'react';

function Matches({ matches }: any) {
    const [visible, setVisible] = React.useState(false);
    return (
        <div>
            <div className={styles.container}>
                <div className={styles.main}>
                    <button className={styles.absolute4} onClick={() => setVisible(!visible)}>
                        {visible ? '' : '💌'}
                    </button>
                    {!visible && (
                        <div className={styles.absolute}>
                            <div className={styles.layer1}></div>
                        </div>
                    )}
                    {visible && (
                        <div className={styles.absolute}>
                            <div className={styles.layer1_fading}></div>
                        </div>
                    )}
                    {!visible && (
                        <div className={styles.absolute1}>
                            <div className={styles.layer2}></div>
                        </div>
                    )}
                    {visible && (
                        <div className={styles.absolute1}>
                            <div className={styles.layer2_fading}></div>
                        </div>
                    )}
                    {!visible && (
                        <div className={styles.absolute2}>
                            <div className={styles.layer3}></div>
                        </div>
                    )}
                    {visible && (
                        <div className={styles.absolute2}>
                            <div className={styles.layer3_fading}></div>
                        </div>
                    )}
                    {!visible && (
                        <div className={styles.absolute3}>
                            <div className={styles.layer4}></div>
                        </div>
                    )}
                    {visible && (
                        <div className={styles.absolute3}>
                            <div className={styles.layer4_fading}></div>
                        </div>
                    )}
                </div>
            </div>
            {visible && (
                <section className={styles.match_list}>
                    <div className="mx-flex my-flex lg:items-center">
                        <section className="bg-white">
                            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
                                <div className="mx-auto max-w-screen-sm text-center lg:mb-16">
                                    <h2 className="mb-4 text-2xl sm:text-4xl tracking-tight font-extrabold text-rose-400">
                                        Your Matches are Here 💝!
                                    </h2>
                                    <p className="text-gray-500 lg:mb-16 sm:text-xl pb-10">
                                        We&apos;ve crunched the numbers, analysed your responses, ran the models,
                                        chatted with our in-house love specialists, and consulted Touchdown. Here are
                                        your Perfect Matches!
                                    </p>
                                </div>
                                {matches.map((match: any) => (
                                    <MatchTile key={match.id} matchData={match} contact={match.survey.contact} />
                                ))}
                            </div>
                        </section>
                    </div>
                </section>
            )}
        </div>
    );
}

export default Matches;
