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
    width: '80%',
    borderWidth: 1,
    borderColor: '#fff',
    height: 52,
    borderRadius: 10,
    fontFamily: 'AJannatLT',
    fontSize: 18,
    textAlign: 'right',
    paddingRight: 5,
    marginTop: 10,
    color: '#fff',
  },
  dropDownStyle: {
    marginRight:35,
    marginTop: 10,
    borderColor: 'white',
    flexDirection: 'row-reverse',
    backgroundColor: '#f8f4f4',
    width:'80%',
    marginBottom:-15
  },
  categoryText: {
    textAlign: 'right',
    fontFamily: 'AJannatLT',
    fontSize: 18,
  },

  Button: {
    backgroundColor: '#F5C5AD',
    width: 283,
    height: 40,
    marginTop: 20,
    marginBottom:10,
    borderRadius:13,
    shadowColor: "#000",
            shadowOffset: {
	          width: 0,
	          height: 4,
              },
            shadowOpacity: 0.39,
            shadowRadius: 8.30,
            elevation: 13,
  },

  ButtonText:{
     fontFamily: 'AJannatLT',
     fontSize:20,
     color:"#43515F",
     fontWeight:'bold',
     textAlign:'center'


   },
});
