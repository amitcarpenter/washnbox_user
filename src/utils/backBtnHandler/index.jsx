import React, { useEffect } from "react";
import { Alert, BackHandler } from "react-native";

export const BackBtnHandler = (shouldHandleBack, onBackPress) => {
  useEffect(() => {
    const backAction = () => {
      if (shouldHandleBack) {
        Alert.alert("Hold on!", "Are you sure you want to go back?", [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel",
          },
          { text: "YES", onPress: () => BackHandler.exitApp() },
        ]);
        return true;
      }
      if (onBackPress) {
        return onBackPress();
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [shouldHandleBack, onBackPress]);
};
