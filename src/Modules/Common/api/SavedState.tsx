import {
	Dispatch,
	PropsWithChildren,
	createContext,
	useContext,
	useEffect,
} from "react";
import { useReducer } from "react";
import { Category } from "./types";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SAVED_DATA_KEY = "saved-state";

type SavedRestaurant = {
	categories: Category[];
	id: string;
	image_url: string;
	name: string;
};

type State = {
	saved: SavedRestaurant[];
	selectedIDs: Set<string>;
};

type Action = {
	type: string;
	data: State | SavedRestaurant;
};

const initialState = {
	saved: [],
	selectedIDs: new Set([]),
};

const SavedRestaurantContext = createContext<State>(initialState);
const SavedRestaurantDispatchContext = createContext<Dispatch<Action>>(
	() => {}
);

function SavedRestaurantProvider({ children }: PropsWithChildren<{}>) {
	const [saved, dispatch] = useReducer(savedRestaurantReducer, initialState);
	const getInitialState = async () => {
		const data: State = await getData();
		if (data != null) {
			dispatch({
				type: "setInitialState",
				data,
			});
		}
	};
	useEffect(() => {
		getInitialState();
	}, []);

	return (
		<SavedRestaurantContext.Provider value={saved}>
			<SavedRestaurantDispatchContext.Provider value={dispatch}>
				{children}
			</SavedRestaurantDispatchContext.Provider>
		</SavedRestaurantContext.Provider>
	);
}

const useSavedRestaurants = () => {
	return useContext(SavedRestaurantContext);
};

const useSavedRestaurantsDispatch = () => {
	return useContext(SavedRestaurantDispatchContext);
};

function savedRestaurantReducer(state: State, action: Action): State {
	switch (action.type) {
		case "setInitialState": {
			if ("id" in action.data) {
				return state;
			}

			return action.data;
		}
		case "toggleSaved": {
			if ("saved" in action.data) {
				// check if state object
				return state;
			}

			const { id } = action.data;
			if (state.selectedIDs.has(id)) {
				const saved = state.saved.filter((item) => item.id !== id);
				state.selectedIDs.delete(id);
				const newState = {
					...state,
					saved,
				};

				storeData(newState);
				return newState;
			}

			const saved = [...state.saved, action.data];
			const newState = {
				...state,
				saved,
				selectedIDs: state.selectedIDs.add(id),
			};

			storeData(newState);
			return newState;
		}
		default:
			return state;
	}
}

const storeData = async (value: State) => {
	try {
		const jsonValue = JSON.stringify(value);
		await AsyncStorage.setItem(SAVED_DATA_KEY, jsonValue);
	} catch (e) {
		// saving error
		console.log("Unable to save data: ", e);
	}
};

const getData = async () => {
	try {
		const jsonValue = await AsyncStorage.getItem(SAVED_DATA_KEY);
		return jsonValue != null ? JSON.parse(jsonValue) : null;
	} catch (e) {
		// error reading value
		console.log("unable to fetch data: ", e);
	}
};

export {
	SavedRestaurantProvider as default,
	useSavedRestaurants,
	useSavedRestaurantsDispatch,
};
