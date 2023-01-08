import React from "react"
import dynamic from "next/dynamic"
import styled from "styled-components"
import Footer from "../components/footer"
import styles from "../styles/Home.module.css";

const SurveyComponent = dynamic(() => import("../components/survey"), {
    ssr: false,
})
const Container = styled.div`
  margin: 2rem;
`
const Survey = () => {
    return (
        <Container>
            <SurveyComponent />
            {/* <div className={styles.footer}>
                <Footer /> */}
            {/* </div> */}
        </Container >

    )
}
export default Survey