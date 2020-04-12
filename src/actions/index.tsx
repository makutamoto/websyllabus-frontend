import { DispatchType } from '../index';
import { DepartmentProps } from '../containers/SideMenu';
import { SyllabusData } from '../containers/Syllabus';
import { KosenData, getCourseData, getKosens, getKosenData } from '../server';

export interface SetMenuAction {
    type: string,
    value: boolean,
}
export const setMenu = (value: boolean) => ({
    type: 'SET_MENU',
    value,
});

export interface ToggleMenuAction {
    type: string,
}
export const toggleMenu = () => ({
    type: 'TOGGLE_MENU',
});

export interface SetPhoneAction {
    type: string,
    value: boolean,
}
export const setPhone = (value: boolean) => ({
    type: 'SET_PHONE',
    value,
});

export interface ReceiveCollegesAction {
    type: string,
    colleges: KosenData[],
};
export const receiveColleges = (colleges: KosenData[]) => ({
    type: 'RECEIVE_COLLEGES',
    colleges,
});

export const fetchColleges = () => (dispatch: DispatchType) => {
    return getKosens()
    .then(([_url, data]: [string, KosenData[]]) => dispatch(receiveColleges(data)))
    .catch((err: Error) => {
        console.error(err);
        dispatch(receiveColleges([]));
    });
};

export interface ReceiveCoursesAction {
    type: string,
    departments: DepartmentProps[],
}
export const receiveCourses = (departments: DepartmentProps[]) => ({
    type: 'RECEIVE_COURSES',
    departments,
});

export interface RequestCoursesAction {
    type: string,
}
export const requestCourses = () => ({
    type: 'REQUEST_COURSES',
});

export const fetchCourses = () => (dispatch: DispatchType) => {
    dispatch(requestCourses());
    return getKosenData(window.location.href)
    .then((data) => dispatch(receiveCourses(data)))
    .catch((err: Error) => {
        console.error(err);
        dispatch(receiveCourses([]));
    });
};

export interface RequestCourseInfoAction {
    type: string,
}
export const requestCourseInfo = () => ({
    type: 'REQUEST_COURSE_INFO',
});

export interface ReceiveCourseInfoAction {
    type: string,
    info: SyllabusData | null,
}
export const receiveCourseInfo = (info: SyllabusData | null) => ({
    type: 'RECEIVE_COURSE_INFO',
    info,
});

export const fetchCourseInfo = () => (dispatch: DispatchType) => {
    dispatch(requestCourseInfo());
    return getCourseData(window.location.href)
    .then((data) => dispatch(receiveCourseInfo(data)))
    .catch((err: Error) => {
        console.log(err);
        dispatch(receiveCourseInfo(null));
    });
};