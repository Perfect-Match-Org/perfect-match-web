import { NextPage } from 'next';
import { GoogleAuth } from '@/components/general';

const Error: NextPage = () => {
    return (
        <div className="flex h-screen w-screen justify-center items-center text-red-500">
            <div className="w-1/2">
                <div className="text-xl">
                    Oh no, it looks like we&apos;ve hit a bit of a roadblock in finding your perfect match.
                    <br /> <br />
                    To ensure a successful love connection, please double check that you&apos;re using your official
                    Cornell University email address (ending in @cornell.edu) and give it another try.
                    <br /> <br />
                    <GoogleAuth login={true} />
                </div>
            </div>
        </div>
    );
};

export default Error;
