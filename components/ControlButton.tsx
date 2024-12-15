import { TouchableOpacity, Text, GestureResponderEvent } from "react-native";
import React from "react";

interface CustomButtonProps {
  title: string;
  colorStyles: string;
  containerStyles?: string;
  textStyles?: string;
  isLoading?: boolean;
  handlePress: ((event: GestureResponderEvent) => void)
  disable?: boolean;
}

const CustomButton = ({
  title,
  colorStyles,
  containerStyles,
  textStyles,
  isLoading,
  handlePress,
  disable
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className={`${colorStyles} rounded-xl min-h-[60px] justify-center items-center ${containerStyles} ${
        (isLoading || disable) ? "opacity-50" : ""
      }`}
      disabled={isLoading || disable}
      onPress={handlePress}
    >
      <Text className={textStyles}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
