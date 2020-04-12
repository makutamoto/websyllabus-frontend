import { SetPhoneAction } from '../actions';

export type PhoneState = boolean;

export default function(state: PhoneState = false, action: SetPhoneAction): PhoneState {
    if(action.type === 'SET_PHONE') {
        return action.value;
    } else {
        return state;
    }
}
