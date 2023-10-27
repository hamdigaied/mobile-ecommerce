import { ScrollView, Text, View } from 'react-native';
import Card from '../components/Card';
import products from './../data/products.json'
import Banner from '../components/Banner';

export default function Main() {

    return (
        <View style={{ flex: 1 }}>
            <Banner content="Explore" />
            <ScrollView>
                <View style={{ rowGap: 10, padding: 10, display: "flex", flexWrap: "wrap", justifyContent: "space-between", flexDirection: "row" }}>
                    {
                        products.map(product => (
                            <Card
                                key={product.id}
                                id={product.id}
                                name={product.name}
                                price={product.price}
                                image={product.image}
                            />
                        ))
                    }
                </View>
            </ScrollView>
        </View>
    );
}
