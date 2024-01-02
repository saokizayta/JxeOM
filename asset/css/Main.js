import {StyleSheet} from 'react-native';
import React from 'react';




const styles = StyleSheet.create({
    
    container: {
        backgroundColor: "#0194e4",
        flex: 1,
    },
    

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: '6%',
             
    },
    delivery: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: '6%',
    },
    part_container: {
        backgroundColor: 'white',
        width: '44%',
        borderRadius: 20,
        minHeight: 100,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 10,
        paddingRight: 10,
        elevation: 10,
        shadowColor: 'black',
    },
    big_part_container: {
        flexDirection: 'row',
        backgroundColor: 'white',
        width: '94%',
        borderRadius: 20,
        minHeight: 100,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 20,
        paddingRight: 20,
        elevation: 10,
        shadowColor: 'black',
    },
    fail_background: {
        backgroundColor: '#c76758',
    },
    done_background: {
        backgroundColor: '#6fbe4d'
    },
    done_month_background: {
      
    },
    delivery_text: {
        fontSize: 16,
        fontWeight: '500',
        color: 'black',
        textAlign: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
        
        
    },
    delivery_number: {
        fontSize: 32,
        color: 'blue',
        textAlign: 'center',
    },
    delivery_number_right: {
        fontSize: 32,
        color: 'blue',
        textAlign: 'right',
    },
    images: {
        
        resizeMode: 'cover',
        
    },
    
    
    
})

export default styles;