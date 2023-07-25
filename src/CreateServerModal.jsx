import { React, useState, useEffect } from "react";

export default function CreateServerModal({ show, setShow }) {
	// console.log("Modal show prop:", show);
	const [visible, setVisible] = useState(show);

	useEffect(() => {
		setVisible(show);
	}, [show]);

	if (visible) {
		return (
			<div>
				MODAL
				<button
					onClick={() => {
						setVisible(false);
						setShow(false);
					}}
				>
					X
				</button>
			</div>
		);
	} else {
		return null;
	}
}
