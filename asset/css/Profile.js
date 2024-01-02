import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#0194e4",
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    info_header: {
        backgroundColor: "white",
        flexDirection: 'row',
        justifyContent: 'left',
        alignItems: 'center',
        width: '90%',
        height: '10%',
        minHeight: 70,
        borderRadius: 20,
        marginTop: 10,
        marginBottom: 10,
    },
    avatar: {
        minWidth: 40,
        minHeight: 40,
        width: 60,
        height: 60,
        borderRadius: 20,
        margin: 10,
        objectFit: 'contain'
    },
    name: {
        fontSize: 20,
        color: 'black',
    },
    body_container: {
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%',
    },
    info_container: {
        backgroundColor: 'rgba(255,255,255,0.9)',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '90%',
        borderRadius: 20,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 10,
        marginBottom: 10,
    },
    info_title: {
        color: 'black',
        fontSize: 18,
    },
    info: {
        color: 'black',
        fontSize: 14,
        maxWidth: '60%',
    },
    update_info: {
        backgroundColor: '#c39800',
        width: '60%',
        padding: 12,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    update_info_text: {
        fontSize: 20,
        fontWeight: '700',
        color: 'white',
    },
    update_info_box: {
        borderWidth: 1,
        borderColor: 'grey',
        width: '70%',
        borderRadius: 10,
        padding: 8,
        paddingTop:4,
        paddingBottom: 4,
        color: 'black',
    },
    update_date_box: {
        backgroundColor: 'white',
        borderRadius: 10,
        overflow: 'hidden',
    },
    footer: {
        height: '10%',
        minHeight: 70,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%',
    },
    back_btn: {
        backgroundColor: 'grey',
        padding: 10,
        borderRadius: 20,
    },
    update_btn: {
        backgroundColor: '#e8b400',
        padding: 10,
        borderRadius: 20,
    },
    btn_text: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16,
    }
})

export default styles;