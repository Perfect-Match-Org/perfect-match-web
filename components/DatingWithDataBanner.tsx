import React from 'react';
import styles from '@/styles/DatingBanner.module.css';

const DatingWithDataBanner: React.FC = () => {
    return (
        <section className={styles.banner}>
            {/* Decorative background elements */}
            <div className={styles.circle1} />
            <div className={styles.circle2} />
            <div className={styles.heartPattern}>♥</div>

            <div className={styles.content}>
                <h2 className={styles.headline}>Want More Matches?</h2>

                <p className={styles.subheadline}>
                    Try <span className={styles.highlight}>Dating with Data</span>, a research study on dating apps run by researchers at the{' '}
                    <span className={styles.highlight}>University of Chicago</span>.
                </p>

                <div className={styles.staggeredText}>
                    <p className={styles.staggerLeft}>It&apos;s like a dating app...</p>
                    <p className={styles.staggerRight}>
                        ...except <span className={styles.highlight}>you get paid $20</span> just for using it!
                    </p>
                </div>

                <div className={styles.ctaButtons}>
                    <a href="https://datingwithdata.com" className={styles.ctaButton} target="_blank" rel="noopener noreferrer">
                        Learn More
                    </a>
                    <a
                        href="https://uchicago.co1.qualtrics.com/jfe/form/SV_08qzg4aRgjVWxJY"
                        className={styles.ctaButton}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Sign Up
                    </a>
                </div>

                <div className={styles.irb}>University of Chicago IRB25-1894</div>
            </div>
        </section>
    );
};

export default DatingWithDataBanner;
