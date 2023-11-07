import { Text, View } from "react-native";

function Hero({ content, bgColor = "#ffcdbd" }) {
    return (
        <View style={{ backgroundColor: bgColor, paddingVertical: 20, width: "100%" }}>
            <Text style={{ textAlign: "center", fontSize: 25 }}>{content}</Text>
        </View>
    );
}

export default Hero