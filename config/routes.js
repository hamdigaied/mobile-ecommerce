import { Entypo, FontAwesome } from "@expo/vector-icons"
import headerConfig from "./header"

const routes = [
    {
        name: "index",
        options: {
            title: "Home",
            tabBarIcon: () => <Entypo name="home" size={28} color="black" />,
            ...headerConfig
        }
        
    },
    {
        name: "products",
        options: {
            title: "Search",
            tabBarIcon: () => <FontAwesome name="search" size={28} color="black" />,
            ...headerConfig
        }
        
    },
    {
        name: "cart",
        options: {
            title: "Cart",
            tabBarIcon: () => <Entypo name="shopping-cart" size={28} color="black" />,
            ...headerConfig
        }
    },
    {
        name: "about",
        options: {
            title: "About",
            tabBarIcon: () => <Entypo name="info-with-circle" size={28} color="black" />,
            ...headerConfig
        }
    },
    {
        name: "details/[id]",
        options: {
            ...headerConfig,
            href: null
        }
    }
]

export default routes