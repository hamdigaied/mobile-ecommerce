import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import products from "./../../data/products.json"
import Banner from '../../components/Banner';
import { ScrollView } from 'react-native-gesture-handler';

export default function Details() {
    const [product, setProduct] = useState(null)
    const [imageStyle, setImageStyle] = useState()
    const { id } = useLocalSearchParams();

    useEffect(() => {
        let p = products.find(p => parseInt(id) === p.id)
        setProduct(p)
        Image.getSize(product?.image,
            (width, height) =>
                setImageStyle({ width: width, height: height })
        )
    }, [id])

    return (
        <View style={{ flex: 1 }}>
            <Banner content={product?.name} />
            <ScrollView>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Details product {id}</Text>
                    <Text>{JSON.stringify(Image.getSize(product?.image, (width, height) => setImageStyle({ width: width, height: height })))}</Text>
                    <Image
                        style={{ width: imageStyle?.width, height: imageStyle?.height, objectFit: "cover" }}
                        source={{ uri: product?.image }}
                    />
                </View>
            </ScrollView>
        </View>

    );
}
