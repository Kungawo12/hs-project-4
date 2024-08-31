"use client"
// import { useEffect, useState } from "react"
// import { useRouter } from "next/navigation"
import getStripe from "@/utils/get-stripe"
// import { useSearchParams } from "next/navigation"
// import { Box, Container, Typography } from "@mui/material"

// const ResultPage = () => {
//     const router = useRouter()
//     const searchParams = useSearchParams()
//     const session_id = searchParams.get("session_id")
    
//     const [loading, setLoading] = useState(false)
//     const [session, setSession] = useState(null)
//     const [error, setError] = useState(null)

//     useEffect(() =>
//     {
//         const fetchCheckoutSession = async () =>{
//             if (!session_id) return
            
//             try{ 
//                 const res = await fetch(`/api/checkout_session?session_id=${session_id}`)
//                 const sessionData = await res.json()
//                 if (res.ok){
//                     setSession(sessionData)
//                 }
//                 else{
//                     setError(sessionData.error)
//                 }
//             }
//             catch (err){
//                 setError("An unexpected error occurred.")
//             }
//             finally{
//                 setLoading(false)
//             }
//             fetchCheckoutSession()
//         }
//         fetchCheckoutSession()
//     }, [session_id])

//     if (loading) {
//         return (
//             <Container 
//                 maxWidth='100vw'
//                 sx={{
//                     textAlign: 'center',
//                     mt: 4,
//                 }}
//             >
//                 <CircularProgress/>
//                 <Typography variant="h6">
//                     Loading...
//                 </Typography>
//             </Container>
//         );
//     }
//     if (error){
//         return (
//             <Container 
//                 maxWidth='100vw'
//                 sx={{
//                     textAlign: 'center',
//                     mt: 4,
//                 }}
//             >
//                 <Typography variant="h6">
//                     {error}
//                 </Typography>
//             </Container>
//         );
//     }
//     return (
//         <Container 
//             maxWidth='100vw'
//             sx={{
//                 textAlign: 'center',
//                 mt: 4,
//             }}
//         >
//             {session && session.payment_status === "paid" ? (
//                 <>
//             <Typography variant="h4" gutterBottom>
//                 Your order is confirmed!
//             </Typography>
//             <Box sx={{mt: 22}}>
//                 <Typography variant="h6">
//                     Session ID: {session_id}
//                 </Typography>
//                 <Typography variant="body1">
//                     Thank you for your payment. A confirmation email has been sent to ${session.customer_email}.;
//                 </Typography>
//             </Box>
//             </>
//             ) : (
//                 <>
//                 <Typography variant="h4">
//                 Payment failed
//             </Typography>
//             <Box sx={{mt: 22}}>
//                 <Typography variant="body1">
//                     Your payment failed. Please try again.
//                 </Typography>
//             </Box>
//             </>
//             )}
//         </Container>
//     );
// }

// export default ResultPage
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Typography, Box } from '@mui/material';

export default function ResultPage() {
    const router = useRouter();
    const [session, setSession] = useState(null);

    useEffect(() => {
        if (router && router.query) {
            const { session_id } = router.query;
    
            if (session_id) {
                fetch(`/api/retrieve-session?sessionId=${session_id}`)
                    .then(res => {
                        if (!res.ok) {
                        throw new Error(`HTTP error! status: ${res.status}`);
                    }
                    return res.json();
                    })
                    .then(data => {
                    console.log('Session data:', data);
                    setSession(data);
                    })
                    .catch(err => {
                    console.error('Error fetching session:', err);
                    });
                }
            }
            }, [router]);
        console.log('session:', session);

    if (!session) {
    return <div>Loading...</div>;
    }

    return (
    <div>
        {session.payment_status === "paid" ? (
        <>
        <Typography variant="h4" gutterBottom>
            Your order is confirmed!
        </Typography>
        <Box sx={{mt: 22}}>
            <Typography variant="h6">
                Session ID: {session.id}
            </Typography>
            <Typography variant="body1">
                Thank you for your payment. A confirmation email has been sent to {session.customer_email}.
            </Typography>
            </Box>
        </>
        ) : (
        <>
            <Typography variant="h4" gutterBottom>
            Payment failed
            </Typography>
            <Typography variant="h6">
            Your payment failed. Please try again.
            </Typography>
        </>
        )}
    </div>
    );
}