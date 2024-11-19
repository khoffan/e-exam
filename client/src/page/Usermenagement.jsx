import React, { useCallback, useState } from "react";
import PhysicalTestForm from "./test/Physical_test";
import TheoryTestForm from "./test/TheoryTest";
import PracticalTestForm from "./test/PracticalTest";
import axios from "axios";
function Usermenagement() {
	const [firstName, setFirstname] = useState("");
	const [lastName, setLastname] = useState("");
	const [userId, setUserid] = useState(null);
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post("http://localhost:3000/api/users", {
				first_name: firstName,
				last_name: lastName
			});
			if (response.ok) {
				const res = response.data;
				alert("User added successfully!");
				setUserid(res);
				setFirstname("");
				setLastname("");
			} else {
				console.log(response.status);
				alert("Failed to add user.");
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				ชื่อ{" "}
				<input
					type="text"
					name=""
					id=""
					value={firstName}
					onChange={(e) => setFirstname(e.target.value)}
				/>
				นามสกุล{" "}
				<input
					type="text"
					name=""
					id=""
					value={lastName}
					onChange={(e) => setLastname(e.target.value)}
				/>
				<button type="submit">บันทึก</button>
			</form>
			<PhysicalTestForm userId={userId} />
			<TheoryTestForm userId={userId} />
			<PracticalTestForm userId={userId} />
		</>
	);
}

export default Usermenagement;
