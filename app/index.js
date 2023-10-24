import { Stack } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';
import Logo from '../components/Logo';
import Card from '../components/Card';

export default function Main() {

    return (
        <View style={{ flex: 1 }}>
            <Stack.Screen
                options={{
                    // https://reactnavigation.org/docs/headers#setting-the-header-title
                    title: 'Home',
                    // https://reactnavigation.org/docs/headers#adjusting-header-styles
                    headerStyle: { backgroundColor: '#f4511e' },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerTitleAlign: "center",
                    // https://reactnavigation.org/docs/headers#replacing-the-title-with-a-custom-component
                    headerTitle: props => <Logo {...props} />,
                }}
            />
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
