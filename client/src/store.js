
export const set = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
}

export const get = (key) => {
  return JSON.parse(localStorage.getItem(key));
}

export const remove = (key) => {
  localStorage.removeItem(key);
}

export const isLoggedIn = () => {
  const user = get('token');

  if(user === null || user === undefined) {
    return false;
  }

  return true;
}
