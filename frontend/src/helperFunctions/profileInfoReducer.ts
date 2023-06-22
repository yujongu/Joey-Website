import { UserProfileObjectType } from "../types";

export const PROFILE_INITIAL_STATE = {};
interface actionType {
  type: string;
  payload: {
    name?: string;
    phrase?: string;
    location?: string;
    tempUnit?: string;
    LinkedIn?: string;
    Instagram?: string;
    Facebook?: string;
    YouTube?: string;
  };
}

export const profileInfoReducer = (
  state: UserProfileObjectType,
  action: actionType
): UserProfileObjectType => {
  let newState = state;
  switch (action.type) {
    case "LOAD_INITIAL_STATE":
      newState = {
        name: action.payload.name!,
        phrase: action.payload.phrase!,
        location: action.payload.location!,
        tempUnit: action.payload.tempUnit!,
        LinkedIn: action.payload.LinkedIn ? action.payload.LinkedIn : "",
        Instagram: action.payload.Instagram ? action.payload.Instagram : "",
        Facebook: action.payload.Facebook ? action.payload.Facebook : "",
        YouTube: action.payload.YouTube ? action.payload.YouTube : "",
      };
      return newState;
    case "ON_PHRASE_CHANGE":
      newState = { ...state, phrase: action.payload.phrase! };
      return newState;

    case "ON_LOCATION_CHANGE":
      newState = { ...state, location: action.payload.location! };
      return newState;

    case "ON_TEMPUNIT_CHANGE":
      newState = { ...state, tempUnit: action.payload.tempUnit! };
      return newState;

    case "ON_LINKEDIN_CHANGE":
      newState = { ...state, LinkedIn: action.payload.LinkedIn! };
      return newState;

    case "ON_INSTAGRAM_CHANGE":
      newState = { ...state, Instagram: action.payload.Instagram! };
      return newState;

    case "ON_FACEBOOK_CHANGE":
      newState = { ...state, Facebook: action.payload.Facebook! };
      return newState;

    case "ON_YOUTUBE_CHANGE":
      newState = { ...state, YouTube: action.payload.YouTube! };
      return newState;
    default:
      return newState;
  }
};
