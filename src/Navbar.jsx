import { React, useEffect, useState, useContext } from "react";
import { supabase } from "./supabaseClient";
import Spinner from "./Spinner";
import CreateServerModal from "./CreateServerModal";
import SessionContext from "./SessionContext";

export default function Navbar({ settingsToggle }) {
	const { user } = useContext(SessionContext);
	// console.log("navbar", user);
	const { session } = useContext(SessionContext);
	const [loading, setLoading] = useState(false);
	const [showServerModal, setShowServerModal] = useState(false);
	// console.log(session);
	// console.log(userData);

	function createServerModal() {
		setShowServerModal(true);
		// console.log("Modal should open now");
	}

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
					<div className="absolute left-20 flex flex-col h-full justify-between">
						<div className="flex flex-col">
							<button>Example Server</button>
							<button onClick={() => createServerModal()}>Create Server</button>
						</div>
						<div className="">
							<img className="profile pic" />
							{user.username}
							<button onClick={settingsToggle}>Settings</button>
						</div>
					</div>
				</div>
			)}
			<CreateServerModal show={showServerModal} setShow={setShowServerModal} />
		</div>
	);
}
