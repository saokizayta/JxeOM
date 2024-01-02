import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#c8e6f6',
        padding: 8,
    },
    userinfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
        objectFit: 'contain',
        borderWidth: 2,
        borderColor: 'white',
    },
    greeting: {
        fontSize: 16,
        color: 'black',
    },
    notificationButton: {
        padding: 5,
    },
    icons: {
        color: 'black',
        fontSize: 26,
    },
    notify_number: {
        backgroundColor: 'red',
        position: 'absolute',
        borderRadius: 20,
        width: 18,
        height: 18,
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        textAlign: 'center',
        right: 0,
        fontSize: 12,
    },
    time: {
        color: '#ff0077',
        fontSize: 16,
        fontWeight: '500',
    },
})

export default styles;