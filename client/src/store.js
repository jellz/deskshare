const localStorage = window.localStorage;

export const set = (key, value) => {
  localStorage.setItem(key, value);
}

export const get = (key) => {
  return localStorage.getItem(key);
}

export const remove = (key) => {
  localStorage.removeItem(key);
}

export const update = (key, value) => {
  set(key, value);
}

export const isLoggedIn = () => {
  if(get('user') === null) {
    return false;
  }

  return true;
}

