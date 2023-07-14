import "./App.css";
import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import Auth from "./Auth";
import Account from "./Account";
import Navbar from "./Navbar";
import Spinner from "./Spinner";
import Settings from "./Settings";

function App() {
	const [session, setSession] = useState(null);
	const [settings, setSettings] = useState(false);
	const [user, setUser] = useState();
	const [loading, setLoading] = useState(false);

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
			) : loading ? (<Spinner />) : settings ? (<Settings session={session} settingsToggle={settingsToggle} user={user} />) : (
				<div key={session.user.id} session={session}>
					<Navbar session={...session} settingsToggle={settingsToggle} userData={user} />
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
