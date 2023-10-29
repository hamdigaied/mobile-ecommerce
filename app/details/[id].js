import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Dimensions, Image, Text, View } from 'react-native';
import Banner from '../../components/Banner';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import { BASE_URL, DEVICE_WIDTH } from "../../config/env"
import Carousel from 'react-native-reanimated-carousel';
import Loader from '../../components/Loader';

export default function Details() {
    const [loading, setLoading] = useState(true)
    const [product, setProduct] = useState(null)
    const { id } = useLocalSearchParams();

    useEffect(() => {
        setLoading(true)
        axios.get(`${BASE_URL}/items/products/${id}?fields=*,brand.*,images.directus_files_id`)
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
                                                key={item.directus_files_id}
                                                style={{ height: 400 }}
                                                source={{ uri: `${BASE_URL}/assets/${item.directus_files_id}` }}
                                            />
                                        )}
                                    />
                                    :
                                    <Image
                                        style={{ width: DEVICE_WIDTH, height: 400 }}
                                        source={{ uri: `${BASE_URL}/assets/${product.images[0].directus_files_id}` }}
                                    />
                            }
                            <View style={{ textAlign: "left", padding: 10 }}>
                                <Text style={{ fontSize: 12, color: product?.status === "Available" ? "green" : "red" }}>{product?.status}</Text>
                                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                    <Text style={{ fontSize: 25, fontWeight: "500" }}>{product?.name}</Text>
                                    <Image
                                        style={{ width: 50, height: 50 }}
                                        source={{ uri: `${BASE_URL}/assets/${product.brand.logo}` }}
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
                            </View>
                        </View>
                    </ScrollView>
                )
            }
        </View>

    );
}
