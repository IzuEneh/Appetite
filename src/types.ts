export type Business = {
	id: string;
	alias: string;
	name: string;
	image_url: string;
	is_closed: boolean;
	url: string;
	review_count: number;
	categories: Array<{ alias: string; title: string }>;
	rating: string;
	coordinates: {
		latitude: string;
		longitude: string;
	};
	transactions: string[];
	price: string;
	location: {
		address1?: string;
		address2?: string;
		address3?: string;
		city?: string;
		zip_code?: string;
		country?: string;
		state?: string;
		display_address: string[];
		cross_streets?: string;
	};
	phone: string;
	display_phone: string;
	distance?: number;
	hours?: Array<{
		hour_type: string;
		open: {
			day: number;
			start: string;
			end: string;
			is_overnight: boolean;
		};
		is_open_now: boolean;
	}>;
	is_claimed: boolean;
	date_opened?: string;
	date_closed?: string;
	photos: string[];
	reviews: LocalReview[];
};

export type SearchResponse = {
	businesses: Business[];
	total: string;
	region: {
		center: {
			latitude: string;
			longitude: string;
		};
	};
};

export type RemoteReview = {
	total: number;
	reviews: LocalReview[];
	possible_languages: string[];
};

export type LocalReview = {
	id: string;
	url: string;
	text: string;
	rating: string;
	time_created: string;
	user: {
		id: string;
		profile_url: string;
		image_url: string;
		name: string;
	};
};