import {StyleSheet, View} from 'react-native';
import {useState} from 'react';
import {getDatabase, ref, set, push} from 'firebase/database';
import {Input, Button} from '@rneui/themed';

import SaveButtonTextView from './SaveButtonTextView';
import app from '../firebaseConfig';

const db = getDatabase(app);
const productsRef = ref(db, 'Products/');

const InputsView = () => {
	const [product, setProduct] = useState({name: '', amount: ''});

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

	return (
		<View style={styles.inputsView}>
			<Input
				placeholder='Product name...'
				value={product.name}
				onChangeText={(e) => setProduct({...product, name: e})}
				containerStyle={styles.textInputName}
			/>
			<Input
				placeholder='Amount...'
				value={product.amount}
				onChangeText={(e) => setProduct({...product, amount: e})}
				containerStyle={styles.textInputAmount}
			/>
			<View style={styles.buttonView}>
				<Button title={<SaveButtonTextView />} onPress={saveProduct} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	inputsView: {marginBottom: 5},
	textInputName: {marginBottom: 5, backgroundColor: '#f5f5f5'},
	textInputAmount: {marginBottom: 5, backgroundColor: '#f5f5f5'},
	buttonView: {
		marginBottom: 5,
		marginRight: 5,
		flexDirection: 'row',
		justifyContent: 'flex-end',
		//backgroundColor: '#000000'
	},
});

export default InputsView;
