import React from "react";
import AgePrefFemale from "./agePrefFemale";
import AgePrefMale from "./agePrefMale";
import styles from "../../../styles/Statistics.module.css";

const AgePrefToggle = () => {
	const [female, toggleShow] = React.useState(true);

	return (
		<div>
			<button
				className="text-bold sm:text-lg text-pmpink2-500 border border-solid border-pmblue-500 hover:bg-pmpink-500 rounded-xl py-1 mt-2 p-3 mx-[3%] sm:mx-0"
				onClick={() => toggleShow(!female)}
			>
				{female ? "Switch to the Chart for Men" : "Switch to the Chart for Women"}
			</button>
			{female && (
				<div>
					<h3 className="text-gray-500 mx-[3%] text-base sm:mx-0 font-bold mt-6 -mb-4 sm:text-lg sm:mt-8 sm:mb-0">
						<span className="text-rose-400">Female Participants&apos;</span> Age Preferences for their Matches
					</h3>
					<div>
						<AgePrefFemale />
					</div>
				</div>
			)}
			{!female && (
				<div>
					<h3 className="text-gray-500 mx-[3%] text-base sm:mx-0 font-bold mt-6 -mb-4 sm:text-lg sm:mt-8 sm:mb-0">
						<span className="text-sky-400">Male Participants&apos;</span> Age Preferences for their Matches
					</h3>
					<AgePrefMale />
				</div>
			)}
		</div>
	);
};

export default AgePrefToggle;
