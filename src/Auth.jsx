import { useState, useContext } from "react";
import { supabase } from "./supabaseClient";
import SessionContext from "./SessionContext.jsx";

export default function Auth() {
	const [loading, setLoading] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [login, setLogin] = useState(true);
	const [passwordConfirm, setPasswordConfirm] = useState("");
	const { session, setSession } = useContext(SessionContext);

	const handleSignup = async (event) => {
		event.preventDefault();
		if (password === passwordConfirm) {
			const { data, error } = await supabase.auth.signUp({
				email: email,
				password: password,
			});

			if (error) {
				alert(error.error_description || error.message);
			} else {
				alert("Please verify your email.");
			}
			setLoading(false);
			// console.log(data);
		} else {
			alert("Password fields must match.");
		}
	};

	function passwordVisibility(event) {
		let x = document.getElementById(event.target.previousElementSibling.id);
		if (x.type === "password") {
			x.type = "text";
		} else {
			x.type = "password";
		}
	}

	const handleLogin = async (event) => {
		event.preventDefault();

		setLoading(true);
		const { data, error } = await supabase.auth.signInWithPassword({
			email: email,
			password: password,
		});
		if (error) {
			alert(error.error_description || error.message);
		} else {
			setSession(data);
		}
		// console.log(data);
		setLoading(false);
	};

	return (
		<div className="row flex flex-center">
			{login ? (
				<div>
					<form>
						<label>
							Login
							<input
								type="text"
								name="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="Email"
							/>
							<div>
								<input
									id="loginPassword"
									type="password"
									name="password"
									value={password}
									onChange={(e) => {
										setPassword(e.target.value);
									}}
									placeholder="Enter your password"
								/>
								<button
									type="button"
									onClick={(event) => {
										passwordVisibility(event);
									}}
								></button>
							</div>
						</label>
						<div className="flex">
							<button
								className="w-1/2"
								onClick={(event) => {
									event.preventDefault();
									setLogin(false);
								}}
							>
								Don't have an account yet?
							</button>
							<input
								className="w-1/2"
								type="submit"
								onClick={(event) => {
									event.preventDefault();
									handleLogin(event);
								}}
								value="LOGIN"
							/>
						</div>
					</form>
				</div>
			) : (
				<div>
					<form>
						<label>
							Sign Up
							<input
								type="text"
								name="name"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="Email"
							/>
							<div>
								<input
									id="registerPassword"
									type="password"
									name="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									placeholder="Enter your password"
								/>
								<button
									type="button"
									onClick={(event) => {
										passwordVisibility(event);
									}}
								></button>
							</div>
							<div>
								<input
									id="registerPasswordConfirmation"
									type="password"
									name="confirmPassword"
									value={passwordConfirm}
									onChange={(e) => setPasswordConfirm(e.target.value)}
									placeholder="Confirm Password"
								/>
								<button
									type="button"
									onClick={(event) => {
										passwordVisibility(event);
									}}
								></button>
							</div>
						</label>
						<div className="flex">
							<button
								className="w-1/2"
								onClick={(event) => {
									event.preventDefault();
									setLogin(true);
								}}
							>
								Already have an account?
							</button>
							<input
								className="w-1/2"
								type="submit"
								onClick={(event) => {
									event.preventDefault();
									handleSignup(event);
								}}
								value="SIGN UP"
							/>
						</div>
					</form>
				</div>
			)}
		</div>
	);
}
