import React from "react";
import { View, Text } from "react-native";

interface CardProps {
    title: String;
    textColor: String;
    borderColor: String;
}

const Card = ({
    title,
    textColor,
    borderColor,
}: CardProps) => {
    return(
        <View className={`bg-white p-4 mb-4 min-h-[100px] rounded-lg border-solid border-2 ${borderColor} min-w-[20vh]`}>
            <Text className={`text-primary text-center font-pmedium text-lg ${textColor}`}>{title}</Text>
        </View>
    )
}

export default Card;