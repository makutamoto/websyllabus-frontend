import React from 'react';
import { Box, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Center from '../components/Center';
import TitleCard from '../components/TitleCard';

const useHomeStyles = makeStyles({
    card: {
        width: 300,
    }
});
export function Home(): JSX.Element {
    const classes = useHomeStyles();
    let action = (
        <React.Fragment>
            <Button variant="text" href="https://github.com/makutamoto/websyllabus-frontend" target="_blank" rel="noreferrer">GITHUB</Button>
            <Button variant="text" href="https://syllabus.kosen-k.go.jp/Pages/PublicSchools" target="_blank" rel="noreferrer">本家サイト</Button>
        </React.Fragment>
    );

    return (
        <Box className="centerParent">
            <Center>
                <Box className={classes.card}>
                    <TitleCard title="Web Syllabus" action={action}>
                        <p>
                            このサイトは国立高等専門学校機構が提供する高専Webシラバスを整理し見やすくするために個人的用途で制作されました。
                            このサイトのコンテンツのデータはWebスクレイピングにより取得されており、権利はすべて本家サイトに帰属しています。
                        </p>
                    </TitleCard>
                </Box>
            </Center>
        </Box>
    );
}
