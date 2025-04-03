import React from "react";
import { Stack } from "@mantine/core";
import SpeechRecognitionModule from "../modules/SpeechRecognitionModule";
import AudioMatchingModule from "../modules/AudioMatchingModule";
import DragAndDropModule from "../modules/DragAndDropModule";
import FillInTheBlankModule from "../modules/FillInTheBlankModule";
import DialoguePracticeModule from "../modules/DialoguePracticeModule";
import ChallengeModule from "../modules/ChallengeModule";
import MiniGameModule from "../modules/MiniGameModule";
import ImageAssociationModule from "../modules/ImageAssociationModule";
import StoryModule from "../modules/StoryModule";
import ExplorationModule from "../modules/ExplorationModule";
import RoleplayModule from "../modules/RoleplayModule";

interface CustomModuleProps {
  module: {
    component: string;
    data: any;
  };
}

const CustomModuleRenderer: React.FC<CustomModuleProps> = ({ module }) => {
  return (
    <Stack>
      {(() => {
        switch (module.component) {
          case "SpeechRecognitionModule":
            return <SpeechRecognitionModule data={module.data} />;
          case "AudioMatchingModule":
            return <AudioMatchingModule data={module.data} />;
          case "DragAndDropModule":
            return <DragAndDropModule data={module.data} />;
          case "FillInTheBlankModule":
            return <FillInTheBlankModule data={module.data} />;
          case "DialoguePracticeModule":
            return <DialoguePracticeModule data={module.data} />;
          case "ChallengeModule":
            return <ChallengeModule data={module.data} />;
          case "MiniGameModule":
            return <MiniGameModule data={module.data} />;
          case "ImageAssociationModule":
            return <ImageAssociationModule data={module.data} />;
          case "StoryModule":
            return <StoryModule data={module.data} />;
          case "ExplorationModule":
            return <ExplorationModule data={module.data} />;
          case "RoleplayModule":
            return <RoleplayModule data={module.data} />;
          default:
            return <div>Unknown Module</div>;
        }
      })()}
    </Stack>
  );
};

export default CustomModuleRenderer;