import { Dimensions } from "react-native"

export const BASE_URL = process.env.EXPO_PUBLIC_API_URL
export const API_TOKEN = process.env.EXPO_PUBLIC_API_TOKEN
export const DEVICE_WIDTH = Dimensions.get('window').width
export const DEVICE_HEIGHT = Dimensions.get('window').height
