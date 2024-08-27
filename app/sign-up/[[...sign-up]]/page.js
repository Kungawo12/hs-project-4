import { SignIn, SignUp } from "@clerk/nextjs";
import { Container, AppBar, Toolbar, Typography, Button, Box } from "@mui/material"
import Link from "next/link"

export default function SignUpPage() {
    return (
        <Container maxWidth='100%' style={{ width: '100%', padding: 0 }}>
            <AppBar position="static" sx={{ backgroundColor: "#3f51b5" }}>
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        MIN Flashcard
                    </Typography>
                    <Button color="inherit">
                        <Link href="/sign-in" passHref>
                            Login
                        </Link>
                    </Button>
                    {/* <Button color="inherit">
                        <Link href="/sign-up" passHref>
                            Sign Up
                        </Link>
                        </Button> */}

                </Toolbar>
            </AppBar>

            <Box
                display="flex"
                flexDirection="column"
                alignItems={"center"}
                justifyContent={"center"}
            >
                <Typography variant="h4" gutterBottom>
                    Sign Up
                </Typography>
                <SignUp/>
            </Box>

        </Container>
    );
}
