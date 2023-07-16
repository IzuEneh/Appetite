import { Dispatch, PropsWithChildren, createContext, useContext } from "react";
import { useReducer } from "react";
import { Category } from "./types";

type SavedRestaurant = {
	categories: Category[];
	id: string;
	image_url: string;
	name: string;
};

type State = {
	saved: SavedRestaurant[];
};

type Action = {
	type: string;
	data: any;
};

const initialState = {
	saved: [
		{
			categories: [{ alias: "italian", title: "Italian" }],
			id: "nuuqDBCPz82rk2jm1-yi_w",
			image_url:
				"https://s3-media3.fl.yelpcdn.com/bphoto/Q-5ghR1UrOvDJtzFdKv2cw/o.jpg",
			name: "Amici Italian Grill",
		},
		{
			categories: [{ alias: "chinese", title: "Chinese" }],
			id: "RwZxc7vqYGOj99K1CYildQ",
			image_url:
				"https://s3-media2.fl.yelpcdn.com/bphoto/rAHNQuLBf0f2bkMcWgEKjA/o.jpg",
			name: "Ginger Beef Bistro House",
		},
		{
			categories: [{ alias: "dimsum", title: "Dim Sum" }],
			id: "mkQ31BFYV8ri7znJpHd7Ww",
			image_url:
				"https://s3-media2.fl.yelpcdn.com/bphoto/VljMdi95cuN7QG6tR52Qdw/o.jpg",
			name: "T.Pot China Bistro",
		},
		{
			categories: [{ alias: "pizza", title: "Pizza" }],
			id: "r92duI6MtSi1-seaIeQUWA",
			image_url:
				"https://s3-media4.fl.yelpcdn.com/bphoto/-9dyFfjHXQrGrP1TxCBdtQ/o.jpg",
			name: "Pizza Panorama",
		},
		{
			categories: [{ alias: "indpak", title: "Indian" }],
			id: "7UxTPaoqbbd-ZKc_7gbMow",
			image_url:
				"https://s3-media4.fl.yelpcdn.com/bphoto/co1wXvrjYNSYXIfO931I8w/o.jpg",
			name: "JPs Indian Bistro",
		},
		{
			categories: [{ alias: "vietnamese", title: "Vietnamese" }],
			id: "tps4NEm5BpoXm1YnBdEQkQ",
			image_url:
				"https://s3-media2.fl.yelpcdn.com/bphoto/tMQsWe8S9xYzL60vezocwg/o.jpg",
			name: "Saigon Pearl Vietnamese Restaurant",
		},
	],
};

const SavedRestaurantContext = createContext<State>(initialState);
const SavedRestaurantDispatchContext = createContext<Dispatch<Action>>(
	() => {}
);

function SavedRestaurantProvider({ children }: PropsWithChildren<{}>) {
	const [saved, dispatch] = useReducer(savedRestaurantReducer, initialState);

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
		case "add": {
			return state;
		}
		case "remove": {
			return state;
		}
		default:
			return state;
	}
}

export {
	SavedRestaurantProvider as default,
	useSavedRestaurants,
	useSavedRestaurantsDispatch,
};
