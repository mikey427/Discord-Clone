// SessionContext.js
import React, { createContext, useState } from "react";

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
	const [session, setSession] = useState(null);
	const [user, setUser] = useState(null); // You can store the user object here, containing user data after successful authentication

	// Add other session-related state and functions as needed

	return (
		<SessionContext.Provider value={{ user, setUser, session, setSession }}>
			{children}
		</SessionContext.Provider>
	);
};

export default SessionContext;
