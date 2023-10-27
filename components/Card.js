import { router } from "expo-router"
import { Image, Text, TouchableWithoutFeedback, View } from "react-native"

function Card({ id, name, price, image }) {
    return (
        <TouchableWithoutFeedback onPress={() => router.push(`/details/${id}`)}>
            <View style={{ alignItems: "center", borderColor: "#cecece", borderWidth: 1, backgroundColor: "#cecece", padding: 10, borderRadius: 10 }} >
                <Image
                    style={{ width: 160, height: 160 }}
                    source={{ uri: image }}
                />
                <Text style={{ textAlign: "center" }}>{name}</Text>
                <Text style={{ textAlign: "center" }}>{price} DT</Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default Card