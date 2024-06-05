import React from 'react'
import { Container } from 'reactstrap'
import RegisterEmployee from './form'
import LoginForm from '../components/form_login'

export default function Login() {
  return (
    <div>
        <Container>
            <LoginForm/>
        </Container>
    </div>
  )
}
