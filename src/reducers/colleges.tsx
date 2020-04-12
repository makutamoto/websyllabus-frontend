import { ReceiveCollegesAction } from '../actions';
import { KosenData } from '../server';

export type CollegesState = KosenData[] | null;

export default function(state: CollegesState = null, action: ReceiveCollegesAction): CollegesState {
    if(action.type === 'RECEIVE_COLLEGES') {
        return action.colleges;
    } else {
        return state;
    }
};