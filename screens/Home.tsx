import {
  ViroARScene,
  ViroARSceneNavigator,
  ViroVideo,
  ViroTrackingReason,
  ViroTrackingStateConstants,
  ViroImage,
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
    <ViroARScene>
      <ViroImage
        source={require("../assets/interstellar.webp")} // put interstellar.webp inside ./assets
        position={[0, -1, -4]} // 4 meters in front of the camera
        width={2} // width of the image
        height={1.2} // height of the image
        transformBehaviors={["billboardY"]} // always faces user horizontally
      />
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
