import { Tabs } from 'expo-router/tabs';
import routes from '../config/routes';

export default function AppLayout() {

    return (
        <Tabs>
            {
                routes.map(route => (
                    <Tabs.Screen
                        key={route.name}
                        name={route.name}
                        options={route.options}
                    />
                ))
            }
        </Tabs>
    );
}
