import React from "react";
import dynamic from "next/dynamic";
import styled from "styled-components";
import styles from "../styles/Home.module.css";
import Footer from "../components/footer";
import Header from "../components/header";

const SurveyComponent = dynamic(() => import("../components/survey"), {
  ssr: false,
});
const Container = styled.div`
  margin: 2rem;
`;
const Survey = (surveyData: any, props: any) => {
  return (
    <Container>
      <Header />
      <Footer />
    </Container>
  );
};

export async function getServerSideProps(context: any) {
  try {
    const baseURL = process.env.NEXT_PUBLIC_API_URL;
    console.log(baseURL);
    const data = await fetch(`${baseURL}/api/survey`, {
      headers: {
        cookie: context.req.headers.cookie,
      },
    });
    const survey = await data.json();
    return {
      props: {
        user: survey,
      },
    };
  } catch (error) {
    context.res.writeHead(302, { Location: "/" });
    context.res.end();
    return {};
  }
}

export default Survey;
