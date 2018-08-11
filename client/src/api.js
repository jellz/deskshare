import * as store from './store';

export const login = () => {
  const win = window.open('http://localhost:3000/api/auth/login');
  let once;
  window.addEventListener("message", event => {
    if (once || event.origin !== "http://localhost:3000") return;
    once=true;
    const jwt = event.data;

    store.set('token', jwt);
  });
}
