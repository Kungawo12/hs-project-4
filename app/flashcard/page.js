"use client";
import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { collection, doc, getDoc, getDocs} from 'firebase/firestore';
import { db } from '@/firebase';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { 
    Button,
    Typography,
    Container,
    Box,
    Paper,
    TextField,
    Grid, 
    Card, 
    CardActionArea, 
    CardContent, 
    Dialog, 
    DialogContent, 
    DialogContentText, 
    DialogActions,
    DialogTitle} from '@mui/material';

export default function Flashcard() {
    const {isLoaded,isSignedIn,user} = useUser()
    const [flashcards,setFlashcards] = useState([])
    const [flipped, setFlipped] = useState([])

    const searchParams = useSearchParams()
    const search = searchParams.get('id')
    const router = useRouter()

    useEffect(() => {
        async function getFlashcard(){
            if(!search || !user)return
            const colRef = collection (doc(collection(db, "users"), user.id),search)
            const docs = await getDocs(colRef)
            const flashcards= []

            docs.forEach((doc) => {
                flashcards.push({id: doc.id, ...doc.data()})
            })
            setFlashcards(flashcards)
            console.log(flashcards)
        }
        getFlashcard()
    }, [user, search])

    const handleCardClick = (id) =>{
        setFlipped((prev) => ({
            ...prev,
            [id]: !prev[id]
        }))
    }
    const returnToFlashcard = () => {
        router.push(`/flashcards`)
    }

    if (!isLoaded || !isSignedIn){
        return <></>
    }

    return (
        <Container maxWidth='100vw'>
            <Box sx={{display: 'flex', justifyContent: 'center', mt: 4, mb:4}}>
                <Typography variant='h4'  sx={{ textTransform: 'capitalize', fontWeight: 'bold' }}>
                {search || 'Flashcard'}
                </Typography>
                <Button 
                    variant='contained' 
                    color='primary' 
                    sx={{ml: 2}}
                    onClick={() => returnToFlashcard()}>  BACK
                    </Button>
            </Box>
            <Grid container spacing={3} sx={{mt:4}}>
            {flashcards.map((flashcard, index)=>(
                    <Grid item xs = {12} sm={6} md={4} key= {index}>
                        <Card>
                            <CardActionArea onClick={() => handleCardClick(index)}>
                                <CardContent >
                                    <Box sx={{
                                        perspective: '1000px',
                                        '& >div': {
                                            transition: 'transform 0.6s',
                                            transformStyle: 'preserve-3d',
                                            position: 'relative',
                                            width: '100%',
                                            height: '200px',
                                            boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                                            transform: flipped[index] 
                                            ? 'rotateY(180deg)' 
                                            : 'rotateY(0deg)'
                                        },
                                        '& >div > div': {
                                            position: 'absolute',
                                            width: '100%',
                                            height: '100%',
                                            backfaceVisibility: 'hidden',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            padding: 2,
                                            boxSizing: 'border-box',
                                        },
                                        '& >div > div:nth-of-type(1)': {
                                            backgroundColor: 'blue',
                                        },
                                        '& >div > div:nth-of-type(2)': {
                                            backgroundColor: 'green',
                                            transform: 'rotateY(180deg)',
                                        },
                                    }}>
                                        <div >
                                            <div>
                                                <Typography
                                                variant="h5"
                                                component="div"
                                                sx={{ color: 'white' }}>
                                                    {flashcard.front}
                                                </Typography>
                                            </div>
                                            <div>
                                                <Typography
                                                variant="h5"
                                                component="div"
                                                sx={{ color: 'white' }}>
                                                    {flashcard.back}
                                                </Typography>
                                            </div>
                                        </div>
                                    </Box>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
        </Grid>
        </Container>

    )
}