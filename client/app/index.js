import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { Link, useRouter } from 'expo-router'
import React, { useState } from 'react'
import {RecoilRoot, useRecoilValue} from 'recoil'
import App from './src/App'


export default function Page() { 
  return (
    <RecoilRoot>
      <App/>
     </RecoilRoot>
    
  );
}
