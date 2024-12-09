import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Button from "@/components/Button";
import ControlButton from "@/components/ControlButton";
import Card from "@/components/Card";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";

const home = () => {
  // State to track the light status (on or off)
  const [lightStatus, setLightStatus] = useState<boolean>(false);

  // Function to toggle the light on and off
  const toggleLight = () => {
    setLightStatus(!lightStatus); // Toggle the state
  };
  
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="items-center justify-center mt-60 mb-10">
        <Text className="text-3xl font-bold text-green-800">Home</Text>
      </View>
      <View className="flex-1">
        <View className="flex-row justify-around flex-wrap mb-10">
          <Card title="Moisture" textColor="text-green-700" borderColor="border-green-800"/>
          <Card title="C02" textColor="text-green-700" borderColor="border-green-800"/>
        </View>  
        <View className="flex-row justify-around flex-wrap">
          <TouchableOpacity onPress={toggleLight}>
            <Card title={`Light :\n ${lightStatus ? 'On' : 'Off'}`} 
            textColor={lightStatus ? "text-green-700" : "text-black" }
            borderColor={lightStatus ? "border-green-800" : "border-black-800"}/>
          </TouchableOpacity>
          <Card title="Temperature" textColor="text-green-700" borderColor="border-green-800"/>
        </View>
        <View className="items-center justify-center mt-10">
        <ControlButton 
          title="Water"
          colorStyles="bg-primary"
          containerStyles="w-full"/>
      </View>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

export default home;
