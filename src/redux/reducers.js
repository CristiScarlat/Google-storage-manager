
export default function appReducer(state = { user: '' }, action) {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem("access_token", action.payload.token);
      localStorage.setItem("token_expires_at", action.payload.token_expires_at);
      localStorage.setItem("user", action.payload.user);
      return action.payload;
    default:
      return state
  }
}