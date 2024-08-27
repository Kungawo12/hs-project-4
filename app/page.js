"use client";

import Image from "next/image";

import getStripe from "@/utils/get-stripe";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { AppBar, Button, Container, Toolbar, Typography,Box,Grid} from "@mui/material";
import Head from "next/head";
import { useUser } from "@clerk/nextjs";
import { useContext,useEffect,useState } from 'react';
import { useTheme } from "./themeContext";
import ThemeToggle from "./lightDarkMode";
import { useRouter } from 'next/navigation';

export default function Home() {
  const { isLightMode } = useTheme();
  const user = useUser();
  const router = useRouter(); // Add this line
  const [redirectToGenerate, setRedirectToGenerate] = useState(false); // Add this line

  const handleGetStarted = () => {
    if (user) {
      setRedirectToGenerate(true); // Update the state variable
    } else {
      alert('Please sign in or sign up to get started.');
    }
  };

  // Redirect the user if needed
  useEffect(() => {
    if (redirectToGenerate) {
      router.push('/generate');
    }
  }, [redirectToGenerate, router]);

  const handleSubmit = async () => {
    console.log("Button clicked");
    const checkoutSession = await fetch("/api/checkout_session", {
      method: "POST",
      headers:{
        origin: "http://localhost:3000",
      },
    })
    const checkoutSessionJson = await checkoutSession.json()

    if (checkoutSession.statusCode === 500){
      console.error(checkoutSession.message)
      return}

    const stripe = await getStripe()
    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    })

    if (error){
      console.warn(error.message)
    }
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
          
          <ThemeToggle />
          
          <SignedOut>
            <Button color="inherit" href="/sign-in">Login</Button>
            <Button color="inherit" href="/sign-up">Sign Up</Button>
          </SignedOut>
            
          <SignedIn>
            <UserButton />
          </SignedIn>          
        </Toolbar>
      </AppBar>

      <Box sx={{
        textAlign: 'center', 
        my: 4,
      }}>
        
        <Typography variant="h2" gutterBottom>
          Welcome to MIN Flashcard
        </Typography>
        <Typography variant="h5" gutterBottom>
          {''}
          The easiest way to create flashcard from scratch from your text
        </Typography>
        <Button variant="contained" color="primary" sx = {{marginTop: 2}} onClick={handleGetStarted}>
          Get Started
        </Button>
      </Box>
      <Box sx = {{my: 6}}>
        <Typography variant="h4" gutterBottom>
          Features
        </Typography>
        <Grid container spacing = {4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Easy Text Input
            </Typography>
            <Typography>
              {''}
              Simply input your text and let our software the rest.
              Creating has never been easier and fun.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Smart Flashcard Creation
            </Typography>
            <Typography>
              {' '}
              Our AI intellegently breaks
              down your text into concise flashcards, perfect for studying.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Accessible Anywhere
            </Typography>
            <Typography>
              {' '}
              Access your flashcards from any device, 
              at anytime, on the go with ease.
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{my: 6, textAlign: 'center'}}>
        <Typography variant="h4" gutterBottom>
            Pricing
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box sx= {{
                p:3,
                border: '1px solid',
                borderColor:"grey.300",
                borderRadius: 2,
              }}>
              <Typography variant="h5" gutterBottom>
                Basic
                </Typography>
              <Typography variant="h6" gutterBottom>
                $5 / month
              </Typography>
              <Typography>
                {' '}
                Access to basic flashcard features and limited storage.
              </Typography>
              <Button variant="contained" color="primary" sx={{mt: 2}}>
                choose basic
              </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx= {{
                p:3,
                border: '1px solid',
                borderColor:"grey.300",
                borderRadius: 2,
              }}>
              <Typography variant="h5" gutterBottom>
                Pro
                </Typography>
              <Typography variant="h6" gutterBottom>
                $10 / month
              </Typography>
              <Typography>
                {' '}
                Unlimited flashcard creation and storage, with priority support.
              </Typography>
              <Button 
              variant="contained" 
              color="primary" 
              sx={{mt: 2}}
              onClick={handleSubmit}>
                Choose Pro
              </Button>
              </Box>
            </Grid>
          </Grid>
      </Box>
  </Container>
  )
}
