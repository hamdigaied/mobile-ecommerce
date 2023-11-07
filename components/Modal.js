import React, { useEffect, useState } from 'react';
import { View, Text, TouchableWithoutFeedback, ScrollView, Alert } from 'react-native';
import Modal from 'react-native-modal';
import Loader from './Loader';
import axios from 'axios';
import { API_TOKEN, BASE_URL, DEVICE_WIDTH } from '../config/env';
import Category from './Category';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

const PresentationModal = ({ isVisible, closeModal, setFilters }) => {
    const [loading, setLoading] = useState(true)
    const [brands, setBrands] = useState([])
    const [slider, setSlider] = useState([1, 100])

    useEffect(() => {
        axios.get(`${BASE_URL}/api/brands?populate=*`, {
            headers: { Authorization: `Bearer ${API_TOKEN}` }
        })
            .then(res => { setBrands(res.data.data); setLoading(false) })
            .catch(err => { console.error(err); setLoading(false) })
    }, [])

    return (
        <Modal
            isVisible={isVisible}
            swipeDirection={['down']} // Enable swipe to dismiss
            onSwipeComplete={closeModal} // Callback when swiped down
            onBackdropPress={closeModal}
            propagateSwipe={true}
            style={{ margin: 0, justifyContent: 'flex-end' }} // Position at the bottom
        >
            <View style={{ backgroundColor: 'white', height: "50%", padding: 10, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                {loading && <Loader />}
                {
                    !loading &&
                    <>
                        <View style={{ marginBottom: 10 }}>
                            <Text style={{ marginBottom: 10, fontSize: 18 }}>Filter by brand</Text>
                            {
                                brands.length > 0 &&
                                <View style={{ display: "flex", flexDirection: "row" }}>
                                    <ScrollView id='brands' horizontal={true}>
                                        {
                                            brands.map(brand => (
                                                <Category
                                                    key={brand.id}
                                                    id={brand.id}
                                                    name={brand.name}
                                                    icon={brand.logo.url}
                                                    type="brand"
                                                    setFilters={setFilters}
                                                />
                                            ))
                                        }
                                    </ScrollView>
                                </View>
                            }
                        </View>
                        <View style={{ marginBottom: 10 }}>
                            <Text style={{ marginBottom: 10, fontSize: 18 }}>Filter by price ({slider[0]} - {slider[1]})</Text>
                            <View style={{ alignItems: "center" }}>
                                <MultiSlider
                                    values={slider}
                                    sliderLength={DEVICE_WIDTH - 40}
                                    min={1}
                                    max={100}
                                    step={1}
                                    customMarker={() => <View style={{ height: 20, width: 20, borderRadius: 10, backgroundColor: "#ddd" }}></View>}
                                    onValuesChange={(values) => setSlider(values)}
                                />
                            </View>
                        </View>
                        <TouchableWithoutFeedback onPress={() => Alert.alert("Applying filters")}>
                            <View style={{ flexDirection: 'row', justifyContent: "center", marginTop: 10 }}>
                                <View style={{ backgroundColor: "orange", padding: 10, borderRadius: 10 }}>
                                    <Text style={{ fontSize: 20 }}>Apply</Text>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </>
                }
            </View>
        </Modal>
    );
};

export default PresentationModal;
