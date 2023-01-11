import { Tab } from '@headlessui/react'
import Status from './status';
import SurveyComponent from './survey';
import Crushes from './crushes';
import Matches from './matches';


function ProfileTabs(props: any) {
    return (
        <div className="w-full items-cente px-1 py-4 sm:px-0">

            <Tab.Group>
                <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 ">
                    <Tab className="w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700">Status</Tab>
                    <Tab className="w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700"  >Survey</Tab>
                    <Tab className="w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700">Crushes & Forbidden</Tab>
                    <Tab className="w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700" >Matches</Tab>



                </Tab.List>
                <Tab.Panels className="mt-2">
                    <Tab.Panel className="rounded-xl bg-white text-black"><Status /></Tab.Panel>
                    <Tab.Panel className="rounded-xl bg-white p-3" ><SurveyComponent /></Tab.Panel>
                    <Tab.Panel className="rounded-xl bg-white p-3"><Crushes /></Tab.Panel>
                    <Tab.Panel className="rounded-xl bg-white p-3"><Matches /></Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div >
    )
};

export default ProfileTabs;
