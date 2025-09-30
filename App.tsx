import {
  ViroARScene,
  ViroARSceneNavigator,
  ViroVideo,
  ViroTrackingReason,
  ViroTrackingStateConstants,
} from "@reactvision/react-viro";
import React, { useState } from "react";
import { StyleSheet } from "react-native";

const HelloWorldSceneAR = () => {
  const [visible, setVisible] = useState(false);

  function onInitialized(state: any, reason: ViroTrackingReason) {
    console.log("onInitialized", state, reason);
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      setVisible(true);
    }
  }

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      {visible && (
        <ViroVideo
          source={require("./assets/sabrina.mp4")} // put sabrina.mp4 inside your project’s ./assets folder
          position={[0, -1, -4]} // 4 meters in front of the camera
          width={2} // 2 meters wide
          height={1.2} // keep aspect ratio
          loop={true} // loop video
          muted={false} // play with sound
          transformBehaviors={["billboardY"]}
        />
      )}
    </ViroARScene>
  );
};

export default () => {
  return (
    <ViroARSceneNavigator
      autofocus={true}
      initialScene={{
        scene: HelloWorldSceneAR,
      }}
      style={styles.f1}
    />
  );
};

const styles = StyleSheet.create({
  f1: { flex: 1 },
});
