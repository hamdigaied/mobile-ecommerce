import { router } from "expo-router"
import { Image, Text, TouchableWithoutFeedback, View } from "react-native"
import { BASE_URL, DEVICE_WIDTH } from "../config/env"
import shimmer from './../assets/shimmer.png'

function Card({ id, name, price, image, discount }) {
    return (
        <TouchableWithoutFeedback onPress={() => router.push(`/details/${id}`)}>
            <View style={{ width: DEVICE_WIDTH / 2 - 20, alignItems: "center", borderColor: "#cecece", borderWidth: 1, backgroundColor: "#cecece", padding: 10, borderRadius: 20 }} >
                <Image
                    alt="Product image"
                    defaultSource={shimmer}
                    style={{ width: DEVICE_WIDTH / 2 - 40, height: DEVICE_WIDTH / 2 - 40, marginBottom: 5, borderRadius: 10 }}
                    source={{ uri: `${BASE_URL}/${image}` }}
                />
                <Text style={{ textAlign: "center" }}>{name}</Text>
                <Text style={{ textAlign: "center" }}>{price.toFixed(2)} DT</Text>
                {
                    discount != 0 &&
                    <View style={{ padding: 5, position: "absolute", right: 5, top: 5, backgroundColor: "khaki", borderRadius: 20 }}>
                        <Text>-{discount}% OFF</Text>
                    </View>
                }
            </View>
        </TouchableWithoutFeedback>
    )
}

export default Card