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
