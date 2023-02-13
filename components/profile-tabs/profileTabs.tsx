import { Tab } from "@headlessui/react";
import Status from "./status";
import SurveyComponent from "./survey";
import ProfileComponent from "./profile-section";
import Crushes from "./crushes";
import Matches from "./matches";
import { useRouter } from "next/router";

function ProfileTabs(props: any) {
  const router = useRouter();
  const section = router.asPath.split("#")[1];
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
      <Tab.Group defaultIndex={tabIndex[section]}>
        <Tab.List className="flex space-x-1 px-0 rounded-xl">
          <Tab
            className="text-sm p-2 w-full rounded-lg py-2.5 sm:text-lg font-medium leading-5 text-gray-500 hover:bg-gray-300"
            style={{ background: "#ffebed" }}
          >
            Matches
          </Tab>

        </Tab.List>
        <Tab.Panels className="mt-2">

          <Tab.Panel className="rounded-xl bg-white p-3">
            <Matches matches={user.matches} refresh={props.refresh} />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

export default ProfileTabs;
