import React from 'react';

import Syllabus from './Syllabus';

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
interface CourseData {
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
interface ServerResponce {
    status: number,
    data: any,
}
interface ServerErrorData {
    msg: string,
}
function getCourseData(url: string): Promise<CourseData> {
    return new Promise((resolve: (data: CourseData) => void, reject: (err: Error) => void) => {
        let parsed = new URL(url);
        let parameter = parsed.pathname.split('/').filter(x => x.length > 0);
        let request: XMLHttpRequest;
        if(parameter.length !== 3) {
            reject(new Error("The specified url is not a course page."));
            return;
        }
        parameter.unshift('http://localhost:8000'/*parsed.origin*/);
        parameter.push('json');
        request = new XMLHttpRequest();
        request.open('GET', parameter.join('/'));
        request.addEventListener('load', () => {
            let response: ServerResponce = JSON.parse(request.responseText);
            if(response.status !== 200) {
                let err: ServerErrorData = response.data;
                reject(new Error(err.msg));
                return;
            }
            resolve(response.data as CourseData);
        });
        request.send();
    });
    
}

export default class SyllabusController extends React.Component<{}, CourseData> {
    constructor(props: {}) {
        super(props);
        this.state = {
            course_code: "",
            college: "",
            year: "",
            course_title: "",
            course_category: "",
            class_format: "",
            credits: "",
            department: "",
            student_grade: "",
            term: "",
            classes_per_week: "",
            textbook_and_or_teaching_materials: "",
            instructor: "",
            course_plan_first_term: [],
            course_plan_second_term: [],
            evaluation_weight: {},
            original_url: "",
        };
    }
    componentDidMount() {
        getCourseData(window.location.href).then((data) => this.setState(data));
    }
    render() {
        return (
            <Syllabus {...this.state} />
        );
    }
}