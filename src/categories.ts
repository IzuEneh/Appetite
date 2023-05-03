import { Business } from "./types";
type CategorySection = {
	letter: string;
	categories: Business["categories"];
};

export const categories: CategorySection[] = [
	{
		letter: "a",
		categories: [
			{ alias: "afghani", title: "Afghan" },
			{ alias: "african", title: "African" },
			{ alias: "arabian", title: "Arabic" },
			{ alias: "argentine", title: "Argentine" },
			{ alias: "asianfusion", title: "Asian Fusion" },
			{ alias: "australian", title: "Australian" },
			{ alias: "austrian", title: "Austrian" },
		],
	},
	{
		letter: "b",
		categories: [
			{ alias: "bangladeshi", title: "Bangladeshi" },
			{ alias: "basque", title: "Basque" },
			{ alias: "bbq", title: "Barbeque" },
			{ alias: "belgian", title: "Belgian" },
			{ alias: "bistros", title: "Bistros" },
			{ alias: "brasseries", title: "Brasseries" },
			{ alias: "brazilian", title: "Brazilian" },
			{ alias: "breakfast_brunch", title: "Breakfast & Brunch" },
			{ alias: "british", title: "British" },
			{ alias: "buffets", title: "Buffets" },
			{ alias: "burgers", title: "Burgers" },
			{ alias: "burmese", title: "Burmese" },
		],
	},
	{
		letter: "c",
		categories: [
			{ alias: "cafes", title: "Cafes" },
			{ alias: "cajun", title: "Cajun/Creole" },
			{ alias: "cambodian", title: "Cambodian" },
			{ alias: "caribbean", title: "Caribbean" },
			{ alias: "cheesesteaks", title: "Cheesesteaks" },
			{ alias: "chicken_wings", title: "Chicken Wings" },
			{ alias: "chickenshop", title: "Chicken Shop" },
			{ alias: "chinese", title: "Chinese" },
			{ alias: "comfortfood", title: "Comfort Food" },
			{ alias: "creperies", title: "Creperies" },
			{ alias: "cuban", title: "Cuban" },
			{ alias: "czech", title: "Czech" },
		],
	},
	{
		letter: "d",
		categories: [
			{ alias: "delis", title: "Delis" },
			{ alias: "diners", title: "Diners" },
			{ alias: "dinnertheater", title: "Dinner Theater" },
			{ alias: "dumplings", title: "Dumplings" },
		],
	},
	{ letter: "e", categories: [{ alias: "ethiopian", title: "Ethiopian" }] },
	{
		letter: "f",
		categories: [
			{ alias: "filipino", title: "Filipino" },
			{ alias: "fishnchips", title: "Fish & Chips" },
			{ alias: "fondue", title: "Fondue" },
			{ alias: "food_court", title: "Food Court" },
			{ alias: "foodstands", title: "Food Stands" },
			{ alias: "french", title: "French" },
		],
	},
	{
		letter: "g",
		categories: [
			{ alias: "gastropubs", title: "Gastropubs" },
			{ alias: "german", title: "German" },
			{ alias: "gluten_free", title: "Gluten-Free" },
			{ alias: "greek", title: "Greek" },
			{ alias: "guamanian", title: "Guamanian" },
		],
	},
	{
		letter: "h",
		categories: [
			{ alias: "halal", title: "Halal" },
			{ alias: "hawaiian", title: "Hawaiian" },
			{ alias: "himalayan", title: "Himalayan/Nepalese" },
			{ alias: "hkcafe", title: "Hong Kong Style Cafe" },
			{ alias: "honduran", title: "Honduran" },
			{ alias: "hotdog", title: "Hot Dogs" },
			{ alias: "hotdogs", title: "Fast Food" },
			{ alias: "hotpot", title: "Hot Pot" },
			{ alias: "hungarian", title: "Hungarian" },
		],
	},
	{
		letter: "i",
		categories: [
			{ alias: "iberian", title: "Iberian" },
			{ alias: "indonesian", title: "Indonesian" },
			{ alias: "indpak", title: "Indian" },
			{ alias: "international", title: "International" },
			{ alias: "irish", title: "Irish" },
			{ alias: "italian", title: "Italian" },
		],
	},
	{ letter: "j", categories: [{ alias: "japanese", title: "Japanese" }] },
	{
		letter: "k",
		categories: [
			{ alias: "kebab", title: "Kebab" },
			{ alias: "korean", title: "Korean" },
			{ alias: "kosher", title: "Kosher" },
		],
	},
	{
		letter: "l",
		categories: [
			{ alias: "laotian", title: "Laotian" },
			{ alias: "latin", title: "Latin American" },
		],
	},
	{
		letter: "m",
		categories: [
			{ alias: "malaysian", title: "Malaysian" },
			{ alias: "mediterranean", title: "Mediterranean" },
			{ alias: "mexican", title: "Mexican" },
			{ alias: "mideastern", title: "Middle Eastern" },
			{ alias: "modern_european", title: "Modern European" },
			{ alias: "mongolian", title: "Mongolian" },
			{ alias: "moroccan", title: "Moroccan" },
		],
	},
	{
		letter: "n",
		categories: [
			{ alias: "newcanadian", title: "Canadian (New)" },
			{ alias: "nicaraguan", title: "Nicaraguan" },
			{ alias: "noodles", title: "Noodles" },
		],
	},
	{
		letter: "p",
		categories: [
			{ alias: "pakistani", title: "Pakistani" },
			{ alias: "panasian", title: "Pan Asian" },
			{ alias: "persian", title: "Persian/Iranian" },
			{ alias: "peruvian", title: "Peruvian" },
			{ alias: "pizza", title: "Pizza" },
			{ alias: "polish", title: "Polish" },
			{ alias: "popuprestaurants", title: "Pop-Up Restaurants" },
			{ alias: "portuguese", title: "Portuguese" },
			{ alias: "poutineries", title: "Poutineries" },
		],
	},
	{
		letter: "r",
		categories: [
			{ alias: "raw_food", title: "Live/Raw Food" },
			{ alias: "russian", title: "Russian" },
		],
	},
	{
		letter: "s",
		categories: [
			{ alias: "salad", title: "Salad" },
			{ alias: "sandwiches", title: "Sandwiches" },
			{ alias: "scandinavian", title: "Scandinavian" },
			{ alias: "scottish", title: "Scottish" },
			{ alias: "seafood", title: "Seafood" },
			{ alias: "singaporean", title: "Singaporean" },
			{ alias: "slovakian", title: "Slovakian" },
			{ alias: "soulfood", title: "Soul Food" },
			{ alias: "soup", title: "Soup" },
			{ alias: "southern", title: "Southern" },
			{ alias: "spanish", title: "Spanish" },
			{ alias: "srilankan", title: "Sri Lankan" },
			{ alias: "steak", title: "Steakhouses" },
			{ alias: "supperclubs", title: "Supper Clubs" },
			{ alias: "sushi", title: "Sushi Bars" },
			{ alias: "syrian", title: "Syrian" },
		],
	},
	{
		letter: "t",
		categories: [
			{ alias: "taiwanese", title: "Taiwanese" },
			{ alias: "tapas", title: "Tapas Bars" },
			{ alias: "tapasmallplates", title: "Tapas/Small Plates" },
			{ alias: "tex-mex", title: "Tex-Mex" },
			{ alias: "thai", title: "Thai" },
			{ alias: "tradamerican", title: "American (Traditional)" },
			{ alias: "turkish", title: "Turkish" },
		],
	},
	{ letter: "u", categories: [{ alias: "ukrainian", title: "Ukrainian" }] },
	{
		letter: "v",
		categories: [
			{ alias: "vegan", title: "Vegan" },
			{ alias: "vegetarian", title: "Vegetarian" },
			{ alias: "venison", title: "Venison" },
			{ alias: "vietnamese", title: "Vietnamese" },
		],
	},
	{ letter: "w", categories: [{ alias: "waffles", title: "Waffles" }] },
];

// let res = [];

// categories.categories.forEach((cat) => {
// 	if (cat.parent_aliases.includes("restaurants")) {
// 		res.push({
// 			alias: cat.alias,
// 			title: cat.title,
// 		});
// 	}
// });

// fs.writeFile("./categories-v2.txt", JSON.stringify(res), (err) => {
// 	if (err) {
// 		console.error(err);
// 	}
// 	// file written successfully
// });

// let buckets = Array(26).fill(null);
// categories.forEach((cat) => {
// 	const index = cat.alias.charCodeAt(0) - 97;
// 	if (buckets[index]) {
// 		buckets[index].push(cat);
// 	} else {
// 		buckets[index] = [cat];
// 	}
// });

// const res = buckets.map((bucket) => {
// 	if (!bucket) {
// 		return undefined;
// 	}

// 	return {
// 		letter: bucket[0].alias.charAt(0),
// 		categories: bucket,
// 	};
// });

// fs.writeFile("./categories-v3.js", JSON.stringify(res), (err) => {
// 	if (err) {
// 		console.error(err);
// 	}
// 	// file written successfully
// });
