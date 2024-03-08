import {StatusBar} from 'expo-status-bar';
import {useEffect, useState} from 'react';
import {StyleSheet, Text, TextInput, View, /*Button,*/ FlatList} from 'react-native';
import {getDatabase, ref, push, set, onValue, remove} from 'firebase/database';
import {Header, Input, Button} from '@rneui/themed';
import app from './firebaseConfig';
import ShoppingListItem from './components/ShoppingListItem';
import SaveButtonTextView from './components/SaveButtonTextView';
import HeadingText from './components/header/HeadingText';
import SeparatorComponent from './components/SeparatorComponent';

const db = getDatabase(app);
const productsRef = ref(db, 'Products/');

export default function App() {
	const [product, setProduct] = useState({name: '', amount: ''});
	const [productList, setProductList] = useState([]);

	const saveProduct = () => {
		// do something

		(async () => {
			try {
				await push(productsRef, product);
				return setProduct({name: '', amount: ''});
				/*
				await set(productsRef, product);
				return setProduct({name: '', amount: ''});
        */
			} catch (error) {
				return console.log(error);
			}
		})();
	};

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
			<Header centerComponent={<HeadingText />}></Header>
			<Input
				placeholder='Product name...'
				value={product.name}
				onChangeText={(e) => setProduct({...product, name: e})}
				style={styles.textInputName}
			/>
			<Input
				placeholder='Amount...'
				value={product.amount}
				onChangeText={(e) => setProduct({...product, amount: e})}
				style={styles.textInputAmount}
			/>
			<View style={styles.buttonView}>
				<Button title={<SaveButtonTextView />} onPress={saveProduct} />
			</View>
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
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	header: {},
	textInputName: {},
	textInputAmount: {},
	buttonView: {},
	flatListView: {marginTop: 10, flex: 1},
});

