import {StyleSheet, View} from 'react-native';

const SeparatorComponent = () => {
	return <View style={styles.lineStyling}></View>;
};

const styles = StyleSheet.create({
	lineStyling: {
		borderBottomWidth: 2,
		borderColor: '#000000',
		opacity: 0.25,
		marginTop: 5,
		marginBottom: 5,
		marginLeft: 10,
		marginRight: 10,
	},
});

export default SeparatorComponent;
