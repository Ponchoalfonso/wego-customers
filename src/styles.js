import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  canvas: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#8774E7',
  }, logoWrapper: {
    alignItems: 'center',
  }, logo: {
    alignContent: 'center',
    justifyContent: 'center',
    resizeMode: 'contain',
    width: 200,
    height: 80,
  }, card: {
    backgroundColor: 'white',
    borderRadius: 4,
    marginHorizontal: 12,
    marginBottom: 12,
    // padding: 12,
  }, cardShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2,
  }, form: {
    margin: 12,
  }, adjacentFields: {
    flexDirection: 'row',
  }, field: {
    marginBottom: 4
  }, label: {
    fontSize: 16
  }, inputbox: {
    borderColor: '#B5B9DB',
    borderWidth: 2,
    borderRadius: 4,
    paddingVertical: 0,
    height: 46,
  }, input: {
    paddingVertical: 0,
  }, fieldAnnotation: {
    color: '#B5B9DB',
    fontSize: 13
  }, bigButton: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 4
  }, bigButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 30
  }, smallButton: {
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: 4
  }, smallButtonText: {
    color: 'white',
    marginHorizontal: 30,
    fontSize: 16,
  }
});

export default styles;