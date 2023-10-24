import { Image } from "react-native";

function Logo() {
    return (
        <Image
            style={{ width: 60, height: 60 }}
            source={{ uri: 'https://cdn4.iconfinder.com/data/icons/e-commerce-432/64/shopping_cart-cart-commerce-shopping-supermarket-256.png' }}
        />
    );
}

export default Logo