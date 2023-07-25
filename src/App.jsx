import "./App.css";
import { useState, useEffect, useContext } from "react";
import { supabase } from "./supabaseClient";
import { SessionProvider } from "./SessionContext";
import Auth from "./Auth";
import Account from "./Account";
import Navbar from "./Navbar";
import Spinner from "./Spinner";
import Settings from "./Settings";
import SessionContext from "./SessionContext";

function App() {
	const [settings, setSettings] = useState(false);
	const [loading, setLoading] = useState(false);
	const { user, setUser } = useContext(SessionContext);
	const { session, setSession } = useContext(SessionContext);

	function settingsToggle() {
		setSettings(!settings);
	}

	const fetchUserData = async (id) => {
		setLoading(true);
		// console.log(id)
		let { data: users, error } = await supabase
			.from("users")
			.select("*")
			.eq("id", id);
		if (error) {
			console.log(error);
		} else {
			setUser(users[0]);
			// console.log(users);
		}
		setLoading(false);
	};

	useEffect(() => {
		// console.log('settings', settings)
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
			fetchUserData(session.user.id);
		});

		supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
		});
	}, [settings]);

	return (
		<div className="container" style={{ padding: "50px 0 100px 0" }}>
			{!session ? (
				<Auth />
			) : loading ? (
				<Spinner />
			) : settings ? (
				<Settings settingsToggle={settingsToggle} />
			) : (
				<div>
					<Navbar settingsToggle={settingsToggle} />
					<button
						onClick={() => {
							setSession(null);
						}}
					>
						Sign Out
					</button>
				</div>
			)}
		</div>
	);
}

export default App;
