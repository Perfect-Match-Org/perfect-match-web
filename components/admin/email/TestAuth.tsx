import React, { useState } from "react";

export default function TestAuth() {
	const [result, setResult] = useState<string>("");
	const [error, setError] = useState<string>("");
	const [loading, setLoading] = useState(false);

	const testAuth = async () => {
		setLoading(true);
		setResult("");
		setError("");

		try {
			// Test the authentication flow by calling the templates endpoint
			const response = await fetch("/api/admin/email/templates");
			const data = await response.json();

			if (response.ok) {
				setResult(`✅ Authentication successful! Found ${data.templates?.length || 0} templates`);
			} else {
				setError(`❌ Authentication failed: ${data.error} ${response.statusText}`);
			}
		} catch (error) {
			setError(`❌ Network error: ${error}`);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="bg-white rounded-md shadow-sm border p-6 mb-6">
			<h3 className="text-lg font-semibold text-gray-900 mb-4">Email API Authentication Test</h3>

			<button
				onClick={testAuth}
				disabled={loading}
				className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
			>
				{loading ? "Testing..." : "Test Authentication"}
			</button>

			{error && (
				<div className="mt-4 p-3 rounded-md bg-gray-50">
					<pre className="text-sm text-red-500">{error}</pre>
				</div>
			)}

			{result && (
				<div className="mt-4 p-3 rounded-md bg-gray-50">
					<pre className="text-sm text-green-500">{result}</pre>
				</div>
			)}

			<div className="mt-4 text-sm text-gray-600">
				<p>
					<strong>What this tests:</strong>
				</p>
				<ul className="list-disc list-inside mt-2 space-y-1">
					<li>Next.js session authentication</li>
					<li>Admin privilege verification</li>
					<li>API middleware forwarding to Flask backend</li>
					<li>Backend authentication decorators</li>
				</ul>
			</div>
		</div>
	);
}
