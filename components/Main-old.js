import React, { useEffect } from 'react';
import { View, Text, ImageBackground , TouchableOpacity } from 'react-native';
import { getOrdersCount, setRoute, setType } from '../actions/ordersActions';
import PropTypes from 'prop-types';
import { useIsFocused } from '@react-navigation/native';

import { connect } from 'react-redux';

import styles from '../asset/css/Main';

import { WebSocketProvider, useWebSocket } from 'react-native-websocket';

const Main = ({ getOrdersCount, setType, setRoute, orders, navigation }) => {
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused){
      getOrdersCount();
      setRoute('home');
    }
  }, [isFocused]);

  const navigate = (type) => {
    if (orders.loading)
      return
    if (orders.orders_count.on_wait_count === 0 && type==='onwait')
      return
    if (orders.orders_count.on_ship_count === 0 && type==='onship')
      return
    if (orders.orders_count.on_done_count === 0 && type==='done')
      return
    if (orders.orders_count.on_month_count === 0 && type==='donemonth')
      return
    if (orders.orders_count.on_fail_count === 0 && type==='fail')
      return
    setType(type);    
    navigation.navigate('Delivery');
  }
//demo

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity
          style={{...styles.part_container}}
          onPress={() => navigate('onwait')}
        >
         
            <Text style={styles.delivery_text}>Chờ nhận</Text>
            <Text style={styles.delivery_number}>
              {orders.loading ? '--': orders.orders_count.on_wait_count}
            </Text>
            
          
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.part_container}
          onPress={() => navigate('onship')}
        >
          
            <Text style={styles.delivery_text}>Chờ giao</Text>
            <Text style={styles.delivery_number}>
              {orders.loading ? '--': orders.orders_count.on_ship_count}
            </Text>
         
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          style={{...styles.big_part_container, ...styles.done_month_background}}
          onPress={() => navigate('donemonth')}
        >
         
            <Text style={styles.delivery_text}>Đơn hoàn thành tháng này</Text>
            <Text style={{...styles.delivery_number_right, fontSize: 40}}>
              {orders.loading ? '--': orders.orders_count.on_month_count}
            </Text>
         
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
      
        <TouchableOpacity
          style={{...styles.big_part_container, ...styles.done_background}}
          onPress={() => navigate('done')}
        >
      
            <Text style={styles.delivery_text}>Tổng đơn hàng đã hoàn thành</Text>
            
            <Text style={{...styles.delivery_number_right, fontSize: 40}}>
              {orders.loading ? '--': orders.orders_count.on_done_count}
            </Text>
           
        </TouchableOpacity>
      </View>
    </View>
  );
};
//end demo
//   return (
//     <View style={styles.container}>
//       <View style={styles.row}>
//         <TouchableOpacity
//           style={styles.part_container}
//           onPress={() => navigate('onwait')}
//         >
//           <Text style={styles.delivery_text}>Đơn hàng đang chờ</Text>
//           <Text style={styles.delivery_number}>
//             {orders.loading ? '--': orders.orders_count.on_wait_count}
//           </Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.part_container}
//           onPress={() => navigate('onship')}
//         >
//           <Text style={styles.delivery_text}>Đơn hàng đang giao</Text>
//           <Text style={styles.delivery_number}>
//             {orders.loading ? '--': orders.orders_count.on_ship_count}
//           </Text>
//         </TouchableOpacity>
//       </View>
//       <View style={styles.row}>
//         <TouchableOpacity
//           style={{...styles.big_part_container, ...styles.done_month_background}}
//           onPress={() => navigate('donemonth')}
//         >
//           <Text style={styles.delivery_text}>Đơn hoàn thành tháng này</Text>
//           <Text style={{...styles.delivery_number, fontSize: 40}}>
//             {orders.loading ? '--': orders.orders_count.on_month_count}
//           </Text>
//         </TouchableOpacity>
//       </View>
//       <View style={styles.row}>
//         <TouchableOpacity
//           style={{...styles.big_part_container, ...styles.done_background}}
//           onPress={() => navigate('done')}
//         >
//           <Text style={styles.delivery_text}>Tổng đơn hàng đã hoàn thành</Text>
//           <Text style={{...styles.delivery_number, color: 'white', fontSize: 40}}>
//             {orders.loading ? '--': orders.orders_count.on_done_count}
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

Main.propTypes = {
  getOrdersCount: PropTypes.func.isRequired,
  orders: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  orders: state.orders,
});

export default connect(mapStateToProps, { getOrdersCount, setRoute, setType })(Main);
