import { Alert, Image, Text, TouchableWithoutFeedback, View } from "react-native"

function Card() {
    return (
        <TouchableWithoutFeedback onPress={() => Alert.alert('You tapped the product!')}>
            <View style={{ alignItems: "center", borderColor: "#cecece", borderWidth: 1, backgroundColor: "#cecece", padding: 10, borderRadius: 10 }} >
                <Image
                    style={{ width: 160, height: 160 }}
                    source={{ uri: 'https://th.bing.com/th/id/OIP.WB68iMsuwZAVkAo5z5fMHQAAAA?pid=ImgDet&rs=1' }}
                />
                <Text style={{ textAlign: "center" }}>Shampoing Sunsilk</Text>
                <Text style={{ textAlign: "center" }}>30 DT</Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default Card