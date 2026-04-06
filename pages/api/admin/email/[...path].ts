import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import authOptions from "../../auth/[...nextauth]";
import { isAdmin } from "@/utils/admins";
import jwt from "jsonwebtoken";

const FLASK_BACKEND_URL = process.env.FLASK_BACKEND_URL || "http://localhost:5050";

/**
 * API middleware for email marketing endpoints
 * Forwards authenticated admin requests to Flask backend
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		// Check authentication
		const session: any = await getServerSession(req, res, authOptions);

		if (!session) {
			return res.status(401).json({ error: "Unauthorized - No session" });
		}

		const email = session.user?.email;
		if (!email) {
			return res.status(401).json({ error: "Unauthorized - No email" });
		}

		// Check admin privileges
		if (!isAdmin(email)) {
			return res.status(403).json({ error: "Forbidden - Admin access required" });
		}

		// Generate JWT token for Flask backend using NEXTAUTH_SECRET
		const secret = process.env.NEXTAUTH_SECRET || "default_secret";
		const token = jwt.sign({ email, role: "admin" }, secret, { expiresIn: "12h" });

		// Extract path from query
		const { path } = req.query;
		const pathString = Array.isArray(path) ? path.join("/") : path || "";

		// Construct Flask backend URL
		const backendUrl = `${FLASK_BACKEND_URL}/admin/email/${pathString}`;

		// Forward request to Flask backend
		const forwardedHeaders: HeadersInit = {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`, // Pass JWT as auth token
			"X-Forwarded-For": (req.headers["x-forwarded-for"] as string) || "unknown",
			"User-Agent": req.headers["user-agent"] || "NextJS-Middleware",
		};

		// Add query parameters if they exist
		const url = new URL(backendUrl);
		Object.keys(req.query).forEach((key) => {
			if (key !== "path") {
				const value = req.query[key];
				if (typeof value === "string") {
					url.searchParams.append(key, value);
				} else if (Array.isArray(value)) {
					value.forEach((v) => url.searchParams.append(key, v));
				}
			}
		});

		const fetchOptions: RequestInit = {
			method: req.method,
			headers: forwardedHeaders,
		};

		// Add body for POST/PUT/PATCH requests
		if (req.method !== "GET" && req.method !== "DELETE") {
			console.log(req.body);
			fetchOptions.body = JSON.stringify(req.body);
		}

		// Make request to Flask backend
		const backendResponse = await fetch(url.toString(), fetchOptions);
		// Get response data
		let responseData;
		const contentType = backendResponse.headers.get("content-type");

		if (contentType && contentType.includes("application/json")) {
			responseData = await backendResponse.json();
		} else {
			responseData = await backendResponse.text();
		}

		// Forward response status and data
		res.status(backendResponse.status);

		// Forward relevant headers
		const headersToForward = ["content-type", "cache-control", "etag"];
		headersToForward.forEach((header) => {
			const value = backendResponse.headers.get(header);
			if (value) {
				res.setHeader(header, value);
			}
		});

		return res.json(responseData);
	} catch (error) {
		console.error("Email API middleware error:", error);

		// Handle network errors
		if (error instanceof TypeError && error.message.includes("fetch")) {
			return res.status(503).json({
				error: "Backend service unavailable",
				details: "Unable to connect to email service backend",
			});
		}

		return res.status(500).json({
			error: "Internal server error",
			details: error instanceof Error ? error.message : "Unknown error",
		});
	}
}

export const config = {
	api: {
		bodyParser: {
			sizeLimit: "10mb", // Increase limit for email templates
		},
	},
};
