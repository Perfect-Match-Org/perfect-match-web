import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Header } from '@/components/header';
import DataCard from '@/components/admin/dataCard';
import Link from 'next/link';
import { User } from '@/types/users';
import { set } from 'mongoose';

type DisplayData = [string, number, [string, string]];

export default function AdminPanel() {
    const { data: session, status } = useSession();
    const [displayUsers, setDisplayUsers] = useState<User[]>([]);
    const [userCount, setUserCount] = useState(0);
    const [optInCount, setOptInCount] = useState(0);
    const [profiledCount, setProfiledCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [page, setPage] = useState(1);
    const [pageInput, setPageInput] = useState('');
    const [cachedResults, setCachedResults] = useState<{ [key: string]: User[] }>({});

    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

    const displayDatas: DisplayData[] = [
        ["Users", userCount, ["#f3d1c1", "#f094ab"]],
        ["Opted-In", optInCount, ["#99c6f5", "#5397e0"]],
        ["Completed Profiles", profiledCount, ["#96d7d1", "#71d5c1"]]];

    const navItems = [["Dashboard", "/admin"], ["API-Docs", "/api-docs"]];

    useEffect(() => {
        if (status === 'authenticated') {
            fetchDashboardData();
        }
    }, [status]);

    const fetchDashboardData = async () => {
        try {
            const responses = await Promise.all([
                fetch('api/users/count'),
                fetch('api/users/count?status=opted_in'),
                fetch('api/users/count?status=profiled'),
            ]);
            if (!responses.every(res => res.ok)) {
                const failedResponse = responses.find(res => !res.ok);
                throw new Error(failedResponse?.status === 401 ? 'Unauthorized' : 'Failed to fetch users');
            }
            const [countResponse, optInResponse, profiledResponse] = await Promise.all(responses.map(res => res.json()));
            setUserCount(countResponse);
            setOptInCount(optInResponse);
            setProfiledCount(profiledResponse);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchUsers = async () => {
            if (cachedResults[debouncedSearchTerm + "||" + page]) {
                setDisplayUsers(cachedResults[debouncedSearchTerm + "||" + page]);
                return;
            }

            try {
                const response = await fetch(`/api/users?page=${page}&limit=10&searchTerm=${debouncedSearchTerm}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }
                const data = await response.json();
                setDisplayUsers(data);
                setCachedResults({ ...cachedResults, [debouncedSearchTerm]: data });
            } catch (err: any) {
                setError(err.message);
            }
        };

        fetchUsers();
    }, [debouncedSearchTerm, page]);

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

    // Profile Modal Component
    const ProfileModal = ({ user, onClose }: { user: any; onClose: () => void }) => {
        if (!user) return null;

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                    <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
                        <h2 className="text-xl text-black font-semibold">User Profile</h2>
                        <button
                            onClick={onClose}
                            className="p-2  text-black hover:bg-gray-100 rounded-full"
                        >
                            ✕
                        </button>
                    </div>
                    <div className="p-6 space-y-6 text-black">
                        {/* Basic Info */}
                        <div>
                            <h3 className="text-lg font-medium mb-4">Basic Information</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-black-500">Name</p>
                                    <p>{user.profile?.firstName} {user.profile?.lastName}</p>
                                </div>
                                <div>
                                    <p className="text-black-500">Email</p>
                                    <p>{user.email}</p>
                                </div>
                                <div>
                                    <p className="text-black-500">Opt In Status</p>
                                    <p>{user.optIn ? "Opted In" : "Not Opted In"}</p>
                                </div>
                                <div>
                                    <p className="text-black-500">Profile Status</p>
                                    <p>{user.profile?.complete ? "Complete" : "Incomplete"}</p>
                                </div>
                            </div>
                        </div>

                        {user.profile?.complete && (
                            <>
                                {/* Profile Details */}
                                <div>
                                    <h3 className="text-lg font-medium mb-4">Profile Details</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-black-500">Gender</p>
                                            <p>{user.profile.gender}</p>
                                        </div>
                                        <div>
                                            <p className="text-black-500">Gender Preference</p>
                                            <p>{user.profile.genderPref}</p>
                                        </div>
                                        <div>
                                            <p className="text-black-500">Age</p>
                                            <p>{user.profile.age}</p>
                                        </div>
                                        <div>
                                            <p className="text-black-500">Height</p>
                                            <p>{Math.floor(user.profile.height / 12)} {user.profile.height % 12} </p>
                                        </div>
                                        <div>
                                            <p className="text-black-500">Location</p>
                                            <p>{user.profile.city}</p>
                                        </div>
                                        <div>
                                            <p className="text-black-500">Year</p>
                                            <p>{user.profile.year}</p>
                                        </div>
                                        <div>
                                            <p className="text-black-500">College</p>
                                            <p>{user.profile.college}</p>
                                        </div>
                                        <div>
                                            <p className="text-black-500">Major</p>
                                            <p>{user.profile.major}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Preferences */}
                                <div>
                                    <h3 className="text-lg font-medium mb-4">Preferences</h3>
                                    <div className="grid grid-cols-2 gap-4">

                                        <div>
                                            <p className="text-black-500">Age Preference</p>
                                            <p>{user.profile.agePref.youngest} - {user.profile.agePref.oldest} years</p>
                                        </div>
                                        <div>
                                            <p className="text-black-500">Commitment Level</p>
                                            <p>{user.profile.commitment}</p>
                                        </div>
                                        <div>
                                            <p className="text-black-500">Relationship Type</p>
                                            <p>{user.profile.relationshipType}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Description */}
                                <div>
                                    <h3 className="text-lg font-medium mb-4">Personal Description</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-black-500">Self Description</p>
                                            <p>{Object.values(user.profile.describeYourself).join(", ")}</p>
                                        </div>
                                        <div>
                                            <p className="text-black-500">Partner Description</p>
                                            <p>{Object.values(user.profile.describePartner).join(", ")}</p>
                                        </div>
                                        <div>
                                            <p className="text-black-500">Bio</p>
                                            <p>{user.profile.bio}</p>
                                        </div>
                                    </div>
                                </div>

                                {user.survey?.complete && (
                                    <div>
                                        <h3 className="text-lg font-medium mb-4">Survey Information</h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-black-500">Interests</p>
                                                <p>{user.survey.interests.join(", ")}</p>
                                            </div>
                                            <div>
                                                <p className="text-black-500">Music Preferences</p>
                                                <p>{user.survey.music.join(", ")}</p>
                                            </div>
                                            <div>
                                                <p className="text-black-500">Love Languages</p>
                                                <p>{user.survey.lovelanguage.join(", ")}</p>
                                            </div>
                                            <div>
                                                <p className="text-black-500">Habits</p>
                                                <div className="text-sm">
                                                    <p>Drinking: {user.survey.habits.drinking}</p>
                                                    <p>Smoking: {user.survey.habits.smoking}</p>
                                                    <p>Weed: {user.survey.habits.weed}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    // Main component render
    if (status === 'unauthenticated') {
        return (
            <div className="min-h-screen bg-gray-50 p-4">
                <div className="bg-red-50 text-red-700 p-4 rounded-lg">
                    Not authorized
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 p-4">
                <div className="bg-red-50 text-red-700 p-4 rounded-lg">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className='bg-gray-50'>
            <Header />
            <nav className="bg-rose-50 shadow-sm">
                <ul className='flex gap-8 py-4 px-4 md:px-8 lg:px-12 text-gray-700'>
                    {navItems.map(([name, path], index) => (
                        <li key={index}>
                            <Link href={path}>
                                <a className='hover:text-rose-400 transition-all duration-300 ease-in-out 
                                relative hover:after:w-full after:content-[""] after:bg-text-rose-400 after:absolute after:bottom-0 after:left-0 
                                after:h-[2px] after:w-0 after:transition-all after:duration-300'>{name}</a>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className='mx-auto px-4 md:px-8 lg:px-12 py-4'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {/* <DataCard gradientColors={["#f3d1c1", "#f094ab"]} >
                        <div className='px-5 py-8'>
                            <div className="text-1xl md:text-3xl font-normal">Users</div>
                            <div className="text-4xl md:text-6xl font-semibold">{userCount}</div>
                        </div>
                    </DataCard> */}
                    {displayDatas.map((data, index) => (
                        <DataCard key={index} gradientColors={data[2]}>
                            <div className='px-5 py-8'>
                                <div className="text-1xl md:text-2xl font-normal">{data[0]}</div>
                                <div className="text-4xl md:text-5xl font-semibold">{data[1]}</div>
                            </div>
                        </DataCard>
                    ))}
                </div>
                <div className="pt-6">
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Search users..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border bg-rose-200 placeholder-rose-800 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                        />
                    </div>

                    <div className="space-y-2">
                        {displayUsers.length === 0 ? (
                            <div className="text-center py-4 text-black">
                                No users found
                            </div>
                        ) : (
                            displayUsers.map((user, index) => (
                                <div
                                    key={index}
                                    className="px-4 py-3 text-black rounded-lg border border-black hover:bg-gray-50 transition-colors cursor-pointer"
                                    onClick={() => setSelectedUser(user)}
                                >
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                        <div className="font-medium">
                                            {user.profile?.firstName || ''} {user.profile?.lastName || ''}
                                            {user.profile?.complete &&
                                                <span className="ml-2 text-green-600 text-sm">✓ Complete</span>
                                            }
                                        </div>
                                        <div className="text-gray-600">{user.email}</div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    <div className="flex justify-between items-center mt-4">
                        <button
                            onClick={() => setPage(page - 1)}
                            disabled={page === 1}
                            className="px-4 py-2 bg-rose-400 text-white rounded-lg disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <div className="text-black">
                            Page {page}
                        </div>
                        <button
                            onClick={() => setPage(page + 1)}
                            disabled={displayUsers.length < 10}
                            className="px-4 py-2 bg-rose-400 text-white rounded-lg disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                    <div className="flex justify-center items-center mt-4 gap-1">
                        <input
                            type="number"
                            value={pageInput}
                            onChange={(e) => setPageInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && jumpToPage()}
                            className="px-1 py-2 border rounded-lg w-12 text-center bg-rose-200 text-rose-800 "
                        />
                        <button
                            onClick={jumpToPage}
                            className="px-4 py-2 bg-rose-400 text-white rounded-lg"
                        >
                            Go
                        </button>
                    </div>
                </div>

                {selectedUser && (
                    <ProfileModal
                        user={selectedUser}
                        onClose={() => setSelectedUser(null)}
                    />
                )}
            </div>
        </div>
    );
}