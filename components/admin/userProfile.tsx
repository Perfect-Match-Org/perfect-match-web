interface UserProfileModalProps {
    user: any;
    onClose: () => void;
}

export default function UserProfileModal({ user, onClose }: UserProfileModalProps) {
    if (!user) return null;

    const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={handleClickOutside}>
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
                    <h2 className="text-xl text-black font-semibold">User Profile</h2>
                    <button
                        onClick={onClose}
                        className="p-2 text-black hover:bg-gray-100 rounded-full"
                    >
                        ✕
                    </button>
                </div>
                <div className="p-6 space-y-6 text-black">
                    {/* Basic Info */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Basic Information</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-black-500 font-semibold">Name</p>
                                <p>{user.profile?.firstName || "N/A"} {user.profile?.lastName || ""}</p>
                            </div>
                            <div>
                                <p className="text-black-500 font-semibold">Email</p>
                                <p>{user.email || "N/A"}</p>
                            </div>
                            <div>
                                <p className="text-black-500 font-semibold">Opt In Status</p>
                                <p>{user.optIn ? "Opted In" : "Not Opted In"}</p>
                            </div>
                            <div>
                                <p className="text-black-500 font-semibold">Profile Status</p>
                                <p>{user.profile?.complete ? "Complete" : "Incomplete"}</p>
                            </div>
                        </div>
                    </div>

                    {user.profile?.complete && (
                        <>
                            {/* Profile Details */}
                            <div>
                                <h3 className="text-lg font-bold mb-4">Profile Details</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-black-500 font-semibold">Gender</p>
                                        <p>{user.profile?.gender || "N/A"}</p>
                                    </div>
                                    <div>
                                        <p className="text-black-500 font-semibold">Gender Preference</p>
                                        <p>{user.profile?.genderPref || "N/A"}</p>
                                    </div>
                                    <div>
                                        <p className="text-black-500 font-semibold">Age</p>
                                        <p>{user.profile?.age || "N/A"}</p>
                                    </div>
                                    <div>
                                        <p className="text-black-500 font-semibold">Height</p>
                                        <p>
                                            {user.profile?.height
                                                ? `${Math.floor(user.profile.height / 12)}' ${user.profile.height % 12}"`
                                                : "N/A"}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-black-500 font-semibold">Religion</p>
                                        <p>{user.profile?.religion || "N/A"}</p>
                                    </div>
                                    <div>
                                        <p className="text-black-500 font-semibold">Location</p>
                                        <p>{user.profile?.city || "N/A"}</p>
                                    </div>
                                    <div>
                                        <p className="text-black-500 font-semibold">Year</p>
                                        <p>{user.profile?.year || "N/A"}</p>
                                    </div>
                                    <div>
                                        <p className="text-black-500 font-semibold">College</p>
                                        <p>{user.profile?.college || "N/A"}</p>
                                    </div>
                                    <div>
                                        <p className="text-black-500 font-semibold">Major</p>
                                        <p>{user.profile?.major || "N/A"}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Preferences */}
                            <div>
                                <h3 className="text-lg font-bold mb-4">Preferences</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-black-500 font-semibold">Age Preference</p>
                                        <p>
                                            {user.profile?.agePref?.youngest || "N/A"} -{" "}
                                            {user.profile?.agePref?.oldest || "N/A"} years
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-black-500 font-semibold">Commitment Level</p>
                                        <p>{user.profile?.commitment || "N/A"}</p>
                                    </div>
                                    <div>
                                        <p className="text-black-500 font-semibold">Relationship Type</p>
                                        <p>{user.profile?.relationshipType || "N/A"}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <h3 className="text-lg font-bold mb-4">Personal Description</h3>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-black-500 font-semibold">Self Description</p>
                                        <p>
                                            {user.profile?.describeYourself
                                                ? Object.values(user.profile.describeYourself).join(", ")
                                                : "N/A"}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-black-500 font-semibold">Partner Description</p>
                                        <p>
                                            {user.profile?.describePartner
                                                ? Object.values(user.profile.describePartner).join(", ")
                                                : "N/A"}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-black-500 font-semibold">Bio</p>
                                        <p>{user.profile?.bio || "N/A"}</p>
                                    </div>
                                </div>
                            </div>

                            {user.survey?.complete && (
                                <div>
                                    <h3 className="text-lg font-bold mb-4">Survey Information</h3>
                                    <p className="text-black-500">Survey completed successfully</p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
