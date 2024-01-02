import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
        bottom: 0,
        top: 0,
        backgroundColor: "#0194e4",
        alignItems: 'center',
        justifyContent: 'center',
    },
    box: {
        backgroundColor: 'white',
        borderRadius: 30,
        width: '84%',
        maxHeight: '90%',
        overflow: 'hidden'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(255,198,0,0.3)',
        padding: 20,
    },
    body: {
        padding: 20,
        paddingTop: 10,
        paddingBottom: 10,
    },
    spacer: {
        height: 16,
    },
    footer: {
        backgroundColor: 'rgba(255,198,0,0.3)',
        paddingBottom: 4,
    },
    row: {
        paddingTop: 8,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    line: {
        width: '100%',
        height: 2,
        backgroundColor: '#ffc600',
    },
    info_box: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 2,
        marginBottom: 2,
        paddingLeft: 8,
        paddingRight: 8,
    },
    title: {
        color: 'black',
        fontWeight: '600',
        fontSize: 14,
    },
    phone: {
        maxWidth: '65%',
        padding: 4,
    },
    content: {
        maxWidth: '60%',
        color: 'black',
        fontSize: 16,
        textAlign: 'center',
        alignSelf: 'center',
    },
    price: {
        backgroundColor: '#ffc600',
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 8,
        color: 'white',
        fontWeight: '600',
    },
    distance: {
        backgroundColor: '#ffc600',
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 8,
        color: 'white',
        fontWeight: '600',
    },
    button_box: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        maxWidth: '90%',
        marginTop: '5%',
        width: '80%',
    },
    return: {
        backgroundColor: 'grey',
        padding: 20,
        paddingTop: 16,
        paddingBottom: 16,
        borderRadius: 20,
        width: 110,
        textAlign: 'center',
        alignItems: 'center',

    },
    accept: {
        backgroundColor: '#ff0077',
        padding: 20,
        paddingTop: 16,
        paddingBottom: 16,
        borderRadius: 20,
        width: 110,
        textAlign: 'center',
        alignItems: 'center'
    },
    button_text: {
        color: 'white',
        fontWeight: '700',
    },
    msg: {
        marginTop: 10,
        color: '#ffc600',
        fontSize: 16,
        fontWeight: '700',
        textShadowColor: 'white',
        alignSelf: 'center',
    }
})

export default styles;