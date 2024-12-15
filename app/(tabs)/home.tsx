import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Button from "@/components/Button";
import ControlButton from "@/components/ControlButton";
import Card from "@/components/Card";
import { router } from "expo-router"; 
import { StatusBar } from "expo-status-bar";
import { database } from "../../firebaseConfig";
import { ref, onValue } from "firebase/database";

const home = () => {
  const [fanStatus, setFanStatus] = useState<boolean>(false);

  // Data from database
  const [temperature, setTemperature] = useState<null | number>(null);
  const [moisture, setMoisture] = useState<null | number>(null);
  const [co2, setCo2] = useState<null | number>(null);
  const [light, setLight] = useState<null | number>(null);
  const [humidity, setHumidity] = useState<null | number>(null);

  const toggleFan = () => {
    setFanStatus(prev => !prev); // Toggle the state
  };
  
  useEffect(() => {
    // Reference to the temperature endpoint
    const temperatureRef = ref(database, "sensorData/temperature");
    const moistureRef = ref(database, "sensorData/moisture");
    const co2Ref = ref(database, "sensorData/co2");
    const lightRef = ref(database, "sensorData/light");
    const humidityRef = ref(database, "sensorData/humidity");

    // Set up a real-time listener
    const unsubscribeTemp = onValue(
      temperatureRef,
      (snapshot) => {
        if (snapshot.exists()) {
          setTemperature(snapshot.val());
        } else {
          console.log("No data available");
          setTemperature(null);
        }
      },
      (error) => {
        console.error("Error reading data:", error);
      }
    );

    // Real-time listener for moisture
    const unsubscribeMoisture = onValue(moistureRef, (snapshot) => {
      if (snapshot.exists()) {
        setMoisture(snapshot.val());
      } else {
        console.log("No moisture data available");
        setMoisture(null);
      }
    });

    // Real-time listener for CO₂
    const unsubscribeCo2 = onValue(co2Ref, (snapshot) => {
      if (snapshot.exists()) {
        const co2ppm = snapshot.val() / 1002.0;
        setCo2(co2ppm);
      } else {
        console.log("No CO₂ data available");
        setCo2(null);
      }
    });

    // Real-time listener for light
    const unsubscribeLight = onValue(lightRef, (snapshot) => {
      if (snapshot.exists()) {
        setLight(snapshot.val());
      } else {
        console.log("No light data available");
        setLight(null);
      }
    });

    // Real-time listener for humidity
    const unsubscribeHumidity = onValue(humidityRef, (snapshot) => {
      if (snapshot.exists()) {
        setHumidity(snapshot.val());
      } else {
        console.log("No humidity data available");
        setHumidity(null);
      }
    });

    // Cleanup the listener when the component unmounts
    return () => {
      unsubscribeTemp();
      unsubscribeMoisture();
      unsubscribeCo2();
      unsubscribeLight();
      unsubscribeHumidity();
    }
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white mx-4">
      <View className="items-center justify-center mt-20 mb-10">
        <Text className="text-3xl font-bold text-green-800">Home</Text>
      </View>
      <View className="flex-1">
        <View className="flex-row justify-around flex-wrap">
          <Card title="Moisture:" textColor="text-green-700" borderColor="border-green-800" data={moisture != null ? `${moisture} %` : 'No Data'}/>
          <Card title="C02:" textColor="text-green-700" borderColor="border-green-800" data={co2 != null ? `${co2.toFixed(2)} ppm` : 'No Data'}/>
        </View>  
        <View className="flex-row justify-around flex-wrap">
          <Card title="Light:" textColor="text-green-700" borderColor="border-green-800" data={light != null ? `${light} lux` : 'No Data'}/>
          <Card title="Temperature:" textColor="text-green-700" borderColor="border-green-800" data={temperature != null ? `${temperature} C` : 'No Data'}/>
        </View>
        <View className="flex-row justify-around flex-wrap">
          <Card title="Humidity:" textColor="text-green-700" borderColor="border-green-800" data={humidity != null ? `${humidity} % RH` : 'No Data'}/>
        </View>

        <View className="items-center justify-center mt-10">

        <ControlButton title={`Fan : ${fanStatus ? 'On' : 'Off'}`}
          colorStyles={fanStatus ? "bg-primary mb-5" : "border border-primary mb-5 text-primary"}
          containerStyles="w-full"
          textStyles={`${fanStatus ? 'text-white' : 'text-primary'}  font-pmedium text-lg`}
          handlePress={toggleFan}
        />

        <ControlButton title="Water"
          colorStyles="bg-primary"
          containerStyles="w-full"
          textStyles="text-white"
          handlePress={() => {}}
        />

      </View>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

export default home;
