import { useState, useEffect } from 'react';
import DataCard, { DataCardSkeleton } from './dataCard';
import { Container } from '@/components/testimonials/Container';
import { User } from '@/types/users';
import UserProfileModal from './userProfile';

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
                                <div className="h-6 bg-gray-300 rounded-full w-12"></div>
                            </td>
                            <td className="px-4 py-3 border-b">
                                <div className="h-6 bg-gray-300 rounded-full w-16"></div>
                            </td>
                            <td className="px-4 py-3 border-b">
                                <div className="h-6 bg-gray-300 rounded-full w-16"></div>
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
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [pageInput, setPageInput] = useState('1');
    const [selectedUser, setSelectedUser] = useState<User | null>(null); useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                setError(null);

                const [userRes, optInRes, profiledRes, surveyedRes] = await Promise.all([
                    fetch('/api/users/count'),
                    fetch('/api/users/count?status=opted_in'),
                    fetch('/api/users/count?status=profiled'),
                    fetch('/api/users/count?status=surveyed')
                ]);

                if (!userRes.ok || !optInRes.ok || !profiledRes.ok || !surveyedRes.ok) {
                    throw new Error('Failed to fetch dashboard data');
                }

                const [userCount, optInCount, profiledCount, surveyedCount] = await Promise.all([
                    userRes.json(),
                    optInRes.json(),
                    profiledRes.json(),
                    surveyedRes.json()
                ]);

                setUserCount(userCount);
                setOptInCount(optInCount);
                setProfiledCount(profiledCount);
                setSurveyedCount(surveyedCount);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);    // Fetch users with search and pagination
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setUsersLoading(true);
                const response = await fetch(`/api/users?page=${page}&limit=10&searchTerm=${debouncedSearchTerm}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch users');
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
    } return (
        <section className="pt-6 pb-8 sm:pt-10 sm:pb-12 bg-pmpink2-500 min-h-[calc(100vh-110px)]">
            <Container>
                <h1 className="text-4xl text-pmred-500 font-extrabold sm:text-4xl sm:text-center font-dela-gothic mb-8">
                    Admin Dashboard
                </h1>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {loading ? (
                        // Show skeleton cards while loading
                        Array.from({ length: 4 }).map((_, index) => (
                            <DataCardSkeleton key={index} />
                        ))
                    ) : (
                        displayDatas.map(([label, count, colors], index) => (
                            <DataCard
                                key={index}
                                gradientColors={colors}
                            >
                                <div className="relative z-10">
                                    <h3 className="text-white text-lg font-semibold mb-2">{label}</h3>
                                    <p className="text-white text-3xl font-bold">{count}</p>
                                </div>
                            </DataCard>
                        ))
                    )}
                </div>

                {/* User Management Section */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">User Management</h2>

                    {/* Search and Controls */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        <div className="flex-1">
                            <input
                                type="text"
                                placeholder="Search users by name or email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pmblue-500 focus:border-transparent"
                            />
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="number"
                                placeholder="Page"
                                value={pageInput}
                                onChange={(e) => setPageInput(e.target.value)}
                                className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pmblue-500 focus:border-transparent"
                            />
                            <button
                                onClick={jumpToPage}
                                className="px-4 py-2 bg-pmblue-500 text-white rounded-lg hover:bg-pmblue-600 transition-colors"
                            >
                                Go
                            </button>
                        </div>
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-600">Page {page}</span>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className="px-3 py-1 bg-gray-200 text-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => setPage(p => p + 1)}
                                disabled={displayUsers.length < 10}
                                className="px-3 py-1 bg-gray-200 text-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
                            >
                                Next
                            </button>
                        </div>
                    </div>

                    {/* User List */}
                    {usersLoading ? (
                        <UserTableSkeleton />
                    ) : (
                        <>
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
                                        {displayUsers.map((user, index) => (
                                            <tr key={user._id || index} className="hover:bg-gray-50">
                                                <td className="px-4 py-3 text-sm text-gray-900 border-b">
                                                    {user.profile?.firstName} {user.profile?.lastName}
                                                </td>
                                                <td className="px-4 py-3 text-sm text-gray-900 border-b">
                                                    {user.email}
                                                </td>
                                                <td className="px-4 py-3 text-sm border-b">
                                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${user.optIn
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-red-100 text-red-800'
                                                        }`}>
                                                        {user.optIn ? 'Yes' : 'No'}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 text-sm border-b">
                                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${user.profile?.complete
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-yellow-100 text-yellow-800'
                                                        }`}>
                                                        {user.profile?.complete ? 'Complete' : 'Incomplete'}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 text-sm border-b">
                                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${user.survey?.complete
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-yellow-100 text-yellow-800'
                                                        }`}>
                                                        {user.survey?.complete ? 'Complete' : 'Incomplete'}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 text-sm border-b">
                                                    <button
                                                        onClick={() => setSelectedUser(user)}
                                                        className="text-pmblue-500 hover:text-pmblue-700 font-medium"
                                                    >
                                                        View Profile
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {displayUsers.length === 0 && !usersLoading && (
                                <div className="text-center py-8">
                                    <p className="text-gray-500">No users found matching your search criteria.</p>
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* User Profile Modal */}
                {selectedUser && (
                    <UserProfileModal
                        user={selectedUser}
                        onClose={() => setSelectedUser(null)}
                    />
                )}
            </Container>
        </section>
    );
}
