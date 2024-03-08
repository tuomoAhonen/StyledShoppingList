import {Text, StyleSheet} from 'react-native';

const HeadingText = () => <Text style={styles.headerText}>Shopping List</Text>;

const styles = StyleSheet.create({
	headerText: {fontSize: 30, color: '#fff'},
});

export default HeadingText;
