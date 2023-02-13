import Match_Tile from "./match_tile";
import useSWR from "swr";
import { fetcher } from "../../helpers/fetch";
import styles from "/styles/Matches.module.css"
import React from "react";



function Matches(props: any) {


  const { data: match_list, error } = useSWR("/api/matches/", fetcher);
  let list = match_list;
  if (!list) { list = [] }


  list.forEach((match: any) => {
    list.push(<li><Match_Tile id={match}></Match_Tile></li >)
  })

  const [visible, setVisible] = React.useState(false);

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.main}>
          <button className={styles.absolute4} onClick={() => setVisible(!visible)}>
            {visible ? '' : '💌'}
          </button>
          {!visible &&
            <div className={styles.absolute}>
              <div className={styles.layer1}></div>
            </div>
          }
          {visible &&
            <div className={styles.absolute}>
              <div className={styles.layer1_fading}></div>
            </div>
          }
          {!visible &&
            <div className={styles.absolute1}>
              <div className={styles.layer2}></div>
            </div>
          }
          {visible &&
            <div className={styles.absolute1}>
              <div className={styles.layer2_fading}></div>
            </div>
          }
          {!visible &&
            <div className={styles.absolute2}>
              <div className={styles.layer3}></div>
            </div>
          }
          {visible &&
            <div className={styles.absolute2}>
              <div className={styles.layer3_fading}></div>
            </div>
          }
          {!visible &&
            <div className={styles.absolute3}>
              <div className={styles.layer4}></div>
            </div>
          }
          {visible &&
            <div className={styles.absolute3}>
              <div className={styles.layer4_fading}></div>
            </div>
          }
        </div>
      </div>
      {visible &&
        <section className={styles.match_list}>
          <div className="mx-flex my-flex lg:items-center">
            <section className="bg-white">
              <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
                <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
                  <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-rose-400">Your Matches are Here 💝!</h2>
                  <p className="text-gray-500 lg:mb-16 sm:text-xl ">
                    We&apos;ve crunched the numbers, analysed your responses, ran the models, chatted with our in-house love specialists, and consulted Touchdown. Here are your Perfect Matches!
                  </p>
                </div>
                {list}
              </div>
            </section>
          </div>
        </section>
      }


    </div>

  );
}

export default Matches;
