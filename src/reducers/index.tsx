import { combineReducers } from 'redux';

import menu, { MenuState } from './menu';
import phone, { PhoneState } from './phone';
import colleges, { CollegesState } from './colleges';
import courses, { CoursesState } from './courses';
import courseInfo, { CourseInfoState } from './courseInfo';

export interface StateType {
    menu: MenuState,
    phone: PhoneState,
    colleges: CollegesState,
    courses: CoursesState,
    courseInfo: CourseInfoState,
}

export default combineReducers({
    menu,
    phone,
    colleges,
    courses,
    courseInfo,
});
