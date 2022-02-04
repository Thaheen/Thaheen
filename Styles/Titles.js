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
    height: 52,
    borderRadius: 10,
    fontFamily: 'AJannatLT-Bold',
    fontSize: 18,
    textAlign: 'right',
    paddingRight: 5,
    marginTop: 10,
    marginBottom: 10,
    color: '#fff',
  },
  dropDownStyle: {
    marginTop: 10,
    borderColor: '#f8f4f4',
    flexDirection: 'row-reverse',
    backgroundColor: '#f8f4f4',
    marginBottom: 10,
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
    fontSize: 28,
    color: '#43515F',
    textAlign: 'center',
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
});
