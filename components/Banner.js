import { Text, View } from "react-native";

function Banner({ content, bgColor = "#ffcdbd" }) {
    return (
        <View style={{ backgroundColor: bgColor, paddingVertical: 20, width: "100%" }}>
            <Text style={{ textAlign: "center" }}>{content}</Text>
        </View>
    );
}

export default Banner