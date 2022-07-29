import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useRive, useStateMachineInput } from 'rive-react';
import { useEffect, useState } from "react";
import ParticleAnimation from './components/ParticleAnimation';
import axios from "axios"
import swal from "sweetalert"
import { useHistory } from "react-router-dom"

import CircularProgress from '@mui/material/CircularProgress';
const theme = createTheme();

const STATE_MACHINE_NAME = "State Machine 1";

export default function Login({ checkLogin }) {
    /* console.log(process.env) */

    let history = useHistory();
    let [loginButton, setLoginButton]=useState(<Button
        style={{ "backgroundColor": "#DF2D07" }}
        onMouseOver={() => setHangUp(false)}
        onFocus={() => setHangUp(false)}
        type="submit"
        fullWidth
        variant="contained"
        onClick={() => {

            setCheck(true);
            
        }}
        sx={{ mt: 3, mb: 2 }}
    >Log In</Button>);

    const [user, setUser] = useState(null);
    const [password, setPassword] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault();

        setLoginButton(<Button
            style={{ "backgroundColor": "#DF2D07" }}
            onMouseOver={() => setHangUp(false)}
            onFocus={() => setHangUp(false)}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
        ><CircularProgress color="inherit" /></Button>);

        const login = {
            "email": user,
            "password": password
        };
        await axios.post(`${process.env.REACT_APP_SERVER}/login`, login)
            .then(async (response) => {
                // console.log(response.data)
                setLoginButton(<Button
                    style={{ "backgroundColor": "#DF2D07" }}
                    onMouseOver={() => setHangUp(false)}
                    onFocus={() => setHangUp(false)}
                    type="submit"
                    fullWidth
                    variant="contained"
                    onClick={() => {
            
                        setCheck(true);
                        
                    }}
                    sx={{ mt: 3, mb: 2 }}
                >Log In</Button>)
                if (response.status === 200) {
                    // swal("Logged In", "Successfully Authorized", "Success");
                    await localStorage.setItem("token", response.data.token);
                    await localStorage.setItem("data", JSON.stringify(response.data.user));
                    await localStorage.setItem("card", JSON.stringify(response.data.card));
                    history.push("/user/dashboard");
                    window.location.reload();
                } else if (response.status === 401) {
                    swal("Invalid credentials!", "Please try again with correct credentials.", "error");
                    // console.log(response.data)
                } else if (response.status === 202) {
                    swal(`${response.data.message}`, "", "error")
                } else {
                    swal("Error!", "Some unexpected error occurred.", "error")
                    // console.log(response.data)
                }
            });
    }

    const { rive, RiveComponent } = useRive({
        src: "520-990-teddy-login-screen.riv",
        autoplay: true,
        stateMachines: STATE_MACHINE_NAME
    })


    useEffect(() => {
        setLook();
        // eslint-disable-next-line
    }, [user])

    const stateSuccess = useStateMachineInput(
        rive,
        STATE_MACHINE_NAME,
        'success'
    )
    const stateFail = useStateMachineInput(
        rive,
        STATE_MACHINE_NAME,
        'fail'
    )
    const stateHandUp = useStateMachineInput(
        rive,
        STATE_MACHINE_NAME,
        'hands_up'
    )

    const stateCheck = useStateMachineInput(
        rive,
        STATE_MACHINE_NAME,
        'Check'
    )
    const stateLook = useStateMachineInput(
        rive,
        STATE_MACHINE_NAME,
        'Look'
    )

    // eslint-disable-next-line
    const triggerSuccess = () => {
        stateSuccess && stateSuccess.fire();
    }
    // eslint-disable-next-line
    const triggerFail = () => {
        stateFail && stateFail.fire();
    }


    const setHangUp = (hangUp) => {
        stateHandUp && (stateHandUp.value = hangUp);
    }

    const setLook = () => {
        if (!stateLook || !stateCheck || !setHangUp) {
            return;
        }
        setHangUp(false)
        setCheck(true);
        let nbChars = 0;
        if (user) {
            nbChars = parseFloat(user.split('').length);
        }

        let ratio = nbChars / parseFloat(41);
        // console.log("ratio " + ratio)

        let lookToSet = ratio * 100 - 25
        // console.log("lookToSet " + Math.round(lookToSet))
        stateLook.value = Math.round(lookToSet);
    }
    const setCheck = (check) => {
        if (stateCheck) {
            stateCheck.value = check;
        }

    }




    if (rive) {
        // console.log(rive.contents)
    }



    return (
        <ThemeProvider theme={theme}>
            <ParticleAnimation />
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <div >
                        <RiveComponent style={{ width: '400px', height: '400px' }} src="520-990-teddy-login-screen.riv" />
                    </div>
                    <Typography component="h1" variant="h5" style={{ "color": "#DF2D07" }} >
                        Log In
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} style={{ "padding": "5px", "color": "white" }} >
                        <form autoComplete="off">
                            <TextField
                                onFocus={() => setHangUp(false)}
                                color="warning"
                                onChange={(event) => setUser(event.target.value)}
                                value={user}
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                te
                                autoFocus
                                focused
                                inputProps={{ style: { color: 'white' } }}

                            />
                            <TextField
                                onChange={(event) => {
                                    setHangUp(true);
                                    setPassword(event.target.value);
                                    //setHangUp(false);
                                }}
                                //onFocus={() => setHangUp(true)}
                                //onE
                                value={password}
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                color='warning'
                                autoComplete="current-password"
                                focused
                                inputProps={{ style: { color: 'white' } }}

                            />
                        </form>
                        
                            {loginButton}
                        
                        <Grid container>
                            <Grid item xs>
                                <Link href="/forgotpassword" variant="body2" style={{ "color": "orange" }} >
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/signup" variant="body2" style={{ "color": "orange" }} >
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                {/*<Copyright sx={{ mt: 8, mb: 4 }} />*/}
            </Container>
        </ThemeProvider>
    );
}