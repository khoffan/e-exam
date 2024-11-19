import React, { useState } from "react";
import axios from "axios";
const PracticalTestForm = ({ userId }) => {
	const [result, setResult] = useState("pass");

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post("http://localhost:3000/api/practical-tests", {
				user_id: userId,
				result: result
			});
			if (response.ok) {
				alert("Practical test result saved successfully!");
			} else {
				alert("Failed to save practical test result.");
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<h3>Practical Test</h3>
			<div>
				<label>Result:</label>
				<select value={result} onChange={(e) => setResult(e.target.value)}>
					<option value="pass">ผ่าน</option>
					<option value="fail">ไม่ผ่าน</option>
				</select>
			</div>
			<button type="submit">บันทึกผลทดสอบปฎิบัติ</button>
		</form>
	);
};

export default PracticalTestForm;
