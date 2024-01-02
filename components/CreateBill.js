import React from 'react';
import {View, Text} from 'react-native';
import { WebView } from 'react-native-webview'

import styles from '../asset/css/CreateBill';

const CreateBill = () => {
    return (
      <WebView
        source={{ uri: 'https://goixecauke.com/createdbill.html' }}
        style={{ flex: 1 }}
      />
    );
  };


export default CreateBill;