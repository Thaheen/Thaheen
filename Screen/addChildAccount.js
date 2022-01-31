import React , { useState }  from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  Alert,
  Modal,
  TouchableOpacity
} from 'react-native';

import { SvgUri }  from 'react-native-svg';
import TitleStyles from '../Styles/Titles'
import firestore from '@react-native-firebase/firestore';
import DropDownPicker from 'react-native-dropdown-picker';



const addChildAccount: () => Node = () => {
  DropDownPicker.setListMode("SCROLLVIEW");
  const [ChildName , setChildName]=useState('')
  const [ChildAccount , setChildAccount]=useState('')
  const [ChildPasscode , setChildPasscode]=useState('')
  const [repeatChildPasscode , setrepeatChildPasscode]=useState('')

   const [grade, setGrade] = useState('');
  const [open, setOpen] = useState(false);
  const [gradeValue, setgradeValue] = useState(null);

  const [ChildGrade, setChildGrade] = useState([
      {label: 'الروضة', value: 'الروضة'},
      {label: 'التعليم الابتدائي', value: 'التعليم الابتدائي'},
      {label: 'التعليم المتوسط', value: 'التعليم المتوسط'},
      {label: 'التعليم الثانوي', value: 'التعليم الثانوي'},
      {label: 'آخرى', value: 'آخرى'},
    ]);
  const [ChildSchool, setChildSchool]=useState('')

  // Check if name contain numbers
  const IsValidfield= (field) => {
      const RegxOfNames = /^[a-zA-Z\s\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF]*$/;
      return RegxOfNames.test(field);
    };

    //when submit button is pressed perform this
    const submit = () => {
      // Checking for empty fields
      if (
        ChildName == "" || 
        ChildAccount == "" ||
        ChildPasscode == "" ||
        repeatChildPasscode=="" ||
        ChildGrade == "" ||
        ChildSchool== null 
      ) {
        Alert.alert("تنبيه ", "جميع الحقول مطلوبة", [
          {
            text: "حسناً",
            style: "cancel",
          },
        ]);
  
        return
      } 
      if (IsValidfield(ChildName) == false) {
        Alert.alert("تنبيه", "حقل \"اسم الطفل\" يجب ان يحتوي على حروف فقط", [
          {
            text: "حسنًا",
            style: "cancel",
          },
        ]);
        return
      }
      if(ChildName.replace(/\s+/g,'').length > 30 || ChildName.replace(/\s+/g,'').length < 3){
        Alert.alert("تنبيه", "حقل اسم الطفل يجب ألا يقل عن ٣ أحرف وألا يتجاوز ٣٠ حرف ", [
          {
            text: "حسنًا",
            style: "cancel",
          },
        ]);
        return
      }
    };


  return (
    <View style={{backgroundColor:'#DAE2E9' , height:'100%' , justifyContent:'center' , alignItems:'center'}}>
        <SafeAreaView >

           
         <View style={{backgroundColor:'#FFFFFF',
             width :355,
            borderRadius:25,
            shadowColor: "#000",
            shadowOffset: {
	          width: 3,
	          height: 9,
              },
            shadowOpacity: 0.39,
            shadowRadius: 8.30,
            elevation: 13,
            alignItems:'center'}}>
            <Text style={[TitleStyles.sectionTitle ,{marginBottom:20}]}>
             إضافة حساب طفل 
            </Text>
            <TextInput
              placeholder="اسم الطفل"
              placeholderTextColor={"#C3C7CA"} 
              style={TitleStyles.input}
              onChangeText={(text) => setChildName(text)}
              value={ChildName}
              underlineColorAndroid="transparent"
              color="black"
            />

            <TextInput
              placeholder="@ اسم المستخدم "
              placeholderTextColor={"#C3C7CA"} 
              style={TitleStyles.input}
              onChangeText={(text) => setChildAccount(text)}
              value={ChildAccount}
              underlineColorAndroid="transparent"
              color="black"
            />

             <TextInput
              placeholder="رمز الدخول "
              placeholderTextColor={"#C3C7CA"} 
              style={TitleStyles.input}
              onChangeText={(text) => setChildPasscode(text)}
              value={ChildPasscode}
              underlineColorAndroid="transparent"
              secureTextEntry={true}
              color="black"
            />

            <TextInput
              placeholder="تأكيد رمز الدخول "
              placeholderTextColor={"#C3C7CA"} 
              style={TitleStyles.input}
              onChangeText={(text) => setrepeatChildPasscode(text)}
              value={repeatChildPasscode}
              underlineColorAndroid="transparent"
              secureTextEntry={true}
              color="black"
            />

             <DropDownPicker
              style={TitleStyles.dropDownStyle}
              textStyle={TitleStyles.categoryText}
              containerStyle={{ marginBottom: 15}}
              dropDownContainerStyle={{borderColor: '#C7C7CD', backgroundColor:'#f2f4f7'}}
              placeholderStyle={{color: '#C7C7CD'}}
              open={open}
              value={gradeValue}
              items={ChildGrade}
              setOpen={setOpen}
              setValue={setgradeValue}
              setItems={setChildGrade}
              placeholder='المرحلة الدراسية'
              onChangeValue={value => setGrade(value)}
            />


            <TextInput
              placeholder="اسم المدرسة (اختياري)"
              placeholderTextColor={"#C3C7CA"} 
              style={TitleStyles.input}
              onChangeText={(text) => setChildSchool(text)}
              value={ChildSchool}
              underlineColorAndroid="transparent"
              color="black"
            />

            <TouchableOpacity
            style={TitleStyles.Button}>
             <Text  style={TitleStyles.ButtonText} >إضافة حساب </Text>
            </TouchableOpacity>

            
            </View>
        </SafeAreaView>
    </View>
  );
};



export default addChildAccount;
