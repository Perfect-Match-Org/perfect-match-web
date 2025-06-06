interface ReviewTabsProps {
    activeTab: 'pending' | 'existing';
    onTabChange: (tab: 'pending' | 'existing') => void;
    pendingCount: number;
    existingCount: number;
    setCurrentReviewIndex: (index: number) => void;
}

export default function ReviewTabs({ activeTab, onTabChange, pendingCount, existingCount, setCurrentReviewIndex }: ReviewTabsProps) {
    const handleTabChange = (tab: 'pending' | 'existing') => {
        onTabChange(tab);
        setCurrentReviewIndex(0);
    };
    return (
        <div className="flex justify-center mb-8">
            <div className="bg-white rounded-lg shadow-lg p-1 flex">
                <button
                    onClick={() => handleTabChange('pending')}
                    className={`px-6 py-3 rounded-md font-semibold transition-all duration-200 ${activeTab === 'pending'
                            ? 'bg-pmred-500 text-white shadow-md'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                >
                    Pending Reviews ({pendingCount})
                </button>                <button
                    onClick={() => handleTabChange('existing')}
                    className={`px-6 py-3 rounded-md font-semibold transition-all duration-200 ${activeTab === 'existing'
                            ? 'bg-pmred-500 text-white shadow-md'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                >
                    Approved Reviews ({existingCount})
                </button>
            </div>
        </div>
    );
}
