import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#0194e4",
        flex: 1,
        alignItems: 'center',
    },
    logo_space: {
        flex: 1,
        maxHeight: 400,
        justifyContent: 'center',
    },
    logo: { 
        alignSelf: 'center',
        height: '40%',
        resizeMode: 'contain',
    },
    form_space: {
        width: '100%',
        alignSelf: 'center',
        paddingBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    warning: {
        color: 'red',
        marginBottom: 8,
        lineHeight: 16,
        fontWeight: '600',
    },
    input_container: {
        backgroundColor: 'white',
        width: '90%',
        borderRadius: 14,
        paddingLeft: 16,
        alignSelf: 'center',
        paddingRight: 20,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    icons: {
        color: 'grey',
        paddingRight: 10,
        fontSize: 20,
    },
    field: {
        color:'black',
        fontSize: 16,
        flex: 1,
    },
    btn: {
        alignSelf: 'center',
        width: '50%',
        backgroundColor: '#ff0077',
        padding: 16,
        borderRadius: 20,
        paddingLeft: 20,
        paddingRight: 20,
        alignItems: 'center',
    },
    hide_btn: {
        position: 'absolute',
        right: 6,
    },
    btn_text: {
        color: 'white',
        fontSize: 18,
        fontWeight: '800',
    },
    forgot_save: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
        marginBottom: 20,
    },
    save: {
        flexDirection: 'row',
    },
    save_text: {
        color: 'white',
        fontSize: 14,
    },
    forget_text: {
        color: '#ffc600',
        fontSize: 14,
        fontWeight: '500',
    }
})

export default styles