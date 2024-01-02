import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '95%',
        backgroundColor: '#f6f7fb',
        borderRadius: 20,
        alignSelf: 'center',
        top: 70,
        maxHeight: '82%',
    },
    noti_container: {
        width: '90%',
        backgroundColor: 'white',
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 14,
        padding: 18,
        elevation: 2,
        shadowColor: 'black',
        borderWidth: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    state: {
        fontWeight: '700',
        fontStyle: 'italic',
        fontSize: 14,
    },
    title: {
        fontSize: 20,
        color: 'black',
        fontWeight: '600',
    },
    content: {
        color: 'black',
        margin: 8,
    },
    timestamp: {
        color: 'grey',
        textAlign: 'right',
    },
    footer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btn: {
        backgroundColor: '#ffc600',
        width: 36,
        height: 36,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 18,
    },
    btn_text: {
        fontSize: 26,
        fontWeight: '900',
        color: 'white',
    }
})

export default styles;