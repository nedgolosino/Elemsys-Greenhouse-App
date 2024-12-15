import React from "react";
import { View, Text } from "react-native";
import IconCard from "./IconCard";

interface CardProps {
    title: String;
    textColor: String;
    borderColor: String;
    data: any;
    type?: "moisture" | "co2" | "light" | "temperature" | "humidity" | null
    val: number | null;
}

const Card = ({
    title,
    textColor,
    borderColor,
    data,
    type,
    val
}: CardProps) => {
    return(
        <View className={`bg-white p-4 mb-4 min-h-[100px] rounded-lg border-solid border-2 ${borderColor} min-w-[20vh]`}>
            <View className="flex flex-row gap-x-2">
                <IconCard type={type} value={val}/>
                <Text className={`text-primary text-center font-pmedium text-lg ${textColor}`}>{title}</Text>
            </View>
            <Text className={`text-primary font-pmedium text-lg mt-2 ${textColor}`}>{data}</Text>
        </View>
    )
}

export default Card;