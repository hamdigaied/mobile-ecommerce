import { ScrollView, View } from 'react-native';
import Card from '../components/Card';
import Banner from '../components/Banner';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../config/env'
import Loader from '../components/Loader';

export default function Main() {
    const [loading, setLoading] = useState(true)
    const [products, setProducts] = useState([])

    useEffect(() => {
        axios.get(`${BASE_URL}/items/products?fields=*,images.directus_files_id`)
            .then(res => { setProducts(res.data.data); setLoading(false) })
            .catch(err => { console.error(err); setLoading(false) })
    }, [])

    return (
        <View style={{ flex: 1 }}>
            {loading && <Loader />}
            {
                !loading &&
                <Banner content="Explore" /> &&
                <ScrollView>
                    <View style={{ rowGap: 10, padding: 10, display: "flex", flexWrap: "wrap", justifyContent: "space-between", flexDirection: "row" }}>
                        {
                            products.map(product => (
                                <Card
                                    key={product.id}
                                    id={product.id}
                                    name={product.name}
                                    price={product.price}
                                    discount={product.discount}
                                    image={product.images[0].directus_files_id}
                                />
                            ))
                        }
                    </View>
                </ScrollView>
            }
        </View>
    );
}
