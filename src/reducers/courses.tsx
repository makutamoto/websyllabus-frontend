import { RequestCoursesAction, ReceiveCoursesAction } from '../actions';
import { DepartmentProps } from '../containers/SideMenu';

export type CoursesState = DepartmentProps[] | null;

export default function(state: CoursesState = null, action: RequestCoursesAction | ReceiveCoursesAction): CoursesState {
    switch(action.type) {
        case 'REQUEST_COURSES':
            return null;
        case 'RECEIVE_COURSES':
            return (action as ReceiveCoursesAction).departments;
        default:
            return state;
    }
}
