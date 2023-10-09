import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function App() {
  const [isPressed, setPressed] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<string | null>();
  const [endTime, setEndTime] = useState<string | null>();

  function buttonPressed() {
    if (!isPressed) {
      setStartTime(new Date().toISOString());
      setPressed(true);
      setEndTime(null);
    } else {
      setEndTime(new Date().toISOString());
      setPressed(false);
    }
  }

  function timeDiff() {
    if (endTime != null && startTime != null) {
      const diffMs = +new Date(endTime) - +new Date(startTime);

      const ms = (diffMs / 1000).toFixed(3);

      return `${ms} s`;
    } else {
      return null;
    }
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={() => buttonPressed()}>
        {isPressed ? <Text>I'm pressed</Text> : <Text>I'm not pressed</Text>}
      </Pressable>
      <Text>{timeDiff() ?? "NO TIME NO TIME"}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
