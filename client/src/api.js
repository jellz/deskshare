export const login = () => {
  const win = window.open('http://localhost:3000/api/auth/login');
  let once;
  window.addEventListener("message", event => {
    if (once || event.origin !== "http://localhost:3000") return;
    once=true;
    const jwt = event.data;
    console.log("client has jwt", jwt);
    return jwt;
  });
}
