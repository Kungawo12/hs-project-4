"use client";

import Image from "next/image";
import { AppBar, Button, Container, Toolbar, Typography,Box,Grid,Paper} from "@mui/material";
import { useTheme } from "./themeContext";
import Head from "next/head";
import { useRouter } from 'next/navigation';
import LightDark from "./lightDarkMode";

export default function Home() {
    const { isLightMode } = useTheme();
    const router = useRouter();

    const handleGetStarted = () => {
        router.push('/home');
    }

    return(
        <Container maxWidth='100%' style={{ width: '100%', padding: 0 }}>
            <Head>
                <title>
                    MIN Flashcard
                </title>
                <meta name="description" content="Create flashcard from your text" />
            </Head>
            <AppBar position="static">
                <Toolbar>
                <Typography variant="h6" style={{flexGrow:1}}>
                    MIN Flashcard
                </Typography>
                <LightDark/>
                </Toolbar>
            </AppBar>
            <Box position="relative" height={700}>
                <Image src="https://www.berries.com/_next/image?url=https%3A%2F%2Fimages.contentstack.io%2Fv3%2Fassets%2Fbltcedd8dbd5891265b%2Fbltf75ad6177d958281%2F665642bf86f0a970fdfb53a4%2Fpositive-quotes-hero.jpg&w=1200&q=75" alt="home Image" layout="fill" objectFit="cover"/>
                <Box display="flex" justifyContent="center" alignItems="center" position="absolute" top={0} left={0} width="100%" height="100%">
                    <Button 
                        variant="contained" 
                        color="primary" 
                        size="large"
                        style={{ fontSize: '20px', padding: '20px 40px', minWidth: '200px' }}
                        onClick={handleGetStarted}>
                        DO IT
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}
