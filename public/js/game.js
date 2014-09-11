var socket = io();
var gameover = false;
var buttons = [ button1, button2, button3, button4, button5, button6, button7,
		button8, button9 ];

function checkCombo(b1, b2, b3) {
	if (b1.innerHTML !== '' && b1.innerHTML === b2.innerHTML
			&& b2.innerHTML === b3.innerHTML) {
		gameover = true;
		b1.style.backgroundColor = '#50ACFF';
		b2.style.backgroundColor = '#50ACFF';
		b3.style.backgroundColor = '#50ACFF';

	}

}

function checkWin() {
	checkCombo(button1, button2, button3);
	checkCombo(button4, button5, button6);
	checkCombo(button7, button8, button9);
	checkCombo(button1, button4, button7);
	checkCombo(button2, button5, button8);
	checkCombo(button3, button6, button9);
	checkCombo(button1, button5, button9);
	checkCombo(button3, button5, button7);
}

function sendPickSquare(index) {
	return function() {
		if (gameover || buttons[index].innerHTML !== "")
			return;
		socket.emit('move', {
			'index' : index,
			'value' : selectTurn.value
		});
	};
}

socket.on('move', function(move) {
	buttons[move.index].innerHTML = move.value;

	if (move.value === 'X') {
		selectTurn.value = 'O';
	} else {
		selectTurn.value = 'X';
	}
	checkWin();
});

function resetGame() {
	for (var i = 0; i < buttons.length; i++) {
		buttons[i].style.backgroundColor = '';
		buttons[i].innerHTML = "";
	}
	gameover = false;
}

for (var i = 0; i < buttons.length; i++) {
	buttons[i].onclick = sendPickSquare(i);
}

$('#replayButton').click(function() {
	socket.emit('reset', "");
});

socket.on('reset', function() {
	resetGame();
});