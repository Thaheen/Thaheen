import {StyleSheet, I18nManager, Platform, StatusBar} from 'react-native';

export default StyleSheet.create({
  // Main titles

  sectionTitle: {
    fontFamily: 'AJannatLT-Bold',
    fontSize: 35,
    textAlign: 'center',
    color: '#43515F',
  },

  HeaderTitle: {
    fontFamily: 'AJannatLT-Bold',
    fontSize: 30,
    color: '#43515F',
    marginTop: Platform.OS === 'ios' ? 10 : StatusBar.currentHeight,
  },

  // sub headings
  subTitle: {
    fontFamily: 'AJannatLT',
    fontSize: 18,
    color: '#637081',
    textAlign: I18nManager.isRTL ? 'left' : 'right',
  },

  smallText: {
    fontFamily: 'AJannatLT-Bold',
    color: '#43515F',
    fontSize: 16,
    textDecorationLine: 'none',
  },
  //Profile Title
  ProfileTitle: {
    fontFamily: 'AJannatLT',
    fontSize: 24,
    color: '#43515F',
    textAlign: 'center',
  },
  profileText: {
    fontFamily: 'AJannatLT',
    fontSize: 17,
    color: '#808182',
    textAlign: I18nManager.isRTL ? 'left' : 'right',
    marginTop: 15,
    ...(I18nManager.isRTL ? {marginLeft: 20} : {marginRight: 20}),
  },

  textInput: {
    borderBottomWidth: 1,
    width: '90%',
    marginLeft: 20,
    //
    color: '#808182',
    paddingHorizontal: 10,
    fontFamily: 'AJannatLT-Bold',
    fontSize: 16,
    color: '#808182',
    textAlign: 'right',
    borderColor: 'rgb(186, 183, 176)',
  },

  input: {
    overflow: 'hidden',
    backgroundColor: '#f8f4f4',
    height: 52,
    borderRadius: 10,
    fontFamily: 'AJannatLT-Bold',
    fontSize: 18,
    textAlign: 'right',
    paddingRight: 5,
    marginTop: 10,
    color: '#fff',
  },
  dropDownStyle: {
    marginTop: 10,
    borderColor: '#f8f4f4',
    flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse',
    backgroundColor: '#f8f4f4',
  },
  categoryText: {
    textAlign: I18nManager.isRTL ? 'left' : 'right',
    fontFamily: 'AJannatLT-Bold',
    fontSize: 18,
  },

  Button: {
    backgroundColor: '#F5C5AD',
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 13,
    shadowColor: '#00000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 9,
    elevation: 9,
  },

  ButtonText: {
    fontFamily: 'AJannatLT-Bold',
    fontSize: 23,
    color: '#43515F',
    textAlign: 'center',

  },
  dropdownButtonText: {
     textAlign: I18nManager.isRTL ? 'left' : 'right',
    fontFamily: 'AJannatLT-Bold',
    fontSize: 16,
    color:"#B4B4B4"
    },

  AlertButton: {
    backgroundColor: '#F5C5AD',
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 25,
    // shadowColor: "#00000",
    //        shadowOffset: {
    //        width: 0,
    //        height: 4,
    //         },
    //       shadowOpacity: 0.25,
    //       shadowRadius: 9,
    //       elevation: 9,
  },

  modalContent: {
    margin: 20,
    marginBottom: 'auto',
    marginTop: 'auto',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  shadowOffset: {
    shadowColor: '#00000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 9,
    elevation: 9,
  },
  WarningText: {
    fontFamily: 'AJannatLT-Bold',
    fontSize: 16,
    color: '#EFA17A',
    textAlign: I18nManager.isRTL ? 'left' : 'right',
  },

  childItem: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#F3DBBD',
    borderRadius: 88,
    margin: 10,
    height: 75,
    flexDirection: 'row',
  },
  childItemText: {
    fontSize: 35,
    ...(Platform.OS === 'ios'
      ? {fontFamily: 'AJannatLT', fontWeight: '700'}
      : {fontFamily: 'AJannatLT-Bold'}),
    color: '#43515F',
  },
  innerChildItem: {
    paddingRight: 10,
  },
  TextArea: {
    backgroundColor: 'white',
    borderRadius: 10,
    fontFamily: 'AJannatLT-Bold',
    fontSize: 18,
    textAlign: 'right',
    paddingBottom: '60%'

  },
  Title: {
    backgroundColor: 'white',
    borderRadius: 10,
    fontFamily: 'AJannatLT-Bold',
    fontSize: 18,
    textAlign: 'right',
    paddingLeft: 12,
    marginTop: 10,
    marginBottom: 10,
    width: '80%',
    height: '6%',
  },
  buttonStyle: {
    backgroundColor: 'white',
       borderRadius: 15,
    fontFamily: 'AJannatLT-Bold',
    fontSize: 18,

    width:'29%',

  },
  buttonStyle2: {
    backgroundColor: 'white',
    borderRadius: 12,
       borderRadius: 15,
    borderColor:'#8E8D8D',
    fontFamily: 'AJannatLT-Bold',
    fontSize: 18,
    width:'25%',
      

  },


  /////Access Passcode Style////
  containerInput: {
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellView: {
    paddingVertical: 11,
    width: 40,
    height: 50,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#E5E5E5',
    borderWidth: 1,
    borderRadius: 10,
  },

  cellText: {
    textAlign: 'center',
    fontSize: 16,
    width: 40,
  },

  HomeSectioner: {
    flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(243, 218, 171, 0.47)',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal: 15,
  },

  SoftShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2.22,
    elevation: 3,
  },

  //BottomBar Style

  Bottom1: {
    backgroundColor: 'rgb(218,226,233)',
    width: 390,
    height: 90,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 20,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },

  Bottom2: {
    backgroundColor: '#FFFFFF',
    width: 390,
    height: 90,
    marginTop: 10,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    flex: 1,
    justifyContent: 'space-around',
    flexDirection: 'row',
  },

  ProfileIcon: {
    marginTop: 15,
    // marginLeft: 15,
  },

  profileTextIcon: {
    color: '#43515F',
    fontFamily: 'AJannatLT',
    fontSize: 11,
    //marginLeft: 24,
  },

  //Student Profile page ui style
  BlueContianer: {
    width: 390,
    height: 220,
    backgroundColor: '#DAE2E9',
    //flex: 5,
    //marginBottom: 9,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  WhiteContianer: {
    width: 330,
    height: 245,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    alignSelf: 'center',
    shadowOffset: {
      width: 3,
      height: 9,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
    marginTop: 36,
  },

  Profilename: {
    textAlign: 'center',
    marginTop: 20,
    fontFamily: 'AJannatLT-Bold',
    fontSize: 20,
    color: '#808182',
  },
  ProfileUsername: {
    fontFamily: 'AJannatLT',
    textAlign: 'center',
    color: '#808182',
    fontSize: 18,
    //marginBottom: ,
    marginTop: -4,
  },

  EditBtn: {
    borderColor: '#DAE2E9',
    borderWidth: 1,
    width: 136,
    height: 29,
    borderRadius: 25,
    alignSelf: 'center',
    marginTop: 10,
  },

  dropDownStyle2: {
    borderBottomWidth: 1,
    borderWidth: 0,
    width: '90%',
    borderBottomWidth: 1,
    marginLeft: 20,
    borderColor: 'rgb(186, 183, 176)',

    //flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse',
    // marginTop: 10,
    //borderColor: '#f8f4f4',
    //color: '#808182',
    //paddingHorizontal: 10,
    //fontFamily: 'AJannatLT-Bold',
    //fontSize: 14,
    //textAlign: 'right',
  },

  InstructorCard: {
    flexDirection: 'row-reverse',
    alignSelf: 'center',
    padding: 30,
    backgroundColor: '#FFFFFF',
    margingTop: 90,
    borderRadius: 25,
  },

  InstructorSubCard: {
    height: 100,
    width: 100,
    alignItems: 'center',
    borderRightWidth: 0.5,
    borderRightColor: '#BFBFBF',
  },

  //Instructor Profile style ////
  circle: {
    width: 89,
    height: 88,
    borderRadius: 200,
    backgroundColor: '#FFFFFF',
    alignSelf: 'center',
    marginTop: 35,
    alignItems: 'center',
    paddingVertical: 15,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  Profilename2: {
    textAlign: 'center',
    marginTop: 20,
    fontFamily: 'AJannatLT-Bold',
    fontSize: 20,
    color: '#43515F',
  },

  NotAvailableAlert: {
    fontSize: 24,
    fontFamily: 'AJannatLT',
    color: '#43515F',
    position: 'absolute',
    top: 420,
    left: 40,
  },

  EnterClassBtn: {
    borderColor: '#DAE2E9',
    borderWidth: 0.5,
    width: 100,
    height: 29,
    borderRadius: 25,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  InsStudentItem: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    margin: 5,
    height: 40,
    width: 320,
    flexDirection: 'row-reverse',
  },

  //Memorisation Session Style

  RectanglBox: {
    width: 167,
    height: 272,
    margin: 10,
    borderRadius: 15,
    padding: 0,
  },

  WhiteBox: {
    width: 137,
    height: 108,
    borderRadius: 15,
    backgroundColor: '#FFF',
    marginTop: 20,
    position: 'absolute',
    zIndex: 1,
    alignSelf: 'center',
    //paddingTop: 50,
    alignItems: 'center',
    padding: 20,
  },
  StartMemorize: {
    fontFamily: 'AJannatLT-Bold',
    fontSize: 18,
    color: '#43515F',
    marginTop: -4,
    textAlign: 'center',
  },

  MemorizationContainer: {
    width: 333,
    height: 452,
    borderRadius: 25,
    backgroundColor: '#FFF',
    marginTop: 170,
    alignSelf: 'center',
    position: 'absolute',
    shadowOffset: {
      width: 3,
      height: 9,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
    zIndex: 1,
  },

  SwipeBtn: {
    width: 70,
    height: 20,
    borderRadius: 25,
    backgroundColor: '#43515F',
  },
  SwipeTxt: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'AJannatLT-Bold',
    marginTop: -4,
    color: '#FFF',
  },
});
