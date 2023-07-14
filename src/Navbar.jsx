import { React, useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import Spinner from "./Spinner";

export default function Navbar({ session, settingsToggle, userData }) {
	const [loading, setLoading] = useState(false);
	// console.log(session);
	// console.log(userData);
	return (
		<div>
			{loading ? (
				<Spinner />
			) : (
				<div className="absolute left-0 top-0 h-screen w-44 flex space-between border">
					<div className="flex flex-col border w-20">
						<button>1</button>
						<button>2</button>
						<button>3</button>
					</div>
					<div className="absolute left-20 bottom-0 flex">
						<img className="profile pic" />
						{userData.username}
						<button onClick={settingsToggle}>Settings</button>
					</div>
				</div>
			)}
		</div>
	);
}
