import React,{useState,useCallback} from 'react'
import { Input, Button } from "antd";
import "./style.css"
import {apiV1Instance} from '../../api';
import { useNavigate } from 'react-router-dom';
import {useQueryClient } from '@tanstack/react-query'

const SignUpScreen =()=>{
    
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const [firstName,setfirstName] =useState('');
    const [lastName,setlastName] =useState('');
    const [email,setEmail] =useState('');
    const [password,setPassword] =useState('');
    const handleFormSubmit = useCallback(
        async (e)=>{
            e.preventDefault();
                        
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
        <div className="signup-container">
            <form onSubmit={handleFormSubmit}>
                
            <label htmlFor="firstName">firstName</label>
                <Input id="firstName" 
                    type="text" 
                    value={firstName}
                    required
                    onChange={(e)=>setfirstName(e.target.value)}
                    >   
                </Input>
            <label htmlFor="lastName">lastName</label>
                <Input id="lastName" 
                    type="text" 
                    value={lastName}
                    required
                    onChange={(e)=>setlastName(e.target.value)}
                    >   
                </Input>
                
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
                <Button htmlType="submit" type="primary" disabled={!firstName || !lastName || !email || !password}>Sign Up</Button>
            </form>          
        </div>
    )
}

export default SignUpScreen;