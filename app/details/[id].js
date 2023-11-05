import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Image, Text, TouchableWithoutFeedback, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import { API_TOKEN, BASE_URL, DEVICE_WIDTH } from "../../config/env"
import Carousel from 'react-native-reanimated-carousel';
import Loader from '../../components/Loader';
import { Entypo } from '@expo/vector-icons';
import shimmer from '../../assets/shimmer.png'

export default function Details() {
    const [loading, setLoading] = useState(true)
    const [product, setProduct] = useState(null)
    const [addedToWhishlist, setAddedToWhishlist] = useState(false)
    const { id } = useLocalSearchParams();

    useEffect(() => {
        setLoading(true)
        axios.get(`${BASE_URL}/api/products/${id}?populate[brand][populate][0]=logo&populate[images]=*`, {
            headers: { Authorization: `Bearer ${API_TOKEN}` }
        })
            .then(res => { setProduct(res.data.data); setLoading(false) })
            .catch(err => { console.error(err); setLoading(false) })
    }, [id])

    const newPriceAfterDiscount = () => {
        return product.price - ((product.price * product.discount) / 100).toFixed(2)
    }

    return (
        <View style={{ flex: 1 }}>
            {loading && <Loader />}
            {
                !loading && (
                    <ScrollView>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            {
                                product?.images.length > 1 ?
                                    <Carousel
                                        loop
                                        width={DEVICE_WIDTH}
                                        height={400}
                                        autoPlay={true}
                                        data={product?.images}
                                        scrollAnimationDuration={1000}
                                        renderItem={({ item }) => (
                                            <Image
                                                alt='Product carousel image'
                                                defaultSource={shimmer}
                                                key={item.id}
                                                style={{ height: 400 }}
                                                source={{ uri: `${BASE_URL}/${item.url}` }}
                                            />
                                        )}
                                    />
                                    :
                                    <Image
                                        alt='Product image'
                                        defaultSource={shimmer}
                                        style={{ width: DEVICE_WIDTH, height: 400 }}
                                        source={{ uri: `${BASE_URL}/${product.images[0].url}` }}
                                    />
                            }
                            <View style={{ textAlign: "left", padding: 10 }}>
                                <Text style={{ fontSize: 12, color: product?.status === "Available" ? "green" : "red" }}>{product?.status}</Text>
                                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                    <Text style={{ fontSize: 25, fontWeight: "500" }}>{product?.name}</Text>
                                    <Image
                                        alt='Brand'
                                        style={{ width: 50, height: 50 }}
                                        source={{ uri: `${BASE_URL}/${product.brand.logo.url}` }}
                                    />

                                </View>
                                {
                                    product?.discount === 0 &&
                                    <View style={{ marginVertical: 10 }}>
                                        <Text style={{ color: "grey", fontSize: 25 }}>{product?.price.toFixed(2)} DT</Text>
                                    </View>
                                }
                                {
                                    product?.discount > 0 &&
                                    <View style={{ flex: 1, flexDirection: "row", marginVertical: 10, columnGap: 10, alignItems: "center" }}>
                                        <Text style={{ color: "grey", fontSize: 20, textDecorationLine: "line-through" }}>{product?.price.toFixed(2)} DT</Text>
                                        <Text style={{ color: "grey", fontSize: 25, color: "#f4511e" }}>{newPriceAfterDiscount()} DT</Text>
                                    </View>
                                }
                                <Text>{product?.description}</Text>

                                <View style={{ display: "flex", flexDirection: "row", columnGap: 20 }}>
                                    <TouchableWithoutFeedback onPress={() => Alert.alert(`${product.name} added to cart !`)}>
                                        <View style={{ flexDirection: 'row', justifyContent: "center", marginTop: 10 }}>
                                            <View style={{ backgroundColor: "orange", padding: 10, borderRadius: 10 }}>
                                                <Text style={{ fontSize: 20 }}>Add to cart</Text>
                                            </View>
                                        </View>
                                    </TouchableWithoutFeedback>
                                    <TouchableWithoutFeedback onPress={() => setAddedToWhishlist(!addedToWhishlist)}>
                                        <View style={{ flexDirection: 'row', justifyContent: "center", marginTop: 10 }}>
                                            <View style={{ backgroundColor: "orange", padding: 10, borderRadius: 10 }}>
                                                <Entypo name={addedToWhishlist ? "heart" : "heart-outlined"} size={24} color="black" />
                                            </View>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                )
            }
        </View>

    );
}
