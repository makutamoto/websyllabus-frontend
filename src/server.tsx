import fetch, { Response } from 'cross-fetch';

import { DepartmentProps, GradeProps, CourseProps } from './containers/SideMenu';

let serverOrigin = new URL(window.location.href).origin;
if(!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    serverOrigin = 'http://localhost:8000';
}

interface ServerResponce {
    status: number,
    data: any,
}
interface ServerErrorData {
    msg: string,
}
interface ServerListData {
    list: any,
}
function fetchData(url: string, urlConstraint: (len: number) => boolean, num: number): Promise<[string, any]> {
    let parsed = new URL(url);
    let parameter = parsed.pathname.split('/').filter(x => x.length > 0);
    let server: string;
    if(!urlConstraint(parameter.length)) {
        return Promise.reject(new Error("The specified url is not valid."));
    }
    parameter.splice(num);
    parameter.unshift(serverOrigin);
    server = parameter.join('/');
    return fetch(server + '/json')
        .then((res: Response) => res.json())
        .then((res: ServerResponce) => {
            if(res.status !== 200) {
                let err: ServerErrorData = res.data;
                throw new Error(err.msg);
            }
            return [server, res.data as CourseData];
        });
}

interface PlanRow {
    theme: string,
    goals: string,
}
interface EvaluationCell {
    label: string,
    data: number,
}
interface EvaluationTable {
    [index: string]: EvaluationCell[],
}
export interface CourseData {
    course_code: string,
    college: string,
    year: string,
    course_title: string,
    course_category: string,
    class_format: string,
    credits: string,
    department: string,
    student_grade: string,
    term: string,
    classes_per_week: string,
    textbook_and_or_teaching_materials: string,
    instructor: string,
    course_plan_first_term: PlanRow[],
    course_plan_second_term: PlanRow[],
    evaluation_weight: EvaluationTable,
    original_url: string,
}
export function getCourseData(url: string): Promise<CourseData> {
    return new Promise((resolve: (data: CourseData) => void, reject: (err: Error) => void) => {
        fetchData(url, (len) => len === 3, 3)
        .then(([_url, data]: [string, CourseData]) => resolve(data))
        .catch((err: Error) => reject(err));
    });
}

export interface KosenData {
    college: string,
}
export function getKosens(): Promise<[string, KosenData[]]> {
    return new Promise((resolve: ([url, data]: [string, KosenData[]]) => void, reject: (err: Error) => void) => {
        fetchData(window.location.href, (len) => len >= 0, 0)
        .then(([server, data]: [string, ServerListData]) => resolve([server, data.list as KosenData[]]))
        .catch((err: Error) => reject(err));
    });
}

interface DepartmentData {
    department: string,
}
function getDepartments(url: string): Promise<[string, DepartmentData[]]> {
    return new Promise((resolve: ([url, data]: [string, DepartmentData[]]) => void, reject: (err: Error) => void) => {
        fetchData(url, (len) => len >= 1, 1)
        .then(([server, data]: [string, ServerListData]) => resolve([server, data.list as DepartmentData[]]))
        .catch((err: Error) => reject(err));
    });
}

interface CourseConciseData {
    course_code: string,
    course_title: string,
    student_grade: string,
}
function getCourses(url: string): Promise<[string, CourseConciseData[]]> {
    return new Promise((resolve: ([url, data]: [string, CourseConciseData[]]) => void, reject: (err: Error) => void) => {
        fetchData(url, (len) => len >= 2, 2)
        .then(([server, data]: [string, ServerListData]) => resolve([server, data.list as CourseConciseData[]]))
        .catch((err: Error) => reject(err));
    });
}

const gradeRegex = /^\d+$/;
interface GradePack {
    [index: string]: CourseProps[];
}
export function getKosenData(url: string): Promise<DepartmentProps[]> {
    return new Promise(async (resolve: (data: DepartmentProps[]) => void, reject: (err: Error) => void) => {
        try {
            let data: DepartmentProps[] = [];
            let [kosenServer, departments] = await getDepartments(url);
            for(let department of departments) {
                let [departmentServer, courses] = await getCourses(kosenServer + '/' + department.department);
                let parsedDepartmentServer = new URL(departmentServer);
                let gradePack: GradePack = {};
                let grades: GradeProps[] = []
                for(let course of courses) {
                    let grade = course.student_grade;
                    if(gradeRegex.test(grade)) grade += '年';
                    if(gradePack[grade] === undefined) gradePack[grade] = [];
                    gradePack[grade].push({ name: course.course_title, link: parsedDepartmentServer.pathname + '/' + course.course_code });
                }
                Object.keys(gradePack).forEach((key) => grades.push({ name: key, courses: gradePack[key] }));
                data.push({
                    name: department.department,
                    grades: grades,
                });
            }
            resolve(data);
        } catch(e) {
            reject(e);
        }
    });
}
