import {StyleSheet, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SaveButtonTextView = () => {
	return (
		<View style={styles.container}>
			<View style={styles.iconView}>
				<Icon name='floppy-o' size={20} color='#fff' />
			</View>
			<Text style={styles.saveButtonText}>Save</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		//flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	iconView: {
		marginRight: 5,
	},
	saveButtonText: {
		color: '#ffffff',
	},
});

export default SaveButtonTextView;
