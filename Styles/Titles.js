import {StyleSheet} from 'react-native';

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
    fontWeight: 'bold',
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
    flexDirection: 'row-reverse',
    backgroundColor: '#f8f4f4',
  },
  categoryText: {
    textAlign: 'right',
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
    textAlign: 'left',
  },

  childItem: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#F3DBBD',
    borderRadius: 88,
    margin: 10,
    flexDirection: 'row',
  },
  childItemText:{
    fontSize: 42,
    fontFamily: 'AJannatLT',
    fontWeight:'700' ,
    color:'#43515F',
  },
  innerChildItem:{
    paddingRight:10,
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
});
