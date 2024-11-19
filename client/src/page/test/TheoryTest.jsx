import React, { useState } from "react";
import axios from "axios";
const TheoryTestForm = ({ userId }) => {
	const [trafficSigns, setTrafficSigns] = useState(0);
	const [roadMarkings, setRoadMarkings] = useState(0);
	const [rightOfWay, setRightOfWay] = useState(0);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const totalScore = trafficSigns + roadMarkings + rightOfWay;
		try {
			const response = await axios.post("http://localhost:3000/api/theory-tests", {
				user_id: userId,
				traffic_signs: trafficSigns,
				road_markings: roadMarkings,
				right_of_way: rightOfWay,
				total_score: totalScore
			});
			if (response.ok) {
				alert("Theory test results saved successfully!");
			} else {
				alert("Failed to save theory test results.");
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<h3>Theory Test</h3>
			<div>
				<label>ผผเายจราจร (0-50):</label>
				<input
					type="number"
					value={trafficSigns}
					onChange={(e) => setTrafficSigns(parseInt(e.target.value))}
					min="0"
					max="50"
					required
				/>
			</div>
			<div>
				<label>เส้นจาราจร (0-50):</label>
				<input
					type="number"
					value={roadMarkings}
					onChange={(e) => setRoadMarkings(parseInt(e.target.value))}
					min="0"
					max="50"
					required
				/>
			</div>
			<div>
				<label>การให้ทาง (0-50):</label>
				<input
					type="number"
					value={rightOfWay}
					onChange={(e) => setRightOfWay(parseInt(e.target.value))}
					min="0"
					max="50"
					required
				/>
			</div>
			<button type="submit">บันทึกผลทดสอบทฤษฏี</button>
		</form>
	);
};

export default TheoryTestForm;
