import * as store from './store';
export const BASE = "https://dsapi.jellz.fun"

export const login = () => {
  const win = window.open(BASE+'/api/auth/login');
  let once;
  window.addEventListener("message", event => {
    if (once || event.origin !== BASE) return;
    once=true;
    const jwt = event.data;

    store.set('token', jwt);
    location.reload();
  });
}
