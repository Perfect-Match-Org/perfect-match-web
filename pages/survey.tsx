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
  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  try {
    const response = await fetch(`${baseURL}/api/survey`, {
      headers: {
        cookie: context.req.headers.cookie,
      },
    });
    const survey = await response.json();
    return { props: { user: survey } };
  } catch (error) {
    return { redirect: { permanent: false, destination: "/" }, props: {} };
  }
}

export default Survey;
