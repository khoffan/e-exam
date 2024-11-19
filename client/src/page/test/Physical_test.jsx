import React, { useState } from "react";
import axios from "axios";
const PhysicalTestForm = ({ userId }) => {
	const [colorBlindness, setColorBlindness] = useState("pass");
	const [longSight, setLongSight] = useState("pass");
	const [astigmatism, setAstigmatism] = useState("pass");
	const [reflex, setReflex] = useState("pass");

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post("http://localhost:3000/api/physical-tests", {
				user_id: userId,
				color_blindness: colorBlindness,
				long_sight: longSight,
				astigmatism: astigmatism,
				reflex: reflex
			});
			if (response.ok) {
				alert("Physical test results saved successfully!");
			} else {
				alert("Failed to save physical test results.");
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<h3>Physical Test</h3>
			<div>
				<label>Color Blindness:</label>
				<select value={colorBlindness} onChange={(e) => setColorBlindness(e.target.value)}>
					<option value="pass">ผ่าน</option>
					<option value="fail">ไม่ผ่าน</option>
				</select>
			</div>
			<div>
				<label>Long Sight:</label>
				<select value={longSight} onChange={(e) => setLongSight(e.target.value)}>
					<option value="pass">ผ่าน</option>
					<option value="fail">ไม่ผ่าน</option>
				</select>
			</div>
			<div>
				<label>Astigmatism:</label>
				<select value={astigmatism} onChange={(e) => setAstigmatism(e.target.value)}>
					<option value="pass">ผ่าน</option>
					<option value="fail">ไม่ผ่าน</option>
				</select>
			</div>
			<div>
				<label>Reflex:</label>
				<select value={reflex} onChange={(e) => setReflex(e.target.value)}>
					<option value="pass">ผ่าน</option>
					<option value="fail">ไม่ผ่าน</option>
				</select>
			</div>
			<button type="submit">บันทึกผลทดสอบร่างกาย</button>
		</form>
	);
};

export default PhysicalTestForm;
