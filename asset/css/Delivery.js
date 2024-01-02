import {StyleSheet} from 'react-native';
import { green } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';


const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#0194e4',
        paddingBottom: '2%',
        paddingTop: '2%',
    },
    noti_container0: {
        color: 'white',
        width: '90%',
        backgroundColor: '#cfffff',
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 15,
        padding: 20,
        borderWidthTop: 4,
        
        
    },
    noti_container1: {
        color: 'gray',
        width: '90%',
        backgroundColor: '#014a50',
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 14,
        padding: 20,
        borderWidthTop: 4,
        backgroundImage: `url(${require('../images/swip_blue_bg.webp')})`,
        
    },
    info_box: {
        
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: '2%',
        marginBottom: '2%',
    },
    info_small_box: {
        flexDirection: 'row',
    },
    //thay đổi màu chữ
    text_header0: {
        //color: 'black',
        fontSize: 14,
        fontWeight: '500',
        flexWrap: 'nowrap',
    },
    text_info0: {
       // color: 'black',
        fontSize: 14,
        maxWidth: '70%',
    },
    text_header1: {
        color: 'white',
        fontSize: 14,
        fontWeight: '500',
        flexWrap: 'nowrap',
    },
    text_info1: {
        color: 'white',
        fontSize: 14,
        maxWidth: '70%',
    },

    //[`text_header${item.loaiDonHang}`]
    //[`text_info${item.loaiDonHang}`]
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // hoặc 'stretch' tùy thuộc vào yêu cầu của bạn
        position: 'absolute',
        overlayColor: '90%',
        top: 10,
        left: 20,
        width: '10%',
        height: '10%',
        zIndex: -1,
    },
    backgroundOverlay: {
        ...StyleSheet.absoluteFillObject,
       // backgroundColor: 'rgba(255, 255, 255, 0.5)', // Điều chỉnh độ mờ tại đây
        zIndex: -1,
      },

    loading: {
        color: 'white',
        fontSize: 20,
        alignSelf: 'center',
        marginTop: 20,
    },
    button_box: {
        marginLeft: 'auto',
        marginRight: 'auto',
        flexDirection: 'row',
        justifyContent: 'space-between',
        maxWidth: '90%',
        marginTop: '5%',
        width: '90%',
    },
    next: {
        backgroundColor: '#d49d1d',
        padding: 20,
        paddingTop: 16,
        paddingBottom: 16,
        borderRadius: 20,
        textAlign: 'center',
        alignItems: 'center',
    },
    del: {
        backgroundColor: 'red',
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
})

export default styles;