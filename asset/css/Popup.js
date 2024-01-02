import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    overlay: {
        backgroundColor: 'rgba(white,0,0,0.9)',
        position: 'absolute',
        bottom: 0,
        top: 0,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cancel_popup: {
        backgroundColor: "white",
        borderRadius: 20,
        alignItems: 'center',
        padding: 20,
        width: '85%',
    },
    cancel_title: {
        color: 'black',
        fontSize: 18,
    },
    cancel_reason: {
        color: 'black',
        borderColor: 'grey',
        borderWidth: 1,
        marginTop: 20,
        borderRadius: 20,
        padding: 10,
        width: '95%',
    },
    return: {
        backgroundColor: 'grey',
        padding: 16,
        borderRadius: 20,
        width: 100,
        alignItems: 'center',
    },
    submit_reason: {
        backgroundColor: 'red',
        padding: 16,
        borderRadius: 20,
        width: 100,
        alignItems: 'center',
    },
    button_text: {
        color: 'white',
        fontWeight: '700',
    },
        button_box: {
        marginLeft: 'auto',
        marginRight: 'auto',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        maxWidth: '90%',
        marginTop: '5%',
        width: '90%',
    },
})

export default styles;