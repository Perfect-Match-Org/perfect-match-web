import React from "react";
import dynamic from "next/dynamic";
import styled from "styled-components";
import { getSession } from "next-auth/react";
import { get } from "../helpers/requests";

const SurveyComponent = dynamic(() => import("../components/survey"), {
  ssr: false,
});
const Container = styled.div`
  margin: 2rem;
`;
const Survey = (surveyData: any) => {
  return (
    <Container>
      <SurveyComponent />
      {/* <div className={styles.footer}>
                <Footer /> */}
      {/* </div> */}
    </Container>
  );
};

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  if (!session) {
    context.res.writeHead(302, { Location: "/" });
    context.res.end();
    return {};
  }
  try {
    const res = await get("api/survey", context);
    const data = res.data;
    return {
      props: {
        user: data,
      },
    };
  } catch (error) {
    context.res.writeHead(302, { Location: "/" });
    context.res.end();
    return {};
  }
}

export default Survey;
