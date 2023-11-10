import { InferGetServerSidePropsType } from 'next';
import dynamic from 'next/dynamic';
import 'swagger-ui-react/swagger-ui.css';
import spec from 'swagger.json';
import { getSession } from 'next-auth/react';
import { isAdmin } from '@/utils/admins';

const SwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false });

export async function getServerSideProps(context: any) {
    const session = await getSession(context);
    if (!session || !session.user == null || !isAdmin(session.user?.email!))
        return {
            redirect: { permanent: false, destination: '/' },
            props: {},
        };
    return { props: { spec } };
}

function ApiDoc({ spec }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return <SwaggerUI spec={spec} />;
}

export default ApiDoc;
