import dynamic from 'next/dynamic';
import { Container } from '@/components/testimonials/Container';
import 'swagger-ui-react/swagger-ui.css';
import spec from 'public/swagger.json';

const SwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false });

export default function ApiDocs() {
    return (
        <section className="pt-6 pb-8 sm:pt-10 sm:pb-12 bg-pmpink2-500 min-h-[calc(100vh-110px)]">
            <Container>
                <h1 className="text-4xl text-pmred-500 font-extrabold sm:text-4xl sm:text-center font-dela-gothic mb-8">
                    API Documentation
                </h1>

                <div className="bg-white rounded-lg shadow-lg p-4">
                    <SwaggerUI spec={spec} />
                </div>
            </Container>
        </section>
    );
}
