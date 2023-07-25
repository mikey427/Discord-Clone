import { React, useState, useContext } from "react";
import { supabase } from "./supabaseClient";
import SessionContext from "./SessionContext";

export default function Settings({ settingsToggle }) {
	const { user } = useContext(SessionContext);
	const { session } = useContext(SessionContext);
	const [editingProfilePic, setEditingProfilePic] = useState(false);
	const [editingDisplayName, setEditingDisplayName] = useState(false);
	const [editingBio, setEditingBio] = useState(false);
	const [profilePic, setProfilePic] = useState(user.profilePic);
	const [displayName, setDisplayName] = useState(user.username);
	const [bio, setBio] = useState(user.bio);
	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmNewPassword, setConfirmNewPassword] = useState("");

	const handleSubmit = async (event) => {
		setEditingDisplayName(false);
		setEditingBio(false);
		setEditingProfilePic(false);
		let updatedFields = {};

		if (displayName != user.username) {
			updatedFields.username = displayName;
		}

		if (bio != user.bio) {
			updatedFields.bio = bio;
		}

		if (profilePic != user.profilePic) {
			updatedFields.profilePic = profilePic;
		}

		const { error } = await supabase
			.from("users")
			.update(updatedFields)
			.eq("id", user.id);

		if (error) {
			alert(error.error_description || error.message);
		} else {
			alert("Data Updated Successfully");
		}
	};

	const updatePassword = async (event) => {
		const { data, error } = await supabase.auth.signInWithPassword({
			email: session.user.email,
			password: currentPassword,
		});

		if (error) {
			setCurrentPassword("");
			alert(error.error_description || error.message);
		} else {
			if (newPassword === confirmNewPassword) {
				const { error } = await supabase.auth.updateUser({
					password: newPassword,
				});
				if (error) {
					alert(error.error_description || error.message);
				} else {
					alert("Successfully updated password.");
				}
				setCurrentPassword("");
				setNewPassword("");
			} else {
				alert("Confirm both password fields");
			}
		}
	};

	return (
		<div className="w-1/2 mx-auto flex flex-col">
			<div>My Account Settings</div>
			<div>
				<form className="flex flex-col">
					<div>Profile Pic</div>
					<div>
						<label>Display Name</label>
						<input
							id="displayName"
							type="text"
							value={displayName}
							name="displayName"
							onChange={(e) => {
								setDisplayName(e.target.value);
							}}
							readOnly={!editingDisplayName}
						/>
						<button
							onClick={(e) => {
								e.preventDefault();
								setEditingDisplayName(!editingDisplayName);
							}}
						></button>
					</div>
					<div>
						<label>Bio</label>
						<input
							id="bio"
							type="text"
							name="Bio"
							value={bio}
							onChange={(e) => {
								setBio(e.target.value);
							}}
							readOnly={!editingBio}
						/>
						<button
							onClick={(e) => {
								e.preventDefault();
								setEditingBio(!editingBio);
							}}
						></button>
					</div>

					<button
						type="submit"
						className=""
						onClick={(e) => {
							e.preventDefault();
							handleSubmit(event);
						}}
					>
						Save Changes
					</button>
				</form>
			</div>
			<form>
				<label>Current Password</label>
				<input
					id="currentPassword"
					type="password"
					name="currentPassword"
					value={currentPassword}
					onChange={(e) => {
						setCurrentPassword(e.target.value);
					}}
				/>
				<label>New Password</label>
				<input
					id="newPW"
					type="password"
					name="newPW"
					value={newPassword}
					onChange={(e) => {
						setNewPassword(e.target.value);
					}}
				/>
				<label>Confirm New Password</label>
				<input
					id="confirmNewPW"
					type="password"
					name="confirmNewPW"
					value={confirmNewPassword}
					onChange={(e) => {
						setConfirmNewPassword(e.target.value);
					}}
				/>
				<button
					type="submit"
					className=""
					onClick={(e) => {
						e.preventDefault();
						updatePassword(event);
					}}
				>
					Update Password
				</button>
			</form>
			<button onClick={settingsToggle}>Back</button>
		</div>
	);
}
