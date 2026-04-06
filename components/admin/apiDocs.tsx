"use client";

import { Container } from "@/components/testimonials/Container";
import spec from "public/swagger.json";

import SwaggerUI from "@/components/admin/SwaggerUI";
import { theme } from "@/styles/themes";

export default function ApiDocs() {
    return (
        <section className="py-10 bg-gray-50 min-h-screen">
            <Container>
                <div className="mb-10">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: theme.fonts.heading }}>API Documentation</h1>
                    <p className="text-gray-600">Technical reference for developers and integrations</p>
                </div>

                <div className="bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden">
                    <SwaggerUI spec={spec} />
                </div>
            </Container>
        </section>
    );
}
