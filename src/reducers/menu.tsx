import { SetMenuAction, ToggleMenuAction } from '../actions';

export type MenuState = boolean;

export default function(state: MenuState = true, action: SetMenuAction | ToggleMenuAction): MenuState {
    switch(action.type) {
        case 'SET_MENU':
            return (action as SetMenuAction).value;
        case 'TOGGLE_MENU':
            return !state;
        default:
            return state;
    }
}
