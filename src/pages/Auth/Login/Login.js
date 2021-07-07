import React, {useState, useCallback, useMemo} from 'react';
import {connect} from 'react-redux';
import {checkValidity} from '../../../shared/checkValidity';
import {emailRules, passwordRules} from '../../../shared/dataRules';
import * as actions from '../../../store/actions/actions';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import classes from '../Auth.module.scss';
const Login = props => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const isEmailCorrect = useMemo(() => checkValidity(email, emailRules), [email]);
	const isPasswordCorrect = useMemo(() => checkValidity(password, passwordRules), [password]);

	const submitHandler = event => {
		event.preventDefault();

		if (isPasswordCorrect && isEmailCorrect) {
			// Login request
			//isSignup == true, since it means that user is signed up already
			const isSignup = true;
			props.onAuth(email, password, isSignup);
		}
	};
	return (
		<div className={classes.Auth}>
			<div
				className={classes.AuthPicture}
				style={{backgroundImage: `url(/images/loginPicture.jpg)`}}
				data-ad-text="Log in"></div>
			<div className={classes.FormWrapper}>
				<form className={classes.Form} onSubmit={submitHandler}>
					<span className={classes.Title}>Login</span>
					<span className={classes.Inputs}>
						<Input
							inputValue={email}
							setValue={event => setEmail(event.target.value)}
							labelDescription="Email"
							invalidResponse="Provide valid email adress"
							isInputCorrect={isEmailCorrect}
							inputType="email"
							isRequired={true}
						/>
						<Input
							inputValue={password}
							setValue={event => setPassword(event.target.value)}
							labelDescription="Password"
							invalidResponse="Correct password contains at least 8 characters, one capital letter, a
						number and special character"
							isInputCorrect={isPasswordCorrect}
							inputType="password"
							isRequired={true}
						/>
					</span>
					<span className={classes.Submit}>{props.isLoading ? <Spinner /> : <Button>SIGN IN</Button>}</span>
				</form>
			</div>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		isLoading: state.auth.loading,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
