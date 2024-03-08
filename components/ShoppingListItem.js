import {View, Text, StyleSheet, Pressable} from 'react-native';
import {getDatabase, remove, ref} from 'firebase/database';
import Icon from 'react-native-vector-icons/FontAwesome';
import app from '../firebaseConfig';

const db = getDatabase(app);

const ShoppingListItem = ({item}) => {
	const deleteProduct = (id) => {
		// do something
		//console.log(id);
		(async () => {
			try {
				//console.log(id);
				return await remove(ref(db, `Products/${id}`));
			} catch (error) {
				return console.log(error);
			}
		})();
	};
	//console.log(item);
	return (
		<View style={styles.itemView}>
			<View style={styles.itemDetailView}>
				<Text>{item.name}</Text>
				<Text>{item.amount}</Text>
			</View>
			<View style={styles.deleteButtonView}>
				<Pressable onPress={() => deleteProduct(item.id)}>
					<Icon name='trash' size={20} color='#900' />
				</Pressable>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	itemView: {
		flex: 1,
		paddingLeft: 10,
		paddingRight: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	itemDetailView: {
		//flex: 20,
		//justifyContent: 'flex-start',
	},
	deleteButtonView: {
		//flex: 1,
		//justifyContent: 'flex-end',
	},
});

export default ShoppingListItem;
