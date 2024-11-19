var express = require("express");
var cors = require("cors");
const mysql = require("mysql2");

const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	database: "e-exam_db"
});

var app = express();
app.use(cors());
app.use(express.json());

app.post("/api/users", async (req, res) => {
	let userData = req.body;
	console.log(userData);
	let query = "INSERT INTO users (first_name, last_name) VALUES (?, ?)";
	try {
		let [result] = await db.promise().execute(query, [userData.first_name, userData.last_name]);
		res.send(result.insertId);
	} catch (error) {
		console.log(error);
	}
});

app.get("/api/users", async (req, res) => {
	let query = "SELECT * FROM users";
	try {
		await db.execute(query).then(([users]) => {
			res.status(201).json(users);
		});
	} catch (err) {
		console.log(err);
	}
});

app.post("/api/theory-tests", async (req, res) => {
	const { user_id, traffic_signs, road_markings, right_of_way, total_score } = req.body;
	const query = `
	  INSERT INTO theory_tests (user_id, traffic_signs, road_markings, right_of_way, total_score)
	  VALUES (?, ?, ?, ?, ?)
	`;
	const [result] = await db
		.promise()
		.execute(query, [user_id, traffic_signs, road_markings, right_of_way, total_score]);
});

// API สำหรับดึงข้อมูลผลการทดสอบทฤษฎี
app.get("/api/theory-tests", async (req, res) => {
	const query = "SELECT * FROM theory_tests";
	await db
		.execute(query)
		.then(([tests]) => {
			res.status(200).json(tests);
		})
		.catch((err) => {
			res.status(500).json({ error: err.message });
		});
});

app.post("/api/practical-tests", async (req, res) => {
	const { user_id, result } = req.body;
	const query = "INSERT INTO practical_tests (user_id, result) VALUES (?, ?)";
	const [test] = await db.promise().execute(query, [user_id, result]);
});

// API สำหรับดึงข้อมูลผลการทดสอบปฏิบัติ
app.get("/api/practical-tests", async (req, res) => {
	const query = "SELECT * FROM practical_tests";
	await db
		.execute(query)
		.then(([tests]) => {
			res.status(200).json(tests);
		})
		.catch((err) => {
			res.status(500).json({ error: err.message });
		});
});

app.post("/api/physical-tests", async (req, res) => {
	const { user_id, color_blindness, long_sight, astigmatism, reflex } = req.body;
	const query = `
	  INSERT INTO physical_tests (user_id, color_blindness, long_sight, astigmatism, reflex)
	  VALUES (?, ?, ?, ?, ?)
	`;
	const [result] = await db
		.promise()
		.execute(query, [user_id, color_blindness, long_sight, astigmatism, reflex]);
});

// API สำหรับดึงข้อมูลผลการทดสอบร่างกาย
app.get("/api/physical-tests", async (req, res) => {
	const query = "SELECT * FROM physical_tests";
	await db
		.execute(query)
		.then(([tests]) => {
			res.status(200).json(tests);
		})
		.catch((err) => {
			res.status(500).json({ error: err.message });
		});
});

app.listen(3000, (req, res) => {
	console.log("run port 3000");
});
