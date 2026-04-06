import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { isAdmin } from "@/utils/admins";
import { useRouter } from "next/router";
import AdminLayout from "@/components/admin/AdminLayout";
import { ApiDocs, ReviewManagement, Dashboard, EmailMarketing } from "@/components/admin";

type AdminSection = "dashboard" | "api-docs" | "reviews" | "email-marketing";

export default function AdminPanel() {
	const { data: session, status } = useSession();
	const router = useRouter();

	const [activeSection, setActiveSection] = useState<AdminSection>("dashboard");

	useEffect(() => {
		if (status === "loading") return;
		if (!session || !isAdmin(session.user?.email ?? "")) {
			router.push("/");
		}
	}, [session, status, router]);

	const handleSectionChange = (section: AdminSection) => {
		setActiveSection(section);
	};

	const renderContent = () => {
		switch (activeSection) {
			case "dashboard":
				return <Dashboard />;
			case "api-docs":
				return <ApiDocs />;
			case "reviews":
				return <ReviewManagement />;
			case "email-marketing":
				return <EmailMarketing />;
			default:
				return null;
		}
	};

	if (status === "loading") {
		return (
			<div className="flex items-center justify-center min-h-screen bg-gray-50">
				<div className="animate-spin w-8 h-8 border-4 border-pink-500 border-t-transparent rounded-full" />
			</div>
		);
	}

	return (
		<AdminLayout activeSection={activeSection} onSectionChange={handleSectionChange}>
			{renderContent()}
		</AdminLayout>
	);
}
