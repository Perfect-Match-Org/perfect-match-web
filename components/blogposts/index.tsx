import React from "react";
import dynamic from "next/dynamic";

const SampleInterview = dynamic(() => import("@/components/blogposts/posts/sampleinterview"));
const SamplePost = dynamic(() => import("@/components/blogposts/posts/samplepost"));

const Blogposts: React.FC = () => {
	return (
		<div className="pr-4" style={{ paddingRight: "15%", paddingLeft: "15%" }}>
			<SampleInterview />
			<SamplePost />
		</div>
	);
};

export default Blogposts;
