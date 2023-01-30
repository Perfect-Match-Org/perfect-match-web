import { Tab } from "@headlessui/react";
import Status from "./status";
import SurveyComponent from "./survey";
import ProfileComponent from "./profile-section";
import Crushes from "./crushes";
import Matches from "./matches";

function ProfileTabs(props: any) {
  const user = props.user;
  return (
    <div className="w-full items-cente px-2 py-4 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex space-x-1 px-0 rounded-xl   ">
          <Tab className="p-2 w-full rounded-lg py-2.5 text-lg font-medium leading-5 text-gray-500 hover:bg-gray-300 bg-rose-100 ">
            Status
          </Tab>
          <Tab className="p-2 w-full rounded-lg py-2.5 text-lg font-medium leading-5 text-gray-500 hover:bg-gray-300 bg-rose-200 ">
            Profile
          </Tab>
          <Tab className="w-full rounded-lg py-2.5 text-lg font-medium leading-5 text-gray-500 hover:bg-gray-300 bg-rose-300">
            Survey
          </Tab>
          <Tab className="w-full rounded-lg py-2.5 text-lg font-medium leading-5 text-gray-500 hover:bg-gray-300 bg-pink-200 ">
            Crushes & Forbidden
          </Tab>
          <Tab className="w-full rounded-lg py-2.5 text-lg font-medium leading-5 text-gray-500 hover:bg-gray-300 bg-pink-300 ">
            Matches
          </Tab>
        </Tab.List>
        <Tab.Panels className="mt-2">
          <Tab.Panel className="rounded-xl bg-white text-black">
            <Status optIn={user.optIn} />
          </Tab.Panel>
          <Tab.Panel className="rounded-xl bg-white p-3">
            <h2 className="w-full pt-20 pb-4 mr-8 text-3xl text-gray-500 font-extrabold leading-9 md:w-1/3">
              Profile
            </h2>
            <ProfileComponent />
          </Tab.Panel>
          <Tab.Panel className="rounded-xl bg-white p-3">
            <h2 className="w-full pt-20 pb-4 mr-8 text-3xl text-gray-500 font-extrabold leading-9 md:w-1/3">
              Survey
            </h2>
            <SurveyComponent survey={user.survey} />
          </Tab.Panel>
          <Tab.Panel className="rounded-xl bg-white p-3">
            <h2 className="w-full py-4 px-10 mr-8 text-3xl text-gray-600 font-extrabold leading-9 md:w-1/3">
              Crushes & Forbidden
            </h2>
            <Crushes />
          </Tab.Panel>
          <Tab.Panel className="rounded-xl bg-white p-3">
            <Matches />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

export default ProfileTabs;
