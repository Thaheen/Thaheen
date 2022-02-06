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

  input: {
    overflow: 'hidden',
    backgroundColor: '#f8f4f4',
    borderWidth: 1,
    borderColor: '#fff',
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
    borderColor: 'white',
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
  WarningText:{
fontFamily: 'AJannatLT-Bold',
    fontSize: 16,
    color: '#EFA17A',
    textAlign: 'right',

  },

  childItem: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor:'#F3DBBD',
    borderRadius:88,
    margin:10 ,
    flexDirection: "row",
  }
});
