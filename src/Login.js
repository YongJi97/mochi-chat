import React  from 'react'


import { Button } from "@material-ui/core"

import {auth, provider} from "./firebase"

import { actionTypes } from "./reducer";

import { useStateValue } from "./StateProvider"

import "./Login.css"

function Login() {
    const [{user}, dispatch] = useStateValue();

    const signIn = () => {

        auth.signInWithPopup(provider)
        .then(result => {
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user,
            })
        }).catch(error => {
            alert(error.message);
        });

    }

    return (
        <div className="login">
            <div className="login_container">
                <img src="https://res.cloudinary.com/teepublic/image/private/s--EGLiFl3m--/t_Resized%20Artwork/c_fit,g_north_west,h_954,w_954/co_ffffff,e_outline:35/co_ffffff,e_outline:inner_fill:35/co_ffffff,e_outline:35/co_ffffff,e_outline:inner_fill:35/co_bbbbbb,e_outline:3:1000/c_mpad,g_center,h_1260,w_1260/b_rgb:eeeeee/c_limit,f_jpg,h_630,q_90,w_630/v1568863860/production/designs/6010633_0.jpg" />
                <div className="login_text">
                    <h1>Sign in to Mochi Chat</h1>
                </div>

                <Button onClick={signIn}>
                    Sign in with Google
                </Button>

            </div>
        </div>
    )
}

export default Login
