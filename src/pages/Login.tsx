import Joi from "joi";
import { Link } from "react-router-dom";
import Form from "../components/common/Form";
import Wrapper from "../components/common/Wrapper";
import { Login } from "../components/types";
import { logUser } from "../services/auth";

export default class LoginForm extends Form {
	state: Login = {
		data: {
			email: "",
			password: "",
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
	};

	async submitToServer() {
		const { location } = this.props;
		try {
			await logUser(this.state.data);
			window.location.pathname = location?.state
				? location?.state.from.pathname
				: "/";
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
					<h1>Login</h1>
					{this.renderInput("email", "Email", "johndoe@gmail.com")}
					{this.renderInput("password", "Password", "secret", "password")}
					{this.renderButton("Login")}
					<div className="more">
						<p>Don't have an account ?</p>
						<Link to="/register">Sign up</Link>
					</div>
				</form>
			</Wrapper>
		);
	}
}
