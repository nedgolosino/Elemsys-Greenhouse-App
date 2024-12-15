import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import ControlButton from "@/components/ControlButton";
import Card from "@/components/Card";
import { StatusBar } from "expo-status-bar";
import { database } from "../firebaseConfig";
import { ref, onValue, set } from "firebase/database";

const home = () => {
  const [fanStatus, setFanStatus] = useState<boolean>(false);
  const [sprinkleStatus,setSprinkleStatus] = useState<boolean>(false);
  const [manualStatus,setManualStatus] = useState<boolean>(false);

  // Data from database
  const [temperature, setTemperature] = useState<null | number>(null);
  const [moisture, setMoisture] = useState<null | number>(null);
  const [co2, setCo2] = useState<null | number>(null);
  const [light, setLight] = useState<null | number>(null);
  const [humidity, setHumidity] = useState<null | number>(null);

  const fanRelay = async () => {
    setFanStatus(prev => !prev); // Toggle the state

    const dataRef = ref(database, "control/fan");

    try {
      const fan = !fanStatus; 
      await set(dataRef, fan ? "1" : "0"); 
      console.log("Data written successfully!");
    } catch (error) {
      console.error("Error writing data: ", error);
    }
  };

  const pumpRelay = async () => {
    const dataRef = ref(database, "control/sprinkler");

    try {
      const sprinkle = !sprinkleStatus; 
      await set(dataRef, sprinkle ? "1" : "0"); 
      console.log("Data written successfully!");
    } catch (error) {
      console.error("Error writing data: ", error);
    }
  }

  const manualDataMutation = async () => {
    const dataRef = ref(database, "control/manual");

    try {
      const manualStat = !manualStatus; 
      await set(dataRef, manualStat ? "1" : "0"); 
      console.log("Data written successfully!");
    } catch (error) {
      console.error("Error writing data: ", error);
    }
  }
  
  useEffect(() => {
    // Reference to the temperature endpoint
    const temperatureRef = ref(database, "sensorData/temperature");
    const moistureRef = ref(database, "sensorData/moisture");
    const co2Ref = ref(database, "sensorData/co2");
    const lightRef = ref(database, "sensorData/light");
    const humidityRef = ref(database, "sensorData/humidity");
    
    // status
    const waterRef = ref(database,"control/sprinkler");
    const fanRef = ref(database,"control/fan");
    const manualRef = ref(database,"control/manual");

    const unsubscribeWater = onValue(
      waterRef,
      (snapshot) => {
        if (snapshot.exists()) {
          setSprinkleStatus(snapshot.val() == "1" ? true : false);
        } else {
          console.log("No data available");
          setSprinkleStatus(false);
        }
      },
      (error) => {
        console.error("Error reading data:", error);
      }
    );

    const unsubscribeFan = onValue(
      fanRef,
      (snapshot) => {
        if (snapshot.exists()) {
          setFanStatus(snapshot.val() == "1" ? true : false);
        } else {
          console.log("No data available");
          setFanStatus(false);
        }
      },
      (error) => {
        console.error("Error reading data:", error);
      }
    );

    const unsubscribeManual = onValue(
      manualRef,
      (snapshot) => {
        if (snapshot.exists()) {
          setManualStatus(snapshot.val() == "1" ? true : false);
        } else {
          console.log("No data available");
          setManualStatus(false);
        }
      },
      (error) => {
        console.error("Error reading data:", error);
      }
    );

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
      unsubscribeWater();
      unsubscribeFan();
      unsubscribeManual();

      unsubscribeTemp();
      unsubscribeMoisture();
      unsubscribeCo2();
      unsubscribeLight();
      unsubscribeHumidity();
    }
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white mx-4">
      <ScrollView>
        <View className="items-center justify-center mt-10 mb-10">
          <Text className="text-3xl font-bold text-green-800">Home</Text>
        </View>
        <View className="flex-1">

          <View className="flex-row flex-wrap">
            <View className="w-1/2 p-2">
              <Card 
                title="Moisture:" 
                type={"moisture"}
                textColor="text-black" 
                borderColor="border-primary" 
                data={moisture != null ? `${moisture} %` : 'No Data'}
                val={moisture} 
              />   
            </View>  
            <View className="w-1/2 p-2">
              <Card 
                title="C02:" 
                type={"co2"}
                textColor="text-black" 
                borderColor="border-primary" 
                data={co2 != null ? `${co2.toFixed(2)} ppm` : 'No Data'}
                val={co2} 
              />
            </View>

            <View className="w-1/2 p-2">
              <Card 
                title="Light:" 
                type={"light"}
                textColor="text-black" 
                borderColor="border-primary"  
                data={light != null ? `${light} lux` : 'No Data'}
                val={light} 
              />   
            </View>  
            <View className="w-1/2 p-2">
              <Card 
                type={"temperature"} 
                title="Temperature:" 
                textColor="text-black" 
                borderColor="border-primary" 
                data={temperature != null ? `${temperature} C` : 'No Data'}
                val={temperature}
              />
            </View>

            <View className="w-1/2 p-2">
              <Card 
                title="Humidity:" 
                type={"humidity"}
                textColor="text-black" 
                borderColor="border-primary" 
                data={humidity != null ? `${humidity} % RH` : 'No Data'}
                val={humidity} 
              />
            </View>
          </View>

          <View className="items-center justify-center mt-5">

            <ControlButton title={`Fan : ${fanStatus ? 'On' : 'Off'}`}
              colorStyles={fanStatus ? "bg-primary mb-5" : "border border-primary mb-5 text-primary"}
              containerStyles="w-full"
              textStyles={`${fanStatus ? 'text-white' : 'text-primary'}  font-pmedium text-lg`}
              handlePress={fanRelay}
              disable={!manualStatus}
            />

            <ControlButton title={`Water : ${sprinkleStatus ? 'On' : 'Off'}`}
              colorStyles={sprinkleStatus ? "bg-primary mb-5" : "border border-primary mb-5 text-primary"}
              containerStyles="w-full"
              textStyles={`${sprinkleStatus ? 'text-white' : 'text-primary'}  font-pmedium text-lg`}
              handlePress={pumpRelay}
              disable={!manualStatus}
            />

            <ControlButton title={`${manualStatus ? 'Manual' : 'Automatic'}`}
              colorStyles={manualStatus ? "bg-primary mb-5" : "border border-primary mb-5 text-primary"}
              containerStyles="w-full"
              textStyles={`${manualStatus ? 'text-white' : 'text-primary'}  font-pmedium text-lg`}
              handlePress={manualDataMutation}
            />
          </View>
        </View>
        <StatusBar style="auto" />
      </ScrollView>    
    </SafeAreaView>
  );
};

export default home;
