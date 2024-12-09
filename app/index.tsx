import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "@/components/Button";
import { router } from "expo-router";

export default function App() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center">
        <Text className="text-3xl font-bold text-green-800">
          Greenhouse App Controller
        </Text>
        <Button
          title="Click"
          colorStyles="bg-primary"
          handlePress={() => router.push("/(tabs)/home")}
          containerStyles="w-full mt-7"
        />
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
