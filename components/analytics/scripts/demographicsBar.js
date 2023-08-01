const dataRequest = async () => {
    //loading historical age data
    const age21 = await d3.csv('../datasets/randomizedAge2021.csv');
    const age22 = await d3.csv('../datasets/randomizedAge2022.csv');
    console.log('hi');
};
dataRequest();
