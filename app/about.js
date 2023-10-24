import { Stack } from 'expo-router';
import { Text, View } from 'react-native';
import Logo from '../components/Logo';

export default function About() {

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Stack.Screen
                options={{
                    // https://reactnavigation.org/docs/headers#setting-the-header-title
                    title: 'About',
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
            <Text>About Screen</Text>
        </View>
    );
}
