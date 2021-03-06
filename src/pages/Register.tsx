import Joi from "joi";
import { Link } from "react-router-dom";
import Form from "../components/common/Form";
import Wrapper from "../components/common/Wrapper";
import { Register } from "../components/types";
import { registerUser } from "../services/user";

export default class RegisterForm extends Form {
	state: Register = {
		data: {
			email: "",
			password: "",
			name: "",
		},
		errors: {},
	};

	schema = {
		email: Joi.string()
			.email({ tlds: { allow: ["com"] } })
			.lowercase()
			.min(8)
			.max(50)
			.required()
			.label("Email"),
		password: Joi.string().min(8).max(50).required().label("Password"),
		name: Joi.string().trim().min(5).max(50).required().label("Name"),
	};

	async submitToServer() {
		try {
			await registerUser(this.state.data);
			window.location.pathname = "/";
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			if (err.request?.status === 400) {
				const { errors } = this.state;
				errors.email = err.data;
				this.setState({ errors, isProcessing: false });
			}
		}
	}

	render() {
		return (
			<Wrapper width="25rem">
				<form onSubmit={this.handleSubmit} className="form">
					<h1>Register</h1>
					{this.renderInput("email", "Email", "johndoe@gmail.com")}
					{this.renderInput("password", "Password", "secret", "password")}
					{this.renderInput("name", "Name", "John Doe")}
					{this.renderButton("Register")}
					<div className="more">
						<p>Already have an account ?</p>
						<Link to="/login">Sign in</Link>
					</div>
				</form>
			</Wrapper>
		);
	}
}
