interface signupInfoType {
  name: string;
  uid: string;
  password: string;
}
interface actionType {
  type: string;
  payload: {
    name?: string;
    uid?: string;
    password?: string;
  };
}

export const SIGNUP_INITIAL_STATE = {
  name: "",
  uid: "",
  password: "",
};

export const signupReducer = (
  state: signupInfoType,
  action: actionType
): signupInfoType => {
  let newState = state;
  switch (action.type) {
    case "ON_NAME_CHANGE":
      newState = { ...state, name: action.payload.name! };
      return newState;
    case "ON_UID_CHANGE":
      newState = { ...state, uid: action.payload.uid! };
      return newState;
    case "ON_PASSWORD_CHANGE":
      newState = { ...state, password: action.payload.password! };
      return newState;
    default:
      return newState;
  }
};
