import { TouchableOpacity, Text } from "react-native";
import React from "react";

interface Button {
  title: string;
  handlePress: () => void;
  colorStyles: string;
  containerStyles?: string;
  textStyles?: string;
  isLoading?: boolean;
}

const Button = ({
  title,
  handlePress,
  colorStyles,
  containerStyles,
  textStyles,
  isLoading,
}: Button) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`${colorStyles} rounded-xl min-h-[60px] justify-center items-center ${containerStyles} ${
        isLoading ? "opacity-50" : ""
      }`}
      disabled={isLoading}
    >
      <Text className="text-primary font-pmedium text-lg text-white">
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
