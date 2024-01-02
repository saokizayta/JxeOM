import {StyleSheet} from 'react-native';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        textAlign: 'center',
        alignItems: 'center',
        backgroundColor: "#0194e4",
    },
    setting_part: {
        width: '100%',
        flex: 1,
    },
    part_container: {
        alignSelf: 'center',
        backgroundColor: 'white',
        flexDirection: 'row',
        width: '90%',
        width: '90%',
        borderRadius: 20,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 10,
        marginBottom: 10,
        elevation: 20,
        shadowColor: 'black',
        alignItems: 'center',
        justifyContent: 'space-between',
        // marginTop: 30,
    },
    part_title: {
        color: 'black',
        fontSize: 18,
    },
    part_content: {
        color: 'grey',
        fontSize: 14,
    },
    logout: {
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 14,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 22,
        bottom: 10,
        right: 10,
        position: 'absolute',
        elevation: 10,
    },
    icons: {
        color: 'black',
        fontSize: 20,
        marginRight: 6,
    },
    logout_text: {
        color: 'black',
        fontSize: 14,
        fontWeight: '500',
    },
    contact: {
        alignItems: 'center',
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.2)',
        padding: 10,
    },
    contact_big_title: {
        color: 'white',
        fontSize: 18,
        marginBottom: 10,
    },
    contact_title: {
        fontSize: 16,
    },
    part_contact: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 38,
    },
    contact_content: {
        color: 'white',
        maxWidth: '80%',
    },
})

export default styles;