import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../asset/css/Navbar';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MainStack from './MainStack';
import Scan from './Scan';
import Chat from './Chat';
import Setting from './Setting';
import Profile from './Profile';
import CreateBill from './CreateBill';

const Tab = createBottomTabNavigator();

const Navbar = () => {
    return (
        <Tab.Navigator screenOptions={{
            // unmountOnBlur: true,
            animationEnabled: true,
            headerShown: false,
            tabBarStyle: styles.navbar,
            tabBarLabelStyle: styles.button_text,
            tabBarActiveBackgroundColor: 'white',
            tabBarActiveTintColor: 'blue',}}>
            <Tab.Screen options={{
                tabBarIcon:() => (<Icon name="home" style={styles.icons}/>)
                }} name="Trang chủ" component={MainStack} />
            <Tab.Screen options={{
                tabBarIcon:() => (<Icon name="user" style={styles.icons}/>)
                }} name="Cá nhân" component={Profile}/>
            {/* <Tab.Screen options={{
                tabBarIcon:() => (<Icon name="barcode" style={styles.icons}/>)
                }} name="Quét" component={Scan}/>*/}
            <Tab.Screen options={{
                tabBarIcon:() => (<Icon name="cart-plus" style={styles.icons}/>)
                }} name="Lên đơn" component={CreateBill}/> 
                
            <Tab.Screen options={{
                tabBarIcon:() => (<Icon name="gear" style={styles.icons}/>)
                }} name="Cài đặt" component={Setting}/>
        </Tab.Navigator>
    )
}

export default Navbar;