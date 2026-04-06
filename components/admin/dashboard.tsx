import { useState, useEffect } from "react";
import DataCard, { DataCardSkeleton } from "./dataCard";
import { Container } from "@/components/testimonials/Container";
import { User } from "@/types/users";
import UserProfileModal from "./userProfile";
import { theme } from "@/styles/themes";
import { Search, ChevronLeft, ChevronRight, User as UserIcon, CheckCircle2, AlertCircle, Mail } from "lucide-react";

type DisplayData = [string, number, [string, string]];

const UserTableSkeleton: React.FC = () => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-gray-50">
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">Name</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">Email</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">Opt In</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">Profile</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">Survey</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.from({ length: 10 }).map((_, index) => (
                        <tr key={index} className="animate-pulse">
                            <td className="px-4 py-3 border-b">
                                <div className="h-4 bg-gray-300 rounded w-24"></div>
                            </td>
                            <td className="px-4 py-3 border-b">
                                <div className="h-4 bg-gray-300 rounded w-32"></div>
                            </td>
                            <td className="px-4 py-3 border-b">
                                <div className="h-6 bg-gray-300 rounded-lg w-12"></div>
                            </td>
                            <td className="px-4 py-3 border-b">
                                <div className="h-6 bg-gray-300 rounded-lg w-16"></div>
                            </td>
                            <td className="px-4 py-3 border-b">
                                <div className="h-6 bg-gray-300 rounded-lg w-16"></div>
                            </td>
                            <td className="px-4 py-3 border-b">
                                <div className="h-4 bg-gray-300 rounded w-20"></div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default function AdminDashboard() {
    const [userCount, setUserCount] = useState(0);
    const [optInCount, setOptInCount] = useState(0);
    const [profiledCount, setProfiledCount] = useState(0);
    const [surveyedCount, setSurveyedCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [usersLoading, setUsersLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    // User list management
    const [displayUsers, setDisplayUsers] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const [pageInput, setPageInput] = useState("1");
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                setError(null);

                const [userRes, optInRes, profiledRes, surveyedRes] = await Promise.all([
                    fetch("/api/users/count"),
                    fetch("/api/users/count?status=opted_in"),
                    fetch("/api/users/count?status=profiled"),
                    fetch("/api/users/count?status=surveyed"),
                ]);

                if (!userRes.ok || !optInRes.ok || !profiledRes.ok || !surveyedRes.ok) {
                    throw new Error("Failed to fetch dashboard data");
                }

                const [userCount, optInCount, profiledCount, surveyedCount] = await Promise.all([
                    userRes.json(),
                    optInRes.json(),
                    profiledRes.json(),
                    surveyedRes.json(),
                ]);

                setUserCount(userCount);
                setOptInCount(optInCount);
                setProfiledCount(profiledCount);
                setSurveyedCount(surveyedCount);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Unknown error occurred");
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []); // Fetch users with search and pagination
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setUsersLoading(true);
                const response = await fetch(`/api/users?page=${page}&limit=10&searchTerm=${debouncedSearchTerm}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch users");
                }
                const data = await response.json();
                setDisplayUsers(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setUsersLoading(false);
            }
        };

        if (!loading) {
            fetchUsers();
        }
    }, [debouncedSearchTerm, page, loading]);

    // Debounce search term
    useEffect(() => {
        const handler = setTimeout(() => {
            setPage(1);
            setDebouncedSearchTerm(searchTerm);
        }, 300);

        return () => clearTimeout(handler);
    }, [searchTerm]);

    const jumpToPage = () => {
        const pageNumber = parseInt(pageInput, 10);
        if (!isNaN(pageNumber) && pageNumber > 0) {
            setPage(pageNumber);
        }
    };
    const displayDatas: DisplayData[] = [
        ["Users", userCount, ["#99c6f5", "#5397e0"]],
        ["Opted-In", optInCount, ["#f3d1c1", "#f094ab"]],
        ["Completed Profiles", profiledCount, ["#d8b5ff", "#a890fe"]],
        ["Completed Surveys", surveyedCount, ["#96d7d1", "#71d5c1"]],
    ];

    if (error) {
        return (
            <section className="pt-6 pb-8 sm:pt-10 sm:pb-12 bg-pmpink2-500 min-h-[calc(100vh-110px)]">
                <Container>
                    <div className="bg-red-50 text-pmred-500 p-4 rounded-lg">
                        <p className="font-semibold">Error:</p>
                        <p>{error}</p>
                    </div>
                </Container>
            </section>
        );
    }
    return (
        <section className="py-10 bg-gray-50 min-h-screen">
            <Container>
                <div className="mb-10">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: theme.fonts.heading }}>
                        Admin Dashboard
                    </h1>
                    <p className="text-gray-600">Overview of user activity and platform metrics</p>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {loading
                        ? // Show skeleton cards while loading
                          Array.from({ length: 4 }).map((_, index) => <DataCardSkeleton key={index} />)
                        : displayDatas.map(([label, count, colors], index) => (
                              <DataCard key={index} gradientColors={colors}>
                                  <div className="relative z-10">
                                      <h3 className="text-white text-lg font-semibold mb-2">{label}</h3>
                                      <p className="text-white text-3xl font-bold">{count}</p>
                                  </div>
                              </DataCard>
                          ))}
                </div>

                {/* User Management Section */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <h2 className="text-xl font-bold text-gray-900">User Management</h2>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <div className="relative group w-full">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-pink-500 transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Search users in the database..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 pr-4 min-w-[400px] py-2 bg-white border-2 text-gray-900 border-gray-100 rounded-lg text-sm focus:border-pink-500/20 focus:ring-4 focus:ring-pink-500/5 transition-all outline-none"
                                />
                            </div>
                            <div className="flex gap-2">
                                <input
                                    type="number"
                                    placeholder="Page"
                                    value={pageInput}
                                    onChange={(e) => setPageInput(e.target.value)}
                                    className="w-20 px-3 py-2 bg-white border-2 border-gray-100 text-gray-900 rounded-lg text-sm focus:border-pink-500/20 focus:ring-4 focus:ring-pink-500/5 transition-all outline-none"
                                />
                                <button
                                    onClick={jumpToPage}
                                    className="px-4 py-2 bg-pink-600 text-white rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-pink-700 transition-all active:scale-95 shadow-lg shadow-pink-100"
                                >
                                    Go
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Pagination Controls Summary */}
                    <div className="px-6 py-3 bg-white border-b border-gray-50 flex justify-between items-center">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                            Showing page <span className="text-pink-600">{page}</span>
                        </span>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setPage((p) => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className="p-2 text-gray-400 hover:text-pink-600 hover:bg-pink-50 rounded-lg disabled:opacity-20 transition-all"
                                title="Previous Page"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => setPage((p) => p + 1)}
                                disabled={displayUsers.length < 10}
                                className="p-2 text-gray-400 hover:text-pink-600 hover:bg-pink-50 rounded-lg disabled:opacity-20 transition-all"
                                title="Next Page"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* User List */}
                    <div className="relative min-h-[400px]">
                        {usersLoading && (
                            <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-10 flex items-center justify-center transition-all duration-300">
                                <div className="flex flex-col items-center bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
                                    <div className="w-10 h-10 border-4 border-pink-100 border-t-pink-500 rounded-full animate-spin mb-4" />
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Loading Users...</span>
                                </div>
                            </div>
                        )}
                        <div
                            className={`overflow-x-auto transition-opacity duration-300 ${usersLoading && displayUsers.length === 0 ? "opacity-0" : "opacity-100"}`}
                        >
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-gray-50/50 border-b border-gray-100">
                                        <th className="px-6 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                            Name
                                        </th>
                                        <th className="px-6 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                            Email
                                        </th>
                                        <th className="px-6 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                            Opt In
                                        </th>
                                        <th className="px-6 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                            Profile
                                        </th>
                                        <th className="px-6 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                            Survey
                                        </th>
                                        <th className="px-6 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {displayUsers.map((user, index) => (
                                        <tr key={user._id || index} className="hover:bg-gray-50/80 transition-colors group">
                                            <td className="px-6 py-4 text-sm font-bold text-gray-900 group-hover:text-pink-600 transition-colors">
                                                {user.profile?.firstName} {user.profile?.lastName}
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-gray-600">{user.email}</td>
                                            <td className="px-6 py-4 text-sm">
                                                <span
                                                    className={`inline-flex px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg ${
                                                        user.optIn
                                                            ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                                                            : "bg-rose-50 text-rose-600 border border-rose-100"
                                                    }`}
                                                >
                                                    {user.optIn ? "Yes" : "No"}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm">
                                                <span
                                                    className={`inline-flex px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg ${
                                                        user.profile?.complete
                                                            ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                                                            : "bg-amber-50 text-amber-600 border border-amber-100"
                                                    }`}
                                                >
                                                    {user.profile?.complete ? "Complete" : "Pending"}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm">
                                                <span
                                                    className={`inline-flex px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg ${
                                                        user.survey?.complete
                                                            ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                                                            : "bg-amber-50 text-amber-600 border border-amber-100"
                                                    }`}
                                                >
                                                    {user.survey?.complete ? "Complete" : "Pending"}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() => setSelectedUser(user)}
                                                    className="text-pink-600 hover:text-white font-bold text-xs uppercase tracking-widest px-4 py-2 bg-pink-50 hover:bg-pink-600 rounded-xl transition-all active:scale-95"
                                                >
                                                    Details
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {displayUsers.length === 0 && !usersLoading && (
                            <div className="text-center py-20 flex flex-col items-center">
                                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 border-2 border-white shadow-sm">
                                    <Search className="w-8 h-8 text-gray-300" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-1">No users found</h3>
                                <p className="text-sm font-medium text-gray-500">Try adjusting your search or filter criteria.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* User Profile Modal */}
                {selectedUser && <UserProfileModal user={selectedUser} onClose={() => setSelectedUser(null)} />}
            </Container>
        </section>
    );
}
