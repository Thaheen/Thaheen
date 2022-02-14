import {StyleSheet, I18nManager, Platform} from 'react-native'

export default StyleSheet.create({
  // Main titles
  sectionTitle: {
    fontFamily: 'AJannatLT-Bold',
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#43515F',
  },

  HeaderTitle: {
    fontFamily: 'AJannatLT-Bold',
    fontSize: 30,
    color: '#43515F',
    marginLeft: 160,
    marginTop: 10,
  },

  // sub headings
  subTitle: {
    fontFamily: 'AJannatLT',
    fontSize: 18,
    color: '#637081',
    textAlign: 'right',
  },

  smallText: {
    fontFamily: 'AJannatLT-Bold',
    color: '#43515F',
    fontSize: 16,
    textDecorationLine: 'none',
  },

  profileText: {
    fontFamily: 'AJannatLT',
    fontSize: 16,
    color: '#808182',
    textAlign: 'right',
    marginTop: 20,
    marginRight: 20,
  },

  textInput: {
    borderBottomWidth: 1,
    height: 30,
    width: '90%',
    marginLeft: 20,
    //
    color: '#808182',
    paddingHorizontal: 10,
    fontFamily: 'AJannatLT',
    fontSize: 14,
    color: '#808182',
    textAlign: 'right',
    fontWeight: 'bold',
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
    height: 80,
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
    overflow: 'hidden',
    backgroundColor: 'white',
    borderRadius: 10,
    fontFamily: 'AJannatLT-Bold',
    fontSize: 18,
    textAlign: 'right',
    paddingRight: 10,
    paddingBottom: '60%',
    justifyContent: 'flex-start',
    borderColor: '#DAE2E9',
    borderWidth: 2,
    width: '80%',
    height: '40%',
  },
  Title: {
    backgroundColor: 'white',
    borderRadius: 10,
    fontFamily: 'AJannatLT-Bold',
    fontSize: 18,
    textAlign: 'right',
    paddingRight: 5,
    marginTop: 10,
    marginBottom: 10,
    width: '80%',
    height: '6%',
  },

  /////Access Passcode Style////
  containerInput: {
    flexDirection: 'row',
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
    flexDirection: 'row-reverse',
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
    shadowOpacity: 0.05,
    shadowRadius: 2.22,
    elevation: 3,
  },
})
