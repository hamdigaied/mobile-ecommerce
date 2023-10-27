import { ScrollView, Text, View } from 'react-native';
import Card from '../components/Card';

export default function Main() {

    return (
        <View style={{ flex: 1 }}>
            <View style={{ backgroundColor: "grey", paddingVertical: 20, width: "100%" }}>
                <Text style={{ textAlign: "center" }}>Explore</Text>
            </View>
            <ScrollView>
                <View style={{ rowGap: 10, padding: 10, display: "flex", flexWrap: "wrap", justifyContent: "space-between", flexDirection: "row" }}>
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                </View>
            </ScrollView>
        </View>
    );
}
