import { StyleSheet, Platform, StatusBar } from "react-native";

export default StyleSheet.create({
    DroidSafeArea: {
        flex: 1,
        backgroundColor: "black",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    }
});