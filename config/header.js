import Logo from "../components/Logo";

const headerConfig = {
    headerTitle: props => <Logo />,
    headerStyle: { backgroundColor: '#f4511e' },
    headerTintColor: '#fff',
    headerTitleStyle: {
        fontWeight: 'bold',
    },
    headerTitleAlign: "center",
}

export default headerConfig