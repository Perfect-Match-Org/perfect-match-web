import { Tab } from '@headlessui/react';
import Status from './status';
import SurveyComponent from './survey';
import ProfileComponent from './profile-section';
import Crushes from './crushes';
import Matches from './matches';
import { useRouter } from 'next/router';

function ProfileTabs(props: any) {
    const router = useRouter();
    const section = router.asPath.split('#')[1];
    const tabIndex: Record<string, number> = {
        status: 0,
        profile: 1,
        survey: 2,
        crushes: 3,
        matches: 4,
    };
    const user = props.user;
    return (
        <div className="w-full items-center px-2 py-4 sm:px-0">
            <Matches matches={user.matches} />
        </div>
    );
}

export default ProfileTabs;
