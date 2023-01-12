import { Tab } from '@headlessui/react'
import Status from './status';
import SurveyComponent from './survey';
import Crushes from './crushes';
import Matches from './matches';


function ProfileTabs(props: any) {
    return (
        <div className="w-full items-cente px-2 py-4 sm:px-0">

            <Tab.Group>
                <Tab.List className="flex space-x-1 px-3 rounded-xl   ">
                    <Tab className="p-2 w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-white-700 hover:bg-gray-400 bg-gray-600 ">Status</Tab>
                    <Tab className="w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-white-700 hover:bg-gray-400 bg-gray-600"  >Survey</Tab>
                    <Tab className="w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-white-700 hover:bg-gray-400 bg-gray-600 ">Crushes & Forbidden</Tab>
                    <Tab className="w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-white-700 hover:bg-gray-400 bg-gray-600 " >Matches</Tab>



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
