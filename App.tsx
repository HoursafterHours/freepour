import { StatusBar } from "expo-status-bar";
import { useReducer, useState } from "react";
import { Pressable, StyleSheet, Text, Vibration, View } from "react-native";

export default function App() {
  const [isPressed, setPressed] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<string | null>();
  const [endTime, setEndTime] = useState<string | null>();
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

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

  function showTime() {
    if (endTime != null && startTime != null) {
      const diffMs = +new Date(endTime) - +new Date(startTime);
      const ms = (diffMs / 1000).toFixed(3);
      return `${ms} cl`;
    } else if (startTime != null) {
      const curTime = new Date().toISOString();
      const diffMs = +new Date(curTime) - +new Date(startTime);
      const ms = (diffMs / 1000).toFixed(3);
      setTimeout(() => {
        forceUpdate();
      }, 10);
      return `${ms} cl`;
    } else {
      return `0 cl`;
    }
  }

  return (
    <View style={styles.container}>
      <Pressable
        style={(state) => [
          styles.button,
          state.pressed && { backgroundColor: "tomato" },
        ]}
        onPressIn={() => buttonPressed()}
        onPressOut={() => buttonPressed()}
      >
        {isPressed ? (
          <Text style={styles.buttonText}>I'm pressed</Text>
        ) : (
          <Text style={styles.buttonText}>I'm not pressed</Text>
        )}
      </Pressable>
      <Text>{showTime()}</Text>
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
  button: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
  },
  buttonText: {
    fontWeight: "700",
    color: "white",
  },
});
