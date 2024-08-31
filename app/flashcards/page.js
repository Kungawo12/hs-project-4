'use client';

import {useUser} from '@clerk/nextjs';
import { use,useEffect, useState } from 'react';
import { collection,doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import { Card,Grid,Typography,CardActionArea, CardContent, Container ,Box, Button} from '@mui/material';
import { useRouter } from 'next/navigation';

export default function Flashcards() {
    const { isLoaded, isSignedIn, user, loading} = useUser();
    const [flashcards, setFlashcards] = useState([]);
    const router = useRouter();
    
    useEffect(() => {
        async function getFlashcards(){
            if(!user) return
            const docRef = doc(collection(db, "users"), user.id)
            const docSnap = await getDoc(docRef)

            if (docSnap.exists()){
                const collections = docSnap.data().flashcards || []
                setFlashcards(collections)
            }
            else{
                await setDoc(docRef, {flashcards: []})
            }
        }
        getFlashcards()
    }, [user])
    
    if (loading) {
        return <div>Loading...</div>;
    }
    
    if (!isLoaded || !isSignedIn){
        return <></>
    }

    if (!isLoaded || !isSignedIn){
        return <></>
    }
    const handleReturnToHome = () =>{
        router.push('/home')
    }
    const handleCardClick = (id) => {
        router.push(`/flashcard?id=${id}`)
    }


    return (
        <Container maxWidth='100vw'>
            <Box sx={{display: 'flex', justifyContent: 'center', mt: 4, mb:4}}>
                <Typography variant='h4'>
                {user.firstName}&apos;s Flashcards
                </Typography>
                <Typography variant='h6' sx={{ml:2}}><Button onClick={handleReturnToHome}>Home</Button></Typography>
            </Box>
            
            <Grid container spacing={3} sx={{met:4}}>
                {flashcards.map((flashcard, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card>
                            <CardActionArea 
                            onClick={() => {
                                handleCardClick(flashcard.name)}
                            }>
                            <CardContent>
                                <Typography variant='h6'>
                                    {flashcard.name}
                                </Typography>
                            </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
        )
}