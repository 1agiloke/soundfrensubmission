import React from 'react';
import { Platform, Button, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import Submission from './../screens/SubmissionScreen';
import {Ionicons} from '@expo/vector-icons';

const config = Platform.select({
    android: { headerMode: 'screen' },
    ios: { headerMode: 'float' },
  });

export default createStackNavigator({
        Submission: {
            screen: Submission,
            navigationOptions: ({navigation}) => ({
                title: 'Create Submission',
                headerLeft: ({onPress, titleStyle, title}) => (
                    <TouchableOpacity onPress={onPress}
                        style={{alignItems: 'center', alignSelf: 'center', justifyContent: 'center', marginLeft: 14, width: 40, height: 40, borderRadius: 20}}
                    >
                        <Ionicons name={Platform.select({ios: "ios-arrow-back", android: "md-arrow-back"})} style={{fontSize: 24}}/>
                    </TouchableOpacity>
                )
            })
        },
    },
    config
)
