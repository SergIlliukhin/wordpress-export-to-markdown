import * as shared from './shared.js';

export function author(post) {
	// Get username from post data
	const username = post.data.optionalChildValue('creator');
	console.log('Author username:', username);
	if (!username) {
		return undefined;
	}
	
	// Look up full author information from the map
	const authorInfo = shared.config.authorMap.get(username);
	console.log('Author info from map:', authorInfo);
	
	// Return both username and display_name, using username as display_name if not found in map
	return {
		username: username,
		display_name: authorInfo?.display_name || username
	};
}

export function categories(post) {
	// array of decoded category names, excluding 'uncategorized'
	const categories = post.data.children('category');
	return categories
		.filter((category) => category.attribute('domain') === 'category' && category.attribute('nicename') !== 'uncategorized')
		.map((category) => decodeURIComponent(category.attribute('nicename')));
}

export function coverImage(post) {
	// cover image filename, previously parsed and decoded
	return post.coverImage;
}

export function date(post) {
	// Return formatted date string instead of DateTime object
	if (!post.date) return undefined;
	return post.date.toISODate();
}

export function draft(post) {
	// boolean representing the previously parsed draft status, only included when true
	return post.isDraft ? true : undefined;
}

export function excerpt(post) {
	// not decoded, newlines collapsed
	// does not always exist (squarespace exports, for example)
	const encoded = post.data.optionalChildValue('encoded', 1);
	return encoded ? encoded.replace(/[\r\n]+/gm, ' ') : undefined;
}

export function id(post) {
	// previously parsed as a string, converted to integer here
	return parseInt(post.id);
}

export function slug(post) {
	// previously parsed and decoded
	return post.slug;
}

export function tags(post) {
	// array of decoded tag names (yes, they come from <category> nodes, not a typo)
	const categories = post.data.children('category');
	return categories
		.filter((category) => category.attribute('domain') === 'post_tag')
		.map((category) => decodeURIComponent(category.attribute('nicename')));
}

export function title(post) {
	// not decoded
	return post.data.childValue('title');
}

export function type(post) {
	// previously parsed but not decoded, can be "post", "page", or other custom types
	return post.type;
}
