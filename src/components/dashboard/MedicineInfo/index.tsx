import { Tab, TabList, TabPanel, TabPanels, TabGroup } from "@headlessui/react";
import { AlertTriangle, Info, Leaf } from "lucide-react";
import type { TabContentProps } from "@/types/ibm";
import TabSkeleton from "./TabSkeleton";
import OverviewTab from "./OverviewTab";
import IngredientsTab from "./IngredientsTab";
import SideEffectsTab from "./SideEffectsTab";

export default function MedicineInfo({
  fdaData,
  sideEffectData,
  isLoading,
}: TabContentProps) {
  if (isLoading) {
    return <TabSkeleton />;
  }

  const tabs = [
    { name: "Overview", icon: Info },
    { name: "Ingredients", icon: Leaf },
    { name: "Side Effects", icon: AlertTriangle },
  ];

  return (
    <div className="bg-white shadow rounded-lg">
      <TabGroup>
        <TabList className="flex space-x-1 rounded-t-lg bg-gray-50 p-1">
          {tabs.map((tab) => (
            <Tab
              key={tab.name}
              className={({ selected }: { selected: boolean }) =>
                `w-full rounded-lg py-2.5 text-sm font-medium leading-5
                ${
                  selected
                    ? "bg-white text-blue-700 shadow"
                    : "text-gray-700 hover:bg-white/[0.12] hover:text-blue-600"
                }`
              }
            >
              <div className="flex items-center justify-center space-x-2">
                <tab.icon className="h-5 w-5" />
                <span>{tab.name}</span>
              </div>
            </Tab>
          ))}
        </TabList>
        <TabPanels className="p-4">
          <TabPanel>
            <OverviewTab
              fdaData={fdaData}
              sideEffectData={sideEffectData}
              isLoading={isLoading}
            />
          </TabPanel>
          <TabPanel>
            <IngredientsTab
              fdaData={fdaData}
              sideEffectData={sideEffectData}
              isLoading={isLoading}
            />
          </TabPanel>
          <TabPanel>
            <SideEffectsTab
              fdaData={fdaData}
              sideEffectData={sideEffectData}
              isLoading={isLoading}
            />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
}


// import { Tab, TabList, TabPanel, TabPanels, TabGroup } from "@headlessui/react";
// import { AlertTriangle, Info, Leaf, Pill } from "lucide-react";
// import OverviewTab from "./OverviewTab";
// import IngredientsTab from "./IngredientsTab";
// import SideEffectsTab from "./SideEffectsTab";
// import HerbalAlternativesTab from "./HerbalAlternativesTab";
// import type { MedicineInfoProps } from "../../../types/ibm";

// export default function MedicineInfo({
//   fdaData,
//   sideEffectData, // This contains both sideEffects and herbalAlternatives
//   handleSpeak,
//   isLoading,
// }: MedicineInfoProps) {
//   const tabs = [
//     // { name: "Extracted Text" , icon : Info},
//     { name: "Overview" , icon: Info},    
//     { name: "Ingredients", icon: Pill },
//     { name: "Side Effects", icon: AlertTriangle },
//     { name: "Herbal Alternatives", icon: Leaf },
//   ];

//   return (
//     <div className="mt-10">
//       <TabGroup>
//         <TabList className="flex space-x-1 rounded-xl bg-emerald-900/20 p-1">
//           {tabs.map((tab) => (
//             <Tab
//               key={tab.name}
//               className={({ selected }) =>
//                 `w-full rounded-lg py-2.5 text-sm font-medium leading-5
//                 ${
//                   selected
//                     ? "bg-white text-emerald-700 shadow"
//                     : "text-gray-600 hover:bg-white/[0.12] hover:text-emerald-600"
//                 }`
//               }
//             >
//               <div className="flex items-center justify-center space-x-2">
//                 <tab.icon className="h-6 w-4" />
//                 <span>{tab.name}</span>
//               </div>
//             </Tab>
//           ))}
//         </TabList>

//         <TabPanels className="mt-4">
//         {/* <TabPanel>
//             <ExtractedTextTab
//               imgAnalyzed={imgAnalyzed}
//               handleSpeak={handleSpeak}
//               isLoading={isLoading}
//             /> */}
//           <TabPanel>
//             <OverviewTab
//               fdaData={fdaData}
//               handleSpeak={handleSpeak}
//               isLoading={isLoading}
//               sideEffectData={sideEffectData}
//             />
//           </TabPanel>
//           <TabPanel>
//             <IngredientsTab
//               fdaData={fdaData}
//               handleSpeak={handleSpeak}
//               isLoading={isLoading}
//               sideEffectData={sideEffectData}
//             />
//           </TabPanel>
//           <TabPanel>
//             <SideEffectsTab
//               sideEffectData={sideEffectData?.data?.sideEffects}
//               fdaData={fdaData}
//               handleSpeak={handleSpeak}
//               isLoading={isLoading}
//             />
//           </TabPanel>
//           <TabPanel>
//             <HerbalAlternativesTab
//               fdaData={fdaData}
//               herbalData={sideEffectData?.data?.herbalAlternatives}
//               sideEffectData={sideEffectData}
//               handleSpeak={handleSpeak}
//               isLoading={isLoading}
//             />
//           </TabPanel>
//         </TabPanels>
//       </TabGroup>
//     </div>
//   );
// }