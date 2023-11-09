import { Alert, Keyboard, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import PresentationModal from '../components/Modal';
import { useEffect, useState } from 'react';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { API_TOKEN, BASE_URL } from '../config/env';
import Loader from '../components/Loader';
import axios from 'axios';
import Category from '../components/Category';
import Card from '../components/Card';

export default function Products() {
    const [isModalVisible, setModalVisible] = useState(false);
    const [text, setSearchedProduct] = useState('');
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [filters, setFilters] = useState({ category: [], brand: [] })

    useEffect(() => {
        const getData = async () => {
            try {
                const categoriesRes = await axios.get(`${BASE_URL}/api/categories?populate=*`, {
                    headers: { Authorization: `Bearer ${API_TOKEN}` }
                })
                const productsRes = await axios.get(`${BASE_URL}/api/products?populate[categories][fields]=id&populate[brand][fields]=id&populate[images][fields]=url`, {
                    headers: { Authorization: `Bearer ${API_TOKEN}` }
                })
                setCategories(categoriesRes.data.data)
                setProducts(productsRes.data.data)
                setFilteredProducts(productsRes.data.data)
            } catch (error) {
                console.error(error)
            }
        }
        getData().then(() => setLoading(false))
    }, []);

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const searchProducts = () => {
        setLoading(true)
        const asyncProducts = async () => {
            let x = products.filter(p => p.name.includes(text.trimStart().trimEnd()))
            setFilteredProducts(x)
        }

        asyncProducts().then(setLoading(false))
    }

    useEffect(() => {
        console.log("filters to apply", filters);
        if (filters.category.length > 0) {
            const f = products.filter(fp => filters.category.some(c => fp.categories.map(cc => cc.id).includes(c)))
            setFilteredProducts(f)
        } else if (filters.brand.length > 0) {
            const f = products.filter(fp => filters.brand.some(c => fp.brand.id === c))
            setFilteredProducts(f)
        } else {
            setFilteredProducts(products)
        }
    }, [filters])

    return (
        <View style={{ flex: 1, padding: 10 }}>
            {loading && <Loader />}
            {
                !loading &&
                <>
                    <View style={{ display: "flex", flexDirection: "row", columnGap: 10, justifyContent: "space-between", alignItems: "center" }}>
                        <TextInput
                            style={{ borderRadius: 10, flexGrow: 1, borderColor: "black", borderStyle: 'solid', borderWidth: 1, paddingHorizontal: 5, paddingVertical: 10, fontSize: 15 }}
                            onChangeText={setSearchedProduct}
                            value={text}
                            placeholder='Search for a product...'
                        />
                        {
                            text &&
                            <TouchableOpacity style={{ position: "absolute", right: "10%" }} onPress={() => setSearchedProduct("")}>
                                <AntDesign name="close" size={24} color="black" />
                            </TouchableOpacity>
                        }
                        <TouchableOpacity disabled={text ? false : true} style={{ position: "absolute", right: "2%" }} onPress={searchProducts}>
                            <AntDesign name="search1" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={{ alignSelf: "flex-end", right: 0, marginVertical: 10 }} onPress={openModal}>
                        <Entypo name="sound-mix" size={24} color="black" />
                    </TouchableOpacity>
                    {
                        categories.length > 0 &&
                        <View style={{ display: "flex", flexDirection: "row" }}>
                            <ScrollView id='categories' horizontal={true} showsHorizontalScrollIndicator={false}>
                                {
                                    categories.map(category => (
                                        <Category
                                            key={category.id}
                                            id={category.id}
                                            name={category.name}
                                            icon={category.icon.url}
                                            type="category"
                                            setFilters={setFilters}
                                        />
                                    ))
                                }
                            </ScrollView>
                        </View>
                    }
                    {
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={{ rowGap: 10, display: "flex", flexWrap: "wrap", justifyContent: "space-between", flexDirection: "row", marginVertical: 10 }}>
                                {
                                    filteredProducts.map(filteredProduct => (
                                        <Card
                                            key={filteredProduct.id}
                                            id={filteredProduct.id}
                                            name={filteredProduct.name}
                                            price={filteredProduct.price}
                                            discount={filteredProduct.discount}
                                            image={filteredProduct.images[0].url}
                                        />
                                    ))
                                }
                            </View>
                        </ScrollView>
                    }
                    <PresentationModal isVisible={isModalVisible} closeModal={closeModal} setFilters={setFilters} />
                </>
            }
        </View>
    );
}
