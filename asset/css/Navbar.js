import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#c8e6f6',
        height: 64,
        marginTop: 'auto'
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 4,
    },
    icons: {
        display: 'flex',
        fontSize: 24,
        color: 'black',
        marginTop: 10,
    },
    button_text: {
        color: 'black',
        fontSize: 12,
        marginBottom: 10,
        fontWeight: '400',
    }
})

export default styles;