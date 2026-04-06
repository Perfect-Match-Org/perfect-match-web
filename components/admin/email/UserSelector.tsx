import React, { useState, useEffect } from "react";

interface User {
    id: string;
    first_name: string;
    email: string;
    created_at: string;
    match_count: number;
    last_active: string;
    engagement_score: number;
}

interface FilterCriteria {
    year: string;
    natural_query: string;
    filters: {
        activity_days?: number;
        match_count_min?: number;
        match_count_max?: number;
        registered_after?: string;
        registered_before?: string;
        engagement_level?: "high" | "medium" | "low";
    };
}

interface UserSelectorProps {
    onSelectionChange: (criteria: FilterCriteria, count: number) => void;
    initialCriteria?: FilterCriteria;
}

export default function UserSelector({ onSelectionChange, initialCriteria }: UserSelectorProps) {
    const [availableYears, setAvailableYears] = useState<string[]>([]);
    const [criteria, setCriteria] = useState<FilterCriteria>({
        year: "2025",
        natural_query: "",
        filters: {},
        ...initialCriteria,
    });

    const [previewUsers, setPreviewUsers] = useState<User[]>([]);
    const [userCount, setUserCount] = useState({ count: 0, total: 0, percentage: 0 });
    const [loading, setLoading] = useState(false);
    const [aiProcessing, setAiProcessing] = useState(false);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        fetchAvailableYears();
    }, []);

    useEffect(() => {
        if (criteria.year) {
            updateUserCount();
        }
    }, [criteria]);

    const fetchAvailableYears = async () => {
        try {
            const response = await fetch("/admin/email/users/available-years");
            const data = await response.json();

            if (response.ok) {
                setAvailableYears(data.years);
                if (data.default_year && !initialCriteria?.year) {
                    setCriteria((prev) => ({ ...prev, year: data.default_year }));
                }
            }
        } catch (error) {
            console.error("Failed to fetch available years:", error);
        }
    };

    const updateUserCount = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch("/admin/email/users/count", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(criteria),
            });

            const data = await response.json();

            if (response.ok) {
                setUserCount(data);
                onSelectionChange(criteria, data.count);
            } else {
                setError(data.error || "Failed to count users");
            }
        } catch (error) {
            setError("Network error while counting users");
        } finally {
            setLoading(false);
        }
    };

    const previewUsersAction = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch("/admin/email/users/preview", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(criteria),
            });

            const data = await response.json();

            if (response.ok) {
                setPreviewUsers(data.preview_users);
            } else {
                setError(data.error || "Failed to preview users");
            }
        } catch (error) {
            setError("Network error while previewing users");
        } finally {
            setLoading(false);
        }
    };

    const processNaturalLanguage = async () => {
        if (!criteria.natural_query.trim()) return;

        try {
            setAiProcessing(true);
            setError("");

            const response = await fetch("/admin/email/users/filter", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...criteria,
                    preview_only: true,
                    limit: 10,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // Update criteria with AI-generated filters
                setCriteria((prev) => ({
                    ...prev,
                    filters: { ...prev.filters, ...data.applied_filters },
                }));

                setPreviewUsers(data.preview_users);
                setUserCount({
                    count: data.filtered_count,
                    total: data.total_users,
                    percentage: Math.round((data.filtered_count / data.total_users) * 100),
                });

                onSelectionChange(
                    {
                        ...criteria,
                        filters: { ...criteria.filters, ...data.applied_filters },
                    },
                    data.filtered_count,
                );
            } else {
                setError(data.error || "Failed to process natural language query");
            }
        } catch (error) {
            setError("Network error while processing query");
        } finally {
            setAiProcessing(false);
        }
    };

    const updateFilter = (key: string, value: any) => {
        setCriteria((prev) => ({
            ...prev,
            filters: {
                ...prev.filters,
                [key]: value || undefined,
            },
        }));
    };

    const clearFilters = () => {
        setCriteria((prev) => ({
            ...prev,
            natural_query: "",
            filters: {},
        }));
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Select Target Users</h2>
                <p className="text-gray-600 text-sm">Use AI-powered filtering or manual criteria to select your email recipients</p>
            </div>

            <div className="p-6 space-y-6">
                {/* Database Year Selection */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Database Year</label>
                    <select
                        value={criteria.year}
                        onChange={(e) => setCriteria((prev) => ({ ...prev, year: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    >
                        {availableYears.map((year) => (
                            <option key={year} value={year}>
                                Perfect Match {year}
                            </option>
                        ))}
                    </select>
                </div>

                {/* AI Natural Language Query */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">AI-Powered Filtering</label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={criteria.natural_query}
                            onChange={(e) => setCriteria((prev) => ({ ...prev, natural_query: e.target.value }))}
                            placeholder="e.g., Users who joined in 2024 but haven't gotten any matches yet"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        />
                        <button
                            onClick={processNaturalLanguage}
                            disabled={!criteria.natural_query.trim() || aiProcessing}
                            className="px-4 py-2 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
                            style={{ backgroundColor: "#FF328F" }}
                        >
                            {aiProcessing ? "Processing..." : "Apply AI Filter"}
                        </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                        Describe your target audience in natural language and AI will convert it to filters
                    </p>
                </div>

                {/* Manual Filters */}
                <div className="border-t pt-6">
                    <h3 className="text-sm font-medium text-gray-700 mb-4">Manual Filters</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Activity Filter */}
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Recent Activity (days)</label>
                            <input
                                type="number"
                                value={criteria.filters.activity_days || ""}
                                onChange={(e) => updateFilter("activity_days", parseInt(e.target.value))}
                                placeholder="e.g., 30"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                            />
                        </div>

                        {/* Match Count Range */}
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Match Count Range</label>
                            <div className="flex gap-2">
                                <input
                                    type="number"
                                    value={criteria.filters.match_count_min || ""}
                                    onChange={(e) => updateFilter("match_count_min", parseInt(e.target.value))}
                                    placeholder="Min"
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                />
                                <input
                                    type="number"
                                    value={criteria.filters.match_count_max || ""}
                                    onChange={(e) => updateFilter("match_count_max", parseInt(e.target.value))}
                                    placeholder="Max"
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        {/* Registration Date Range */}
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Registration After</label>
                            <input
                                type="date"
                                value={criteria.filters.registered_after?.split("T")[0] || ""}
                                onChange={(e) => updateFilter("registered_after", e.target.value ? `${e.target.value}T00:00:00` : "")}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Registration Before</label>
                            <input
                                type="date"
                                value={criteria.filters.registered_before?.split("T")[0] || ""}
                                onChange={(e) => updateFilter("registered_before", e.target.value ? `${e.target.value}T23:59:59` : "")}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                            />
                        </div>

                        {/* Engagement Level */}
                        <div className="md:col-span-2">
                            <label className="block text-sm text-gray-600 mb-1">Engagement Level</label>
                            <select
                                value={criteria.filters.engagement_level || ""}
                                onChange={(e) => updateFilter("engagement_level", e.target.value || undefined)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                            >
                                <option value="">Any Engagement Level</option>
                                <option value="high">High Engagement</option>
                                <option value="medium">Medium Engagement</option>
                                <option value="low">Low Engagement</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t">
                    <button
                        onClick={previewUsersAction}
                        disabled={loading}
                        className="px-4 py-2 border-2 rounded-lg font-medium transition-colors"
                        style={{
                            borderColor: "#FF328F",
                            color: "#FF328F",
                        }}
                    >
                        Preview Users
                    </button>
                    <button
                        onClick={clearFilters}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                    >
                        Clear Filters
                    </button>
                </div>

                {/* Error Display */}
                {error && <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>}

                {/* User Count Display */}
                <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Selected Users</span>
                        {loading && <span className="text-xs text-gray-500">Updating...</span>}
                    </div>
                    <div className="text-2xl font-bold" style={{ color: "#FF328F" }}>
                        {userCount.count.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">
                        {userCount.percentage}% of {userCount.total.toLocaleString()} total users
                    </div>
                </div>

                {/* User Preview */}
                {previewUsers.length > 0 && (
                    <div className="border-t pt-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-3">Preview (First 10 Users)</h4>
                        <div className="space-y-2 max-h-64 overflow-y-auto">
                            {previewUsers.map((user) => (
                                <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div>
                                        <div className="font-medium text-gray-900">{user.first_name}</div>
                                        <div className="text-sm text-gray-500">{user.email}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm font-medium text-gray-700">{user.match_count} matches</div>
                                        <div className="text-xs text-gray-500">Joined {new Date(user.created_at).toLocaleDateString()}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
