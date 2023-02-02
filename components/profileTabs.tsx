import { Tab } from "@headlessui/react";
import Status from "./status";
import SurveyComponent from "./survey";
import ProfileComponent from "./profile-section";
import Crushes from "./crushes";
import Matches from "./matches";

function ProfileTabs(props: any) {
  const user = props.user;
  return (
    <div className="w-full items-center px-2 py-4 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex space-x-1 px-0 rounded-xl   ">
          <Tab
            className="text-sm p-2 w-full rounded-lg py-2.5 sm:text-lg font-medium leading-5 text-gray-500 hover:bg-gray-300"
            style={{ background: "#ffebed" }}
          >
            Status
          </Tab>
          <Tab
            className="text-sm p-2 w-full rounded-lg py-2.5 sm:text-lg font-medium leading-5 text-gray-500 hover:bg-gray-300"
            style={{ background: "#ffd8db" }}
          >
            Profile
          </Tab>
          <Tab
            className="text-sm p-2 w-full rounded-lg py-2.5 sm:text-lg font-medium leading-5 text-gray-500 hover:bg-gray-300"
            style={{ background: "#ffc4c9" }}
          >
            Survey
          </Tab>
          <Tab
            className="text-sm p-2 w-full rounded-lg py-2.5 sm:text-lg font-medium leading-5 text-gray-500 hover:bg-gray-300"
            style={{ background: "#ffb1b7" }}
          >
            Crushes & Forbidden
          </Tab>
          <Tab
            className="text-sm p-2 w-full rounded-lg py-2.5 sm:text-lg font-medium leading-5 text-gray-500 hover:bg-gray-300"
            style={{ background: "#ff9da5" }}
          >
            Matches
          </Tab>
        </Tab.List>
        <Tab.Panels className="mt-2">
          <Tab.Panel className="rounded-xl bg-white text-black">
            <Status
              optIn={user.optIn}
              surveyComplete={user.survey?.complete}
              profileComplete={user.profile?.complete}
              refresh={props.refresh}
            />
          </Tab.Panel>
          <Tab.Panel className="rounded-xl bg-white p-3">
            <h2 className="pt-10 w-full sm:pt-20 pb-4 mr-8 text-3xl text-gray-500 font-extrabold leading-9 md:w-1/3">
              Profile
            </h2>
            <ProfileComponent profile={user.profile} refresh={props.refresh} />
          </Tab.Panel>
          <Tab.Panel className="rounded-xl bg-white p-3">
            <h2 className="pt-10 w-full sm:pt-20 pb-4 mr-8 text-3xl text-gray-500 font-extrabold leading-9 md:w-1/3">
              Survey
            </h2>
            <SurveyComponent survey={user.survey} refresh={props.refresh} />
          </Tab.Panel>
          <Tab.Panel className="rounded-xl bg-white p-3">
            <h2 className="pt-10 w-full sm:pt-20 pb-4 text-3xl text-gray-500 font-extrabold leading-9 md:w-1/2">
              Crushes & Forbidden
            </h2>
            <Crushes
              crushes={user.crushes}
              forbidden={user.forbidden}
              refresh={props.refresh}
            />
          </Tab.Panel>
          <Tab.Panel className="rounded-xl bg-white p-3">
            <Matches matches={user.matches} refresh={props.refresh} />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

export default ProfileTabs;
