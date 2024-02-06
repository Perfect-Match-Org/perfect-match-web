export const analysisURL =
    process.env.NODE_ENV !== 'development' ? 'http://localhost:8080' : 'https://analysis.perfectmatch.ai';

export const fetcher = (url: RequestInfo) => fetch(url).then((res) => res.json());
