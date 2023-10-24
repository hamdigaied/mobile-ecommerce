import { Tabs } from 'expo-router/tabs';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

export default function AppLayout() {
    return (
        <Tabs>
            <Tabs.Screen
                name="index"
                options={{
                    tabBarIcon: () => <Entypo name="home" size={28} color="black" />
                }}
            />
            <Tabs.Screen
                name="products"
                options={{
                    tabBarIcon: () => <FontAwesome name="search" size={28} color="black" />
                }}
            />
            <Tabs.Screen
                name="cart"
                options={{
                    tabBarIcon: () => <Entypo name="shopping-cart" size={28} color="black" />
                }}
            />
            <Tabs.Screen
                name="about"
                options={{
                    tabBarIcon: () => <Entypo name="info-with-circle" size={28} color="black" />
                }}
            />
        </Tabs>
    );
}
