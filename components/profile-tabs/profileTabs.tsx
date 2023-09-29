'use client';
import { Tab } from '@headlessui/react';
import Status from './status';
import SurveyComponent from './survey';
import ProfileComponent from './profile-section';
import Crushes from './crushes';
import Matches from './matches';
import { useRouter } from 'next/navigation';
import { Spinner } from '../general';
import useSWR from 'swr';
import { fetcher } from '@/lib/utils/fetch';

function ProfileTabs(props: any) {
    const router = useRouter();
    // const section = router.asPath.split('#')[1];
    const tabIndex: Record<string, number> = {
        status: 0,
        profile: 1,
        survey: 2,
        crushes: 3,
        matches: 4,
    };
    const { data, error, mutate } = useSWR('/api/profile', fetcher);
    const refresh = () => mutate();
    if (!data) return <Spinner />;
    return (
        <div className="w-full items-center px-2 py-4 sm:px-0">
            <Matches matches={data.matches} />
        </div>
    );
}

export default ProfileTabs;
