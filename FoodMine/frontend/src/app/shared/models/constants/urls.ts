const Base_URL = 'http://localhost:5000';

export const FOODS_URL = `${Base_URL}/api/foods`;
export const FOODS_TAGS_URL = `${FOODS_URL}/tags`;
export const FOODS_SEARCH_URL = `${FOODS_URL}/search/`;
export const FOODS_BY_TAG_URL = `${FOODS_URL}/tag/`;
export const FOOD_BY_ID_URL = `${FOODS_URL}/`;


export const USERS_LOGIN_URL = `${Base_URL}/api/users/login`;
export const USERS_REGISTER_URL = `${Base_URL}/api/users/register`;


export const ORDER_URL = Base_URL + '/api/orders';
export const ORDER_CREATE_URL = ORDER_URL + '/create';
export const ORDER_NEW_FOR_CURRENT_USER_URL = ORDER_URL + '/newOrderForCurrentUser';
export const ORDER_PAY_URL = ORDER_URL + '/pay';
export const ORDER_TRACK_URL = ORDER_URL + '/track/';