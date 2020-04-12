import { RequestCourseInfoAction, ReceiveCourseInfoAction } from '../actions';
import { SyllabusData } from '../containers/Syllabus';

export interface CourseInfoState {
    isFetching: boolean,
    info: SyllabusData | null,
}

export default function(state: CourseInfoState = { isFetching: false, info: null }, action: RequestCourseInfoAction | ReceiveCourseInfoAction): CourseInfoState {
    switch(action.type) {
        case 'REQUEST_COURSE_INFO':
            return { isFetching: true, info: null };
        case 'RECEIVE_COURSE_INFO':
            return { isFetching: false, info: (action as ReceiveCourseInfoAction).info };
        default:
            return state;
    }
}