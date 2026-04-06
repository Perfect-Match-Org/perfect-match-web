interface ReviewTabsProps {
	activeTab: "pending" | "existing";
	onTabChange: (tab: "pending" | "existing") => void;
	pendingCount: number;
	existingCount: number;
	setCurrentReviewIndex: (index: number) => void;
}

export default function ReviewTabs({ activeTab, onTabChange, pendingCount, existingCount, setCurrentReviewIndex }: ReviewTabsProps) {
	const handleTabChange = (tab: "pending" | "existing") => {
		onTabChange(tab);
		setCurrentReviewIndex(0);
	};
	return (
		<div className="flex justify-start">
			<div className="bg-white rounded-md shadow-lg p-1 flex gap-2">
				<button
					onClick={() => handleTabChange("pending")}
					className={`px-6 py-3 rounded-md font-bold text-sm transition-all duration-200 ${
						activeTab === "pending" ? "bg-pink-600 text-white shadow-lg shadow-pink-200" : "text-gray-500 hover:text-gray-900"
					}`}
				>
					Pending Reviews ({pendingCount})
				</button>
				<button
					onClick={() => handleTabChange("existing")}
					className={`px-6 py-3 rounded-md font-bold text-sm transition-all duration-200 ${
						activeTab === "existing" ? "bg-pink-600 text-white shadow-lg shadow-pink-200" : "text-gray-500 hover:text-gray-900"
					}`}
				>
					Approved Reviews ({existingCount})
				</button>
			</div>
		</div>
	);
}
