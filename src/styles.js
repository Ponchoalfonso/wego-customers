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
  }, form: {
    margin: 12,
  }, field: {
    // marginBottom: 4
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
    borderColor: 'red',
    borderWidth: 1,
  }, fieldAnnotation: {
    color: '#B5B9DB',
    fontSize: 13
  }, bigButton: {
    backgroundColor: '#00BD6F',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 4
  }, bigButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 30
  }, smallButton: {
    backgroundColor: '#B5B9DB',
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