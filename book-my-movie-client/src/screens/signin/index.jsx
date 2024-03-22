import React,{useState,useCallback} from 'react'
import { Input, Button } from "antd";
import "./style.css"
import {apiV1Instance} from '../../api';
import { useNavigate } from 'react-router-dom';
import {useQueryClient } from '@tanstack/react-query'

const SigninScreen =()=>{
    //const {mutateAsync: signInUserAsync} = useSigninUser();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const [email,setEmail] =useState('');
    const [password,setPassword] =useState('');
    const handleFormSubmit = useCallback(
        async (e)=>{
            e.preventDefault();
            //await signInUserAsync({email,password});
            
            const data = await apiV1Instance.post('auth/signin',{email,password});
            if(data.status===200){
                const token = data.data.data.token;
                //console.log(token)
                localStorage.setItem("token", token);
                await queryClient.invalidateQueries({ queryKey: ['user'] });
                navigate('/');}
        },
        [email,password,navigate,queryClient]
    );
    return (
        <div className="signin-container">
            <form onSubmit={handleFormSubmit}>
                <label htmlFor="email">Email</label>
                <Input id="email" 
                    type="email" 
                    value={email}
                    required
                    onChange={(e)=>setEmail(e.target.value)}
                    >   
                </Input>

                <label>Password</label>
                <Input id="password"
                    type="password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    required
                >
                </Input>
                <Button htmlType="submit" type="primary" disabled={!email || !password}>Sign in</Button>
            </form>
           
        </div>
    )
}

export default SigninScreen;