import { ScrollView, View } from 'react-native';
import Card from '../components/Card';
import Banner from '../components/Banner';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_TOKEN, BASE_URL } from '../config/env'
import Loader from '../components/Loader';

export default function Main() {
    const [loading, setLoading] = useState(true)
    const [products, setProducts] = useState([])

    useEffect(() => {
        axios.get(`${BASE_URL}/api/products?populate=*`, {
            headers: { Authorization: `Bearer ${API_TOKEN}` }
        })
            .then(res => { setProducts(res.data.data); setLoading(false) })
            .catch(err => { console.error(err); setLoading(false) })
    }, [])

    return (
        <View style={{ flex: 1 }}>
            {loading && <Loader />}
            {
                !loading &&
                <>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Banner content="Featured products" />
                        <View style={{ rowGap: 10, padding: 10, display: "flex", flexWrap: "wrap", justifyContent: "space-between", flexDirection: "row" }}>
                            {
                                products.map(product => (
                                    <Card
                                        key={product.id}
                                        id={product.id}
                                        name={product.name}
                                        price={product.price}
                                        discount={product.discount}
                                        image={product.images[0].url}
                                    />
                                ))
                            }
                        </View>
                    </ScrollView>
                </>
            }
        </View>
    );
}
