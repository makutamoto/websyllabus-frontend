import React from 'react';
import { Box, Button, Card, CardContent, Container, Grid, Hidden, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { ReportProblem } from '@material-ui/icons';
import { TwitterIcon, TwitterShareButton } from 'react-share';
import { ResponsivePie, PieDatum } from '@nivo/pie';

interface CourseTitleProps {
    title: string,
    code: string,
}
function CourseTitle(props: CourseTitleProps) {
    return (
        <React.Fragment>
            <Typography variant="h2">{props.title}</Typography>
            <Typography variant="subtitle2">科目番号：{props.code}</Typography>
        </React.Fragment>
    );
}

interface TwitterButtonProps {
    url: string,
}
function TwitterButton(props: TwitterButtonProps) {
    return (
        <TwitterShareButton url={props.url}>
            <TwitterIcon size={64} round={true} />
        </TwitterShareButton>
    );
}

const useTitleStyles = makeStyles({
    card: {
        overflow: 'visible',
    },
});
interface TitleCardProps {
    title: string,
    children: any,
}
function TitleCard(props: TitleCardProps) {
    const classes = useTitleStyles();
    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography variant="h4" gutterBottom>{props.title}</Typography>
                {props.children}
            </CardContent>
        </Card>
    );
}

interface InformationListProps {
    title: string,
    children: string,
}
function InformationList(props: InformationListProps) {
    return (
        <React.Fragment>
            <Typography variant="overline" gutterBottom>{props.title}</Typography>
            <Typography variant="body1">{props.children}</Typography>
        </React.Fragment>
    );
}

interface EvaluationCell {
    label: string,
    data: number,
}
interface ChartProps {
    data: EvaluationCell[],
}
class Chart extends React.Component<ChartProps> {
    data: PieDatum[] = [];
    addData(id: string, value: number) {
        if(value > 0) {
            this.data.push({
                id: id,
                label: id,
                value: value,
            });
        }
    }
    render() {
        this.data = [];
        this.props.data.forEach((cell: EvaluationCell) => this.addData(cell.label, cell.data));

        return (
            <ResponsivePie
                data={this.data}
                margin={{ right: 8, left: 8 }}
                innerRadius={0.5}
                padAngle={1}
                cornerRadius={2}
                colors={{ scheme: 'pastel2' }}
                borderWidth={1}
                borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
                sliceLabel={(e) => `${e.id} (${e.value})` }
                slicesLabelsSkipAngle={10}
                animate={true}
                motionStiffness={90}
                motionDamping={15}
                enableRadialLabels={false}
            />
        );
    }
}

const useCenterStyles = makeStyles({
    root: {
        position: 'relative',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
interface GridChartProps extends ChartProps {
    title: string,
}
function GridChart(props: GridChartProps) {
    const classes = useCenterStyles();
    let result = null;
    let sum = 0;
    props.data.forEach((cell: EvaluationCell) => sum += cell.data);
    if(sum > 0) {
        result = (
            <Grid item md={6} xs={12}>
                <Box className={classes.root} height={256}>
                    <Box display="flex" className={classes.overlay}>
                        <Typography variant="caption">{props.title}</Typography>
                    </Box>
                    <Chart {...props} />
                </Box>
            </Grid>
        );
    }
    return result;
}

const useTableStyles = makeStyles({
    header: {
        position: 'sticky',
        top: 0,
        borderTopLeftRadius: 'inherit',
        borderTopRightRadius: 'inherit',
        background: '#01A299',
        color: '#FFFFFF',
    },
    cell: {
        width: 64,
    },
});
interface PlanRow {
    theme: string,
    goals: string,
}
interface PlanTableProps {
    title: string,
    plan: PlanRow[],
}
function PlanTable(props: PlanTableProps) {
    const classes = useTableStyles();
    return (
        <Paper>
            <Toolbar className={classes.header}>
                <Typography variant="h5">{props.title}</Typography>
            </Toolbar>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.cell}>週</TableCell>
                            <TableCell>授業内容・方法</TableCell>
                            <TableCell>週ごとの到達目標</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {props.plan.map((row, i) => (
                        <TableRow key={i + row.theme}>
                            <TableCell>{i + 1}週</TableCell>
                            <TableCell>{row.theme}</TableCell>
                            <TableCell>{row.goals}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}

const useOtherCardStyles = makeStyles({
    button: {
        width: '100%',
    }
});
interface OtherCardProps {
    original_url: string,
}
function OtherCard(props: OtherCardProps) {
    const classes = useOtherCardStyles();
    return (
        <Card>
            <CardContent>
                <Grid container direction="column" spacing={2}>
                    <Grid item>
                        <Button className={classes.button} variant="outlined" href={props.original_url} target="_blank">オリジナルサイトを表示</Button>
                    </Grid>
                    <Grid item>
                        <Button className={classes.button} variant="contained" color="secondary" startIcon={<ReportProblem />}>問題を報告</Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}

interface SidebarProps {
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
    original_url: string,
}
function Sidebar(props: SidebarProps) {
    return (
        <Grid container direction="column" spacing={4}>
            <Grid item>
                <TitleCard title="科目情報">
                    <InformationList title="担当教員">{props.instructor}</InformationList>
                    <InformationList title="授業形態">{props.class_format}</InformationList>
                    <InformationList title="開設期">{props.term}</InformationList>
                    <InformationList title="科目区分">{props.course_category}</InformationList>
                    <InformationList title="履修単位">{props.credits}</InformationList>
                    <InformationList title="周時間数">{props.classes_per_week}</InformationList>
                    <InformationList title="開講年度">{props.year}</InformationList>
                    <InformationList title="教科書/教材">{props.textbook_and_or_teaching_materials}</InformationList>
                </TitleCard>
            </Grid>
            <Hidden xsDown>
                <Grid item>
                    <OtherCard original_url={props.original_url} />
                </Grid>
            </Hidden>
        </Grid>
    );
}

const useMainContentStyle = makeStyles({
    grid: {
        maxWidth: '100%',
    }
});
interface EvaluationTable {
    [index: string]: EvaluationCell[],
}
interface MainContentProps {
    evaluation: EvaluationTable,
    first: PlanRow[],
    second: PlanRow[],
    original_url: string,
}
function MainContent(props: MainContentProps) {
    const classes = useMainContentStyle();
    return (
        <Grid container direction="column" spacing={4}>
            <Grid className={classes.grid} item>
                <TitleCard title="評価割合">
                    <Grid container spacing={4}>
                        {Object.keys(props.evaluation).map(key =>
                            <GridChart key={key} title={key} data={props.evaluation[key]} />
                        )}
                    </Grid>
                </TitleCard>
            </Grid>
            <Grid item>
                <TitleCard title="授業計画">
                    <Grid container spacing={2}>
                        {props.first.length > 0 &&
                        <Grid item>
                            <PlanTable title="前期" plan={props.first} />
                        </Grid>
                        }
                        {props.second.length > 0 &&
                        <Grid item>
                            <PlanTable title="後期" plan={props.second} />
                        </Grid>
                        }
                    </Grid>
                </TitleCard>
            </Grid>
            <Hidden smUp>
                <Grid item>
                    <OtherCard original_url={props.original_url} />
                </Grid>
            </Hidden>
        </Grid>
    );
}

interface TopBarProps {
    title: string,
    code: string,
}
function TopBar(props: TopBarProps) {
    return (
        <Box display="flex" mt={8} mb={4}>
            <Box flexGrow={1}>
                <CourseTitle title={props.title} code={props.code} />
            </Box>
            <Box>
                <TwitterButton url={window.location.href} />
            </Box>
        </Box>
    );
}

interface SyllabusProps {
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
export default function Syllabus(props: SyllabusProps) {
    return (
        <Container maxWidth="md">
            <TopBar title={props.course_title} code={props.course_code} />
            <Grid container spacing={4}>
                <Grid item sm={4} xs={12}>
                    <Sidebar {...props} />
                </Grid>
                <Grid item sm={8} xs={12}>
                    <MainContent evaluation={props.evaluation_weight} first={props.course_plan_first_term} second={props.course_plan_second_term} original_url={props.original_url} />
                </Grid>
            </Grid>
        </Container>
    );
}