import { Volume2 } from "lucide-react";
import type { TabContentProps } from "@/types/ibm";
import TabSkeleton from "./TabSkeleton";
import { speakText } from "@/utils/textToSpeech";

interface PrimaryUse {
  name: string;
  description: string;
}

export default function OverviewTab({
  fdaData,
  sideEffectData,
  handleSpeak,
  isLoading,
}: TabContentProps) {
  if (isLoading) {
    return <TabSkeleton />;
  }

  // Original FDA data
  const purposeText = fdaData?.data?.results?.[0]?.purpose?.[0];
  const indicationsText =
    fdaData?.data?.results?.[0]?.indications_and_usage?.[0];
  const warningsText = fdaData?.data?.results?.[0]?.warnings_and_cautions?.[0];
  const patientInfoText =
    fdaData?.data?.results?.[0]?.information_for_patients?.[0];
  const storageText = fdaData?.data?.results?.[0]?.storage_and_handling?.[0];

  // New overview data from the enhanced API
  const overview = sideEffectData?.data?.overview;

  const speechText = [
    purposeText && `Purpose: ${purposeText}`,
    indicationsText && `Indications and Usage: ${indicationsText}`,
    warningsText && `Warnings and Cautions: ${warningsText}`,
    patientInfoText && `Information for Patients: ${patientInfoText}`,
    storageText && `Storage and Handling: ${storageText}`,
  ]
    .filter(Boolean)
    .join(". ");

  const handleVoiceClick = () => {
    if (speechText) {
      speakText(speechText, {
        rate: 0.9,
        pitch: 1,
        languageCode: "en-US",
        languageName: "English",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <div className="space-y-6 flex-1">
          {/* Enhanced Overview Section */}
          {overview && (
            <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
              <h3 className="text-lg font-semibold text-emerald-800 mb-3">Medicine Overview</h3>
              
              <div className="space-y-4">
                {overview.summary && (
                  <div>
                    <h4 className="font-medium mb-1">Summary</h4>
                    <p className="text-gray-700">{overview.summary}</p>
                  </div>
                )}
                
                {overview.mechanism_of_action && (
                  <div>
                    <h4 className="font-medium mb-1">Mechanism of Action</h4>
                    <p className="text-gray-700">{overview.mechanism_of_action}</p>
                  </div>
                )}
                
                {overview.primary_uses && overview.primary_uses.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-1">Primary Uses</h4>
                    <div className="flex flex-wrap gap-2">
                      {overview.primary_uses.map((use: PrimaryUse, index: number) => (
                        <div key={index} className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <h5 className="font-semibold text-blue-800">{use.name}</h5>
                          <p className="mt-2 text-sm text-gray-700">{use.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Original FDA Data */}
          {purposeText && (
            <div>
              <h3 className="font-semibold mb-2">Purpose</h3>
              <p className="text-gray-700">{purposeText}</p>
            </div>
          )}
          {indicationsText && (
            <div>
              <h3 className="font-semibold mb-2">Indications & Usage</h3>
              <p className="text-gray-700">{indicationsText}</p>
            </div>
          )}
          {warningsText && (
            <div>
              <h3 className="font-semibold mb-2">Warnings & Cautions</h3>
              <p className="text-gray-700">{warningsText}</p>
            </div>
          )}
          {patientInfoText && (
            <div>
              <h3 className="font-semibold mb-2">Information for Patients</h3>
              <p className="text-gray-700">{patientInfoText}</p>
            </div>
          )}
          {storageText && (
            <div>
              <h3 className="font-semibold mb-2">Storage & Handling</h3>
              <p className="text-gray-700">{storageText}</p>
            </div>
          )}
        </div>
        {speechText && (
          <button
            onClick={handleVoiceClick}
            className="ml-2 p-2 text-gray-500 hover:text-emerald-600 flex-shrink-0"
            title="Text to speech"
          >
            <Volume2 className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
}

// import { Volume2 } from "lucide-react";
// import type { TabContentProps } from "../../../types/ibm";
// import TabSkeleton from "./TabSkeleton";
// import { speakText } from "../../../utils/textToSpeech";

// export default function OverviewTab({
//   fdaData,
//   isLoading,
// }: TabContentProps) {
//   if (isLoading) {
//     return <TabSkeleton />;
//   }

//   const purposeText = fdaData?.data?.results?.[0]?.purpose?.[0];
//   const indicationsText =
//     fdaData?.data?.results?.[0]?.indications_and_usage?.[0];
//   const warningsText = fdaData?.data?.results?.[0]?.warnings_and_cautions?.[0];
//   const patientInfoText =
//     fdaData?.data?.results?.[0]?.information_for_patients?.[0];
//   const storageText = fdaData?.data?.results?.[0]?.storage_and_handling?.[0];

//   const speechText = [
//     purposeText && `Purpose: ${purposeText}`,
//     indicationsText && `Indications and Usage: ${indicationsText}`,
//     warningsText && `Warnings and Cautions: ${warningsText}`,
//     patientInfoText && `Information for Patients: ${patientInfoText}`,
//     storageText && `Storage and Handling: ${storageText}`,
//   ]
//     .filter(Boolean)
//     .join(". ");

//   const handleVoiceClick = () => {
//     if (speechText) {
//       speakText(speechText, {
//         rate: 0.9,
//         pitch: 1,
//         languageCode: "en-US",
//         languageName: "English",
//       });
//     }
//   };

//   return (
//     <div className="space-y-4">
//       <div className="flex items-start justify-between">
//         <div className="space-y-4 flex-1">
//           {purposeText && (
//             <div>
//               <h3 className="font-semibold mb-2">Purpose</h3>
//               <p className="text-gray-700">{purposeText}</p>
//             </div>
//           )}
//           {indicationsText && (
//             <div>
//               <h3 className="font-semibold mb-2">Indications & Usage</h3>
//               <p className="text-gray-700">{indicationsText}</p>
//             </div>
//           )}
//           {warningsText && (
//             <div>
//               <h3 className="font-semibold mb-2">Warnings & Cautions</h3>
//               <p className="text-gray-700">{warningsText}</p>
//             </div>
//           )}
//           {patientInfoText && (
//             <div>
//               <h3 className="font-semibold mb-2">Information for Patients</h3>
//               <p className="text-gray-700">{patientInfoText}</p>
//             </div>
//           )}
//           {storageText && (
//             <div>
//               <h3 className="font-semibold mb-2">Storage & Handling</h3>
//               <p className="text-gray-700">{storageText}</p>
//             </div>
//           )}
//         </div>
//         {speechText && (
//           <button
//             onClick={handleVoiceClick}
//             className="ml-2 p-2 text-gray-500 hover:text-emerald-600 flex-shrink-0"
//             title="Text to speech"
//           >
//             <Volume2 className="h-5 w-5" />
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }