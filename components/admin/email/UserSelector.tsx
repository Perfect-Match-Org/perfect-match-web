import React, { useState, useEffect, useCallback, useMemo } from "react";
import { theme } from "@/styles/themes";
import { User, FilterCriteria } from "@/types/email";
import {
    Database,
    Sparkles,
    Filter,
    Users,
    TrendingUp,
    X,
    Search,
    ChevronDown,
    AlertCircle,
    CheckCircle2,
    Loader2,
    UserCheck,
    Mail,
    Eye,
    GraduationCap,
    Clock,
    Calendar,
} from "lucide-react";

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

    const fetchAvailableYears = useCallback(async () => {
        try {
            const response = await fetch("/api/admin/email/users/available-years");
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
    }, [initialCriteria?.year]);

    useEffect(() => {
        fetchAvailableYears();
    }, [fetchAvailableYears]);

    const updateUserCount = useCallback(async () => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch("/api/admin/email/users/count", {
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
    }, [criteria, onSelectionChange]);

    useEffect(() => {
        if (criteria.year) {
            updateUserCount();
        }
    }, [updateUserCount, criteria.year]);

    const previewUsersAction = useCallback(async () => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch("/api/admin/email/users/preview", {
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
    }, [criteria]);

    const processNaturalLanguage = useCallback(async () => {
        if (!criteria.natural_query.trim()) return;

        try {
            setAiProcessing(true);
            setError("");

            const response = await fetch("/api/admin/email/users/filter", {
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
                const updatedCriteria = {
                    ...criteria,
                    filters: { ...criteria.filters, ...data.applied_filters },
                };
                setCriteria(updatedCriteria);

                setPreviewUsers(data.preview_users);
                setUserCount({
                    count: data.filtered_count,
                    total: data.total_users,
                    percentage: Math.round((data.filtered_count / data.total_users) * 100),
                });

                onSelectionChange(updatedCriteria, data.filtered_count);
            } else {
                setError(data.error || "Failed to process natural language query");
            }
        } catch (error) {
            setError("Network error while processing query");
        } finally {
            setAiProcessing(false);
        }
    }, [criteria, onSelectionChange]);

    const updateFilter = useCallback((key: string, value: any) => {
        setCriteria((prev) => ({
            ...prev,
            filters: {
                ...prev.filters,
                [key]: value || undefined,
            },
        }));
    }, []);

    const clearFilters = useCallback(() => {
        setCriteria((prev) => ({
            ...prev,
            natural_query: "",
            filters: {},
        }));
    }, []);

    const applyPreset = useCallback((presetName: string) => {
        let newFilters: FilterCriteria["filters"] = {};
        let query = "";

        switch (presetName) {
            case "all":
                newFilters = {};
                query = "";
                break;
            case "opted_in":
                newFilters = { opt_in: true };
                query = "All opted-in users";
                break;
            case "incomplete":
                newFilters = { opt_in: true, profile_complete: false };
                query = "Opted-in users with incomplete profiles";
                break;
            case "no_survey":
                newFilters = { opt_in: true, profile_complete: true, survey_complete: false };
                query = "Users with complete profiles but missing survey";
                break;
            case "ready":
                newFilters = { profile_complete: true, survey_complete: true, opt_in: true };
                query = "Users who have finished everything and are ready for matches";
                break;
            case "no_matches":
                newFilters = { opt_in: true, profile_complete: true, match_count_max: 0 };
                query = "Ready users who haven't received any matches yet";
                break;
        }

        setCriteria((prev) => ({
            ...prev,
            natural_query: query,
            filters: newFilters,
        }));
    }, []);

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                <div className="flex items-center gap-3 mb-1">
                    <div className="p-2 bg-pink-100 rounded-lg">
                        <Users className="w-5 h-5 text-pink-600" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Define Audience</h2>
                </div>
                <p className="text-gray-500 text-sm font-medium">Narrow down who will receive this campaign</p>
            </div>

            <div className="p-8 space-y-10">
                {/* Database Year Selection */}
                <div className="max-w-xs">
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center">
                        <Database className="w-3 h-3 mr-1.5" />
                        Target Database
                    </label>
                    <div className="relative group">
                        <select
                            value={criteria.year}
                            onChange={(e) => setCriteria((prev) => ({ ...prev, year: e.target.value }))}
                            className="w-full pl-4 pr-10 py-2.5 bg-white border-2 border-gray-100 rounded-lg focus:ring-4 focus:ring-pink-500/10 focus:border-pink-500 text-sm font-bold text-gray-700 transition-all appearance-none cursor-pointer group-hover:border-gray-200"
                        >
                            {availableYears.map((year) => (
                                <option key={year} value={year}>
                                    Perfect Match {year}
                                </option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none transition-transform group-hover:translate-y-[-40%]" />
                    </div>
                </div>

                {/* AI Natural Language Query */}
                <div className="bg-gradient-to-br from-pink-500/5 to-purple-500/5 p-6 rounded-xl border border-pink-100 shadow-inner">
                    <label className="block text-[10px] font-bold text-pink-500 uppercase tracking-widest mb-4 flex items-center">
                        <Sparkles className="w-3 h-3 mr-1.5" />
                        Quick Segments & AI
                    </label>

                    <div className="flex flex-wrap gap-2 mb-6">
                        {(
                            [
                                { id: "all", label: "All Users" },
                                { id: "opted_in", label: "Opted In", icon: <CheckCircle2 className="w-4 h-4" /> },
                                { id: "incomplete", label: "Incomplete Profile" },
                                { id: "no_survey", label: "Missing Survey" },
                                { id: "ready", label: "Ready for Matches" },
                                { id: "no_matches", label: "No Matches Yet" },
                            ] as const
                        ).map((preset) => (
                            <button
                                key={preset.id}
                                onClick={() => applyPreset(preset.id)}
                                className="px-3 py-1.5 bg-white border border-pink-100 rounded-lg text-[10px] font-bold text-pink-600 uppercase tracking-wider hover:bg-pink-50 transition-all shadow-sm"
                            >
                                {preset.label}
                            </button>
                        ))}
                    </div>

                    <div className="flex gap-3">
                        <div className="relative flex-1 group">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-pink-300 transition-colors group-focus-within:text-pink-500" />
                            <input
                                type="text"
                                value={criteria.natural_query}
                                // Add a debounce to prevent excessive API calls
                                onChange={(e) => setCriteria((prev) => ({ ...prev, natural_query: e.target.value }))}
                                placeholder="Or describe your audience... (e.g., users who haven't matched yet)"
                                className="w-full pl-10 pr-4 py-3 bg-white border-2 border-pink-100 rounded-lg focus:ring-4 focus:ring-pink-500/10 focus:border-pink-500 text-sm font-medium text-gray-700 transition-all placeholder:text-pink-200 shadow-sm"
                            />
                        </div>
                        <button
                            onClick={processNaturalLanguage}
                            disabled={!criteria.natural_query.trim() || aiProcessing}
                            className="px-6 py-3 bg-pink-600 text-white rounded-lg font-bold text-sm transition-all disabled:opacity-50 hover:shadow-lg shadow-pink-200 active:scale-95 flex items-center gap-2"
                        >
                            {aiProcessing ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Analyzing...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="w-4 h-4" />
                                    Apply
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Manual Filters */}
                <div className="pt-2">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center">
                            <Filter className="w-3 h-3 mr-1.5" />
                            Refine Manually
                        </h3>
                        <div className="h-px flex-1 bg-gray-100 mx-6" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Status Filters */}
                        <div className="space-y-4">
                            <label className="block text-xs font-bold text-gray-700 mb-2.5">User Status</label>

                            {(
                                [
                                    { key: "opt_in", label: "Opted In", icon: <CheckCircle2 className="w-4 h-4" /> },
                                    { key: "profile_complete", label: "Profile Complete" },
                                    { key: "survey_complete", label: "Survey Complete" },
                                ] as const
                            ).map(({ key, label }) => (
                                <div
                                    key={key}
                                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100"
                                >
                                    <span className="text-xs font-bold text-gray-600">{label}</span>
                                    <input
                                        type="checkbox"
                                        checked={criteria.filters[key] === true}
                                        onChange={(e) => updateFilter(key, e.target.checked ? true : undefined)}
                                        className="w-4 h-4 rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Class Year & Gender */}
                        <div className="space-y-6">
                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-2.5">Class Year</label>
                                <div className="relative group">
                                    <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 transition-colors group-focus-within:text-pink-500" />
                                    <select
                                        value={
                                            Array.isArray(criteria.filters.class_year)
                                                ? ""
                                                : (criteria.filters.class_year as string | undefined) ?? ""
                                        }
                                        onChange={(e) => updateFilter("class_year", e.target.value || undefined)}
                                        className="w-full pl-10 pr-10 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg focus:bg-white focus:ring-4 focus:ring-pink-500/10 focus:border-pink-500 text-sm font-bold text-gray-700 transition-all appearance-none cursor-pointer group-hover:border-gray-300"
                                    >
                                        <option value="">Any Year</option>
                                        <option value="freshman">Freshman</option>
                                        <option value="sophomore">Sophomore</option>
                                        <option value="junior">Junior</option>
                                        <option value="senior">Senior</option>
                                        <option value="grad">Grad</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-2.5">Gender</label>
                                <div className="relative group">
                                    <UserCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 transition-colors group-focus-within:text-pink-500" />
                                    <select
                                        value={(criteria.filters.gender as string | undefined) ?? ""}
                                        onChange={(e) => updateFilter("gender", e.target.value || undefined)}
                                        className="w-full pl-10 pr-10 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg focus:bg-white focus:ring-4 focus:ring-pink-500/10 focus:border-pink-500 text-sm font-bold text-gray-700 transition-all appearance-none cursor-pointer group-hover:border-gray-300"
                                    >
                                        <option value="">Any Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="non-binary">Non-binary</option>
                                        <option value="other">Other</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        {/* Match Count & Age Range */}
                        <div className="space-y-6">
                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-2.5">Match Count</label>
                                <div className="flex gap-2">
                                    <div className="relative group flex-1">
                                        <TrendingUp className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 transition-colors group-focus-within:text-pink-500" />
                                        <input
                                            type="number"
                                            min={0}
                                            value={(criteria.filters.match_count_min as number | undefined) ?? ""}
                                            onChange={(e) =>
                                                updateFilter(
                                                    "match_count_min",
                                                    e.target.value !== "" ? parseInt(e.target.value) : undefined
                                                )
                                            }
                                            placeholder="Min"
                                            className="w-full pl-10 pr-2 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg focus:bg-white focus:ring-4 focus:ring-pink-500/10 focus:border-pink-500 text-sm font-bold text-gray-700 transition-all group-hover:border-gray-300"
                                        />
                                    </div>
                                    <div className="relative group flex-1">
                                        <input
                                            type="number"
                                            min={0}
                                            value={(criteria.filters.match_count_max as number | undefined) ?? ""}
                                            onChange={(e) =>
                                                updateFilter(
                                                    "match_count_max",
                                                    e.target.value !== "" ? parseInt(e.target.value) : undefined
                                                )
                                            }
                                            placeholder="Max"
                                            className="w-full px-3 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg focus:bg-white focus:ring-4 focus:ring-pink-500/10 focus:border-pink-500 text-sm font-bold text-gray-700 transition-all group-hover:border-gray-300"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-2.5">Age Range</label>
                                <div className="flex gap-2">
                                    <input
                                        type="number"
                                        min={16}
                                        max={99}
                                        value={(criteria.filters.age_min as number | undefined) ?? ""}
                                        onChange={(e) =>
                                            updateFilter(
                                                "age_min",
                                                e.target.value !== "" ? parseInt(e.target.value) : undefined
                                            )
                                        }
                                        placeholder="Min age"
                                        className="flex-1 px-3 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg focus:bg-white focus:ring-4 focus:ring-pink-500/10 focus:border-pink-500 text-sm font-bold text-gray-700 transition-all hover:border-gray-300"
                                    />
                                    <input
                                        type="number"
                                        min={16}
                                        max={99}
                                        value={(criteria.filters.age_max as number | undefined) ?? ""}
                                        onChange={(e) =>
                                            updateFilter(
                                                "age_max",
                                                e.target.value !== "" ? parseInt(e.target.value) : undefined
                                            )
                                        }
                                        placeholder="Max age"
                                        className="flex-1 px-3 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg focus:bg-white focus:ring-4 focus:ring-pink-500/10 focus:border-pink-500 text-sm font-bold text-gray-700 transition-all hover:border-gray-300"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Status Bar */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                    <div className="flex items-center gap-6">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Impacted Users</span>
                            <div className="flex items-end gap-2">
                                <span className="text-3xl font-black text-gray-900 leading-none">{userCount.count.toLocaleString()}</span>
                                <span className="text-xs font-bold text-pink-500 mb-0.5">{userCount.percentage}% of total</span>
                            </div>
                        </div>
                        <div className="h-10 w-px bg-gray-100" />
                        <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Status</span>
                            <div className="flex items-center gap-1.5">
                                {loading ? (
                                    <>
                                        <Loader2 className="w-3.5 h-3.5 text-pink-400 animate-spin" />
                                        <span className="text-xs font-bold text-pink-400">Updating...</span>
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                                        <span className="text-xs font-bold text-emerald-600">Sync Complete</span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={clearFilters}
                            className="px-5 py-2.5 bg-white border border-gray-200 text-gray-600 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-gray-50 transition-all active:scale-95"
                        >
                            Reset All
                        </button>
                        <button
                            onClick={previewUsersAction}
                            disabled={loading || userCount.count === 0}
                            className="px-6 py-2.5 bg-pink-600 text-white rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-pink-700 transition-all active:scale-95 shadow-lg shadow-pink-100 disabled:opacity-20 flex items-center gap-2"
                        >
                            <Eye className="w-4 h-4" />
                            Preview Sample
                        </button>
                    </div>
                </div>

                {/* Error Display */}
                {error && (
                    <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-100 rounded-lg animate-in fade-in duration-300">
                        <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                        <p className="text-sm font-bold text-red-700">{error}</p>
                    </div>
                )}

                {/* User Preview */}
                {previewUsers.length > 0 && (
                    <div className="pt-4 border-t border-gray-100 animate-in slide-in-from-top-4 duration-500">
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center">
                                <Users className="w-3 h-3 mr-1.5" />
                                Sample Selection (Top 10)
                            </h4>
                            <button onClick={() => setPreviewUsers([])} className="p-1 text-gray-300 hover:text-gray-500">
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {previewUsers.map((user) => (
                                <div
                                    key={user.id}
                                    className="group flex items-center gap-4 p-3 bg-gray-50 rounded-lg border border-transparent hover:border-pink-100 hover:bg-white transition-all"
                                >
                                    <div className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center font-black text-pink-500 text-sm shadow-sm group-hover:scale-110 transition-transform">
                                        {user.first_name?.charAt(0).toUpperCase() || "U"}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="font-bold text-md text-gray-900 truncate">
                                            {user.first_name} {user.last_name}
                                        </div>
                                        <div className="text-xs font-medium text-gray-400 truncate flex items-center gap-1.5">
                                            <Mail className="w-5 h-5" />
                                            {user.email}
                                        </div>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <div className="text-sm font-black text-gray-900 leading-none">{user.match_count}</div>
                                        <div className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Matches</div>
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
