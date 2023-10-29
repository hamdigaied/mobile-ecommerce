import { Image, View } from "react-native";
import { DEVICE_WIDTH } from "../config/env";

function Loader() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Image
                style={{ width: DEVICE_WIDTH / 4, height: DEVICE_WIDTH / 4 }}
                source={require("./../assets/loader.gif")}
            />
        </View>
    );
}

export default Loader