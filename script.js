var table = document.getElementById("markTable");
var n = 0;
var marks = {};
var req_mark = 0;

for (j = 0; j < 1; j++) {
	addRow();
}

function setAttributes(el, attrs) {
	for (var key in attrs) {
		el.setAttribute(key, attrs[key]);
	}
}

function addRow() {
	if (n <= 10) {
		row = table.insertRow();
		title = row.insertCell(0);
		weighting = row.insertCell(1);
		mark = row.insertCell(2);
		weighted_mark = row.insertCell(3);
		required_mark = row.insertCell(4);

		title.innerHTML = n += 1;

		weightingInput = document.createElement("input");
		setAttributes(weightingInput, {
			type: "text",
			id: n + "_weighting",
			class: "td",
			oninput: "calculateMarks()",
		});
		weighting.appendChild(weightingInput);

		markInput = document.createElement("input");
		setAttributes(markInput, {
			type: "text",
			id: n + "_mark",
			class: "td",
			oninput: "calculateMarks()",
		});
		mark.appendChild(markInput);

		weighted_mark.innerHTML = "";
		required_mark.innerHTML = "";
	} else {
		alert("Too many rows!");
	}
}

function delRow() {
	table.deleteRow(-1);
	delete marks[n];
	n -= 1;
	showMark();
}

function calculateMarks() {
	for (i = 1; i <= table.rows.length - 1; i++) {
		weighting = table.rows[i].cells[1].firstChild.value;
		mark = table.rows[i].cells[2].firstChild.value;
		num = table.rows[i].cells[0].innerHTML;
		weighted_mark = table.rows[i].cells[3];
		weighted_mark.innerHTML =
			mark != ""
				? ((parseFloat(weighting, 10) * parseFloat(mark, 10)) / 100).toFixed(2)
				: 0;
		marks[i] = [
			parseFloat(weighting, 10),
			parseFloat(mark, 10),
			parseFloat(weighted_mark.innerHTML, 10),
		];
	}
	reqMark();
	showMark();
}

function reqMark() {
	wanted_mark = document.getElementById("wantedMark").value;
	var sum_marks = 0;
	var sum_weights = 0;
	if (wanted_mark != "") {
		for (x = 1; x <= Object.keys(marks).length; x++) {
			required_mark_field = table.rows[x].cells[4];
			weighting = marks[x][0];
			weighted_mark = marks[x][2];
			mark = marks[x][1];
			sum_marks += weighted_mark;
			sum_weights += weighting;
			sum_marks > 100 || sum_weights > 100 ? alert("over 100") : null;
			// math
			required_mark =
				(((wanted_mark / 100) * sum_weights - sum_marks) / weighting) * 100;
			required_mark_field.innerHTML = required_mark.toFixed(2);
		}
	}
}

function showMark() {
	sum_weights = 0;
	sum_marks = 0;

	for (x = 1; x <= Object.keys(marks).length; x++) {
		console.log(marks[x][0]);
		if (marks[x][0] != "") {
			sum_weights += marks[x][0];
			sum_marks += marks[x][2];
		} else {
			sum_marks += 0;
			sum_weights += 0;
		}
	}

	show_mark = document.getElementById("mark");
	show_mark.innerHTML = ((sum_marks / sum_weights) * 100).toFixed(2) + "%";
}
