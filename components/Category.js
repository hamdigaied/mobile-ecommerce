import { Image, Text, TouchableWithoutFeedback, View } from "react-native"
import { BASE_URL } from "../config/env"
import shimmer from './../assets/shimmer.png'
import { useEffect, useState } from "react"

function Category({ id, name, icon, filters, setFilters }) {
    const [applied, setApplied] = useState(false)

    useEffect(() => {
        applied ?
            setFilters(prev => [...prev, id]) :
            setFilters(prev => [...prev.filter(p => p !== id)])
    }, [applied])

    return (
        <TouchableWithoutFeedback onPress={() => setApplied(!applied)}>
            <View style={{ marginRight: 20 }} >
                <View style={{ flexDirection: "row", justifyContent: "center" }}>
                    <View style={{ backgroundColor: applied ? "#a7a7a7" : "#ddd", padding: 10, borderRadius: "50%" }}>
                        <Image
                            alt="Category image"
                            defaultSource={shimmer}
                            style={{ width: 40, height: 40 }}
                            source={{ uri: `${BASE_URL}/${icon}` }}
                        />
                    </View>
                </View>
                <Text style={{ textAlign: "center", marginTop: 5 }}>{name}</Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default Category