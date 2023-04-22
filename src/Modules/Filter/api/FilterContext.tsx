import {
	createContext,
	PropsWithChildren,
	useContext,
	useReducer,
} from "react";

export type FilterState = {
	prices: number[];
	categories: string[];
};

type FilterAction = {
	type: string;
	data: {
		section: "prices" | "categories";
		payload: string;
	};
};

const initialState = {
	prices: [] as number[],
	categories: [] as string[],
};

export const FilterContext = createContext(initialState);
export const FilterDispatch = createContext<React.Dispatch<FilterAction>>(
	() => {}
);

export const FilterProvider = ({ children }: PropsWithChildren) => {
	const [filters, dispatch] = useReducer(filterReducer, initialState);

	return (
		<FilterContext.Provider value={filters}>
			<FilterDispatch.Provider value={dispatch}>
				{children}
			</FilterDispatch.Provider>
		</FilterContext.Provider>
	);
};

export function useFilters() {
	return useContext(FilterContext);
}

export function useFiltersDispatch() {
	return useContext(FilterDispatch);
}

const filterReducer = (state: FilterState, action: FilterAction) => {
	switch (action.type) {
		case "add":
			return {
				...state,
				[action.data.section]: [
					...state[action.data.section],
					action.data.payload,
				],
			};

		case "remove": {
			let arr: any[] = [];
			arr = state[action.data.section];
			const updatedArr = arr.filter(
				(item: string | number) => item !== action.data.payload
			);

			return {
				...state,
				[action.data.section]: updatedArr,
			};
		}
		default:
			return state;
	}
};
