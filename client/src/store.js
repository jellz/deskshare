const localStorage = window.localStorage;

export const set = (key, value) => {
  console.log(key);
  localStorage.setItem(key, JSON.stringify(value));
}

export const get = (key) => {
  return JSON.parse(localStorage.getItem(key));
}

export const remove = (key) => {
  localStorage.removeItem(key);
}


export const isLoggedIn = () => {
  if(get('user') === null) {
    return false;
  }

  return true;
}

