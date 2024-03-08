import {StatusBar} from 'expo-status-bar';
import {useEffect, useState} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {getDatabase, ref, onValue, remove} from 'firebase/database';
import {Header} from '@rneui/themed';

import app from './firebaseConfig';
import ShoppingListItem from './components/ShoppingListItem';
import HeadingText from './components/HeadingText';
import SeparatorComponent from './components/SeparatorComponent';
import InputsView from './components/InputsView';

const db = getDatabase(app);
const productsRef = ref(db, 'Products/');

export default function App() {
	const [productList, setProductList] = useState([]);

	useEffect(
		() => {
			onValue(
				productsRef,
				(snapshot) => {
					const data = snapshot.val();
					//console.log(data);
					if (!snapshot.exists()) return setProductList([]);

					const results = [];
					for (const [key, value] of Object.entries(data)) {
						//console.log(key);
						if (key.charAt(0) !== '-') {
							//deletes entries that have no id on database, or are with incorrect form
							(async () => {
								try {
									//console.log(id);
									//const result = await set(ref(db, `ShoppingList/${id}`), null);
									return await remove(ref(db, `Products/${key}`));
								} catch (error) {
									return console.log(error);
								}
							})();
						} else if (key.charAt(0) === '-') {
							results.push({id: key, ...value});
						}
					}

					return setProductList(results);
					//return setProductList()
				},
				(error) => console.log(error),
				null
			);
		},
		[
			/*onValue*/
		]
	);

	return (
		<View style={styles.container}>
			<Header centerComponent={<HeadingText />} containerStyle={styles.header} />
			<InputsView />
			<View style={styles.flatListView}>
				<FlatList
					data={productList}
					ItemSeparatorComponent={<SeparatorComponent />}
					renderItem={({item}, index) => <ShoppingListItem key={index} item={item} />}
				/>
			</View>
			<StatusBar style='auto' />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginTop: 40,
		flex: 1,
		backgroundColor: '#fff',
		justifyContent: 'flex-start',
	},
	header: {marginBottom: 5},
	flatListView: {
		justifyContent: 'flex-start',
	},
});

