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

import TitleStyles from '../Styles/Titles'
import firestore from '@react-native-firebase/firestore';
import DropDownPicker from 'react-native-dropdown-picker';
import { SvgUri } from 'react-native-svg';
import  CheckVector  from '../assets/images/CheckVector.svg'
import Top2Lines from '../assets/images/top2Lines.svg'
import Bottom2Lines from '../assets/images/bottom2Lines.svg'

const SignUp: () => Node = () => {
  DropDownPicker.setListMode("SCROLLVIEW");
  const [FullName , setFullName]=useState('')
  const [Email , setEmail]=useState('')
  const [Phone , setPhone]=useState('')
  const [Password , setPassword]=useState('')
  const [ConfirmPassword , setConfirmPassword]=useState('')

  const [open, setOpen] = useState(false);
// choosen option
  const [TypeValue, setTypeValue] = useState(null);

//list options 
  const [AccountType, setAccountType] = useState([
      {label: 'معلم', value: 'معلم'},
      {label: 'ولي/ـة امر', value: ' ولي/ـة امر '},

    ]);
    const IsValidPass = (password) => {
    const strongPass = new RegExp(
     // "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
   "^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    return strongPass.test(password);
  };
  const IsValidPhone = (phone) => {
    const RegxPhone = /^[0-9]*$/;
    return RegxPhone.test(phone);
  };

  const IsValidPhoneStart = (phone) => {
    var regex = new RegExp(/^(05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/);
    return regex.test(phone);
  };

    //Success modal 
    const [modalVisible, setModalVisible] = useState(false);

  // Check if name contain numbers
  const IsValidfield= (field) => {
      const RegxOfNames = /^[a-zA-Z\s\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF]*$/;
      return RegxOfNames.test(field);
    };

    //when submit button is pressed perform this
    const submit = () => {
      // Checking for empty fields
      if (
        FullName == "" || 
        Email == "" ||
        Phone == "" || 
        Password == "" ||
        ConfirmPassword==""  )

      {
        Alert.alert("تنبيه ", "جميع الحقول مطلوبة", [
          {
            text: "حسناً",
            style: "cancel",
          },
        ]);
  
        return
      } 
      if (IsValidfield(FullName) == false) {
        Alert.alert("تنبيه", "حقل \"الاسم الكامل \" يجب ان يحتوي على حروف فقط", [
          {
            text: "حسنًا",
            style: "cancel",
          },
        ]);
        return
      }
      if(FullName.replace(/\s+/g,'').length > 30 || FullName.replace(/\s+/g,'').length <  2){
        Alert.alert("تنبيه", "حقل الاسم الكامل يجب ألا يقل عن حرفين وألا يتجاوز ٣٠ حرف ", [
          {
            text: "حسنًا",
            style: "cancel",
          },
        ]);
        return
      }
if (IsValidPhone(Phone) == false) {
      Alert.alert(
        "تنبيه",
        " يجب ان يكون رقم الهاتف من أرقام إنجليزية فقط ",

        [
          {
            text: "حسنًا",
            onPress: () => console.log("yes Pressed"),
            style: "cancel",
          },
        ]
      );
      return;
    }
    if (IsValidPhoneStart(Phone) == false) {
      Alert.alert(
        "تنبيه",
        " يجب أن يبدأ الرقم بـ 05 ويتبعه 8 خانات فقط",

        [
          {
            text: "حسنًا",
            onPress: () => console.log("yes Pressed"),
            style: "cancel",
          },
        ]
      );
      return;
    }
  
    if (IsValidPass(Password) == false) {
      Alert.alert(
        "كلمة السر ضعيفة ",
        "كلمة السر لا تستوفي الشروط المطلوبة",

        [
          {
            text: "حسنًا",
            onPress: () => console.log("yes Pressed"),
            style: "cancel",
          },
        ]
      );
      return;
    }

      if (Password !== ConfirmPassword) {
      Alert.alert("تنبيه ", "كلمة المرور وتأكيد رمز كلمة المررور يجب أن تتطابق", [
        {
          text: "حسنًا",
          onPress: () => console.log("yes Pressed"),
          style: "cancel",
        },
      ]);
      return;
    }


    setModalVisible(!modalVisible)
    };

  return (
    <View >
        <SafeAreaView style={{backgroundColor:'#DAE2E9' , height:'100%' , justifyContent:'center' , alignItems:'center'}} >


          <Top2Lines style={[TitleStyles.shadowOffset,{position: 'absolute', top: 0, left: 0}]} />
          <Bottom2Lines style={[TitleStyles.shadowOffset,{position: 'absolute', bottom: 0, right: 0}]} />
           <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisible}
            >
              <View style={{backgroundColor:'rgba(52, 52, 52, 0.5)', height: '100%' }}>
                <View style={TitleStyles.modalContent}>
                <CheckVector width={120} height={120} style={{marginLeft:80 , marginTop:-75}} />
                    <Text style={[TitleStyles.subTitle , {textAlign:'center' , fontWeight:'bold'}]}>تمت إضافة الطفل بنجاح</Text>
                     <TouchableOpacity
                        style={[TitleStyles.Button , TitleStyles.shadowOffset,{backgroundColor:'#DAE2E9'}]}
                         onPress={() => setModalVisible(!modalVisible)} >
                        <Text  style={TitleStyles.ButtonText} >حسنا </Text>
                      </TouchableOpacity>

                </View>
              </View>
              
            </Modal>
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
            padding:25,
            marginTop:70}}>
            <Text style={[TitleStyles.sectionTitle ,{marginBottom:20}]}>
            إنشاء حساب
            </Text>
            <View style={TitleStyles.shadowOffset}>
            <TextInput
              placeholder="الاسم الكامل"
              placeholderTextColor={"#C3C7CA"} 
              style={[TitleStyles.input]}
              onChangeText={(text) => setFullName(text)}
              value={FullName}
              underlineColorAndroid="transparent"
              color="black"
            />
            </View>
             <View style={[TitleStyles.shadowOffset,{zIndex: 1000, elevation: 1000}]}>
             <DropDownPicker
              style={TitleStyles.dropDownStyle}
              textStyle={TitleStyles.categoryText}
              containerStyle={{ }}
              dropDownContainerStyle={{borderColor: '#C7C7CD', backgroundColor:'#f2f4f7'}}
              placeholderStyle={{color: '#C7C7CD'}}
              open={open}
              value={TypeValue}
              items={AccountType}
              setOpen={setOpen}
              setValue={setTypeValue}
              setItems={setAccountType}
              placeholder='نوع الحساب'
              onChangeValue={value => setGrade(value)}
            />
            </View>


            <View style={TitleStyles.shadowOffset}>
            <TextInput
              placeholder="البريد الالكتروني "
              placeholderTextColor={"#C3C7CA"} 
              style={TitleStyles.input }
              onChangeText={(text) => setEmail(text)}
              value={Email}
              underlineColorAndroid="transparent"
              color="black"
            />
            </View>

            <View style={TitleStyles.shadowOffset}>
             <TextInput
              placeholder="رقم الجوال"
              placeholderTextColor={"#C3C7CA"} 
              style={TitleStyles.input}
              onChangeText={(text) => setPhone(text)}
              keyboardType='number-pad'
              value={Phone}
              underlineColorAndroid="transparent"
              secureTextEntry={true}
              color="black"
            />
            </View>

       <View style={TitleStyles.shadowOffset}>
            <TextInput
              placeholder=" كلمة المرور"
              placeholderTextColor={"#C3C7CA"} 
              style={TitleStyles.input}
              onChangeText={(text) => setPassword(text)}
              value={Password}
              keyboardType='number-pad'
              underlineColorAndroid="transparent"
              secureTextEntry={true}
              color="black"
            />
            </View>
            <View style={TitleStyles.shadowOffset}>
            <TextInput
              placeholder="تأكيد كلمة المرور"
              placeholderTextColor={"#C3C7CA"} 
              style={TitleStyles.input}
              onChangeText={(text) => setConfirmPassword(text)}
              value={ConfirmPassword}
              keyboardType='number-pad'
              underlineColorAndroid="transparent"
              secureTextEntry={true}
              color="black"
            />
            </View>

    

            <TouchableOpacity
            style={[TitleStyles.Button ,  TitleStyles.shadowOffset , {marginBottom:30, marginTop:30}]}
            onPress={() => submit()} >
             <Text  style={TitleStyles.ButtonText} >إنشاء حساب</Text>
            </TouchableOpacity>

            
            </View>

            
        </SafeAreaView>
    </View>
  );
};



export default SignUp;
