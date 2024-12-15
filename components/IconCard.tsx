import React from 'react'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

interface IconProps {
    type?: "moisture" | "co2" | "light" | "temperature" | "humidity" | null;
    value: number | null;
}

const IconCard = ({
    type,
    value
}:IconProps) => {

    const getIcon = () => {
        if(type === "temperature"){

            if(value == null){
                return <FontAwesome6 name="temperature-empty" size={24} color="#696969" />
            }

            if(value > 35){
                return <FontAwesome5 name="temperature-high" size={24} color="#952B32" />
            }else if(value < 10){
                return <FontAwesome5 name="temperature-low" size={24} color="#739BD0" />
            }else{
                return <FontAwesome6 name="temperature-half" size={24} color="#696969" />
            }
        }

        if(type === "light"){
            if(value == null){
                return <Entypo name="light-down" size={24} color="black" />
            }

            if(value > 50){
                return <Entypo name="light-up" size={24} color="#FFA500" />
            }else{
                return <Entypo name="light-up" size={24} color="#696969" />
            }
        }

        if(type == "moisture"){
            if(value == null){
                return <Entypo name="water" size={24} color="#696969" />
            }

            if(value > 30){
                return <Entypo name="water" size={24} color="#0E87CC" />
            }else{
                return <Entypo name="water" size={24} color="#696969" />
            }
        }

        if(type == "humidity"){
            if(value == null){
                return <FontAwesome5 name="water" size={24} color="#696969" />
            }

            if(value > 30){
                return <FontAwesome5 name="water" size={24} color="#0E87CC" />
            }else{
                return <FontAwesome5 name="water" size={24} color="#696969" />
            }
        }

        if(type = "co2"){
            return <MaterialCommunityIcons name="smoke" size={24} color="#696969" />
        }

    }

    return (
        <>
            {getIcon()}
        </>
    )
}

export default IconCard