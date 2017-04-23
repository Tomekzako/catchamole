document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM');
    const body = document.querySelector('body');
    const container = document.querySelector('.container');
    const lvl = container.querySelector('.lvl');
    let scoreBoard = document.querySelector('.scoreBoard');
    const moleHill = document.querySelectorAll('.moleHill');
    const mole = document.querySelectorAll('.mole');
    const start = document.querySelector('#zoom').firstElementChild;
    const table = document.querySelector('#scoreTable');
    const h1Best = document.querySelector('.best');
    const right = document.querySelector('.right');
    console.log(start);
    let lastHole = 0;
    let finishGame = false;
    var score = 0;
    let level = 1;
    let levelScore = 0;
    let minScore = 0;
    const intro = document.querySelector('.intro');
    const firstBtn = intro.querySelector('.firstBtn');
    const allResults = intro.querySelector('.allResults');

    allResults.addEventListener('click', function () {
        const resultSite = document.createElement('div');
        resultSite.classList.add('main');
        container.style.display = "none";
        intro.classList.add('introUp');
        const children = intro.children;
        for (var i = 0; i < children.length; i++) {
            children[i].style.display = 'none';
        }
        resultSite.innerHTML = '<p class="back">Main menu</p>';
        table.style.display = 'table';
        h1Best.style.display = 'block';
        var tbody = table.querySelectorAll('tr:not(.thead)');
        console.log(tbody);
        for (var i = tbody.length; i >= 0; i--) {
            if (tbody[i] && tbody[i].parentElement)
                tbody[i].parentElement.removeChild(tbody[i]);
        }
        var results = app.database().ref('Results');
        results.on("value", function (data) {
            var scores = data.val();
            var arr = [];
            for (var prop in scores) {
                arr.push(scores[prop]);
            }

            arr.sort(function (a, b) {
                return b.score - a.score;
            });
            for (var i = 0; i < arr.length; i++) {
                const tr = document.createElement('tr');
                tr.innerHTML = '<td>' + arr[i].name + '</td><td>' + arr[i].score + '</td>';
                table.appendChild(tr);
            }

        }, function (error) {
            console.log("Error: " + error.code);
        });
        body.appendChild(resultSite);

        const menu = resultSite.querySelector('.back');
        console.log(menu);
        menu.addEventListener('click', function () {
            console.log('click');
            intro.classList.remove('introUp');
            const children = intro.children;
            for (var i = 0; i < children.length; i++) {
                children[i].style.display = 'block';
            }
            body.removeChild(resultSite);
            table.style.display = 'none';
            h1Best.style.display = 'none';
            container.style.display = "block";
        });
    });


    firstBtn.addEventListener('click', function () {
        intro.classList.add('introUp');
        const children = intro.children;
        for (var i = 0; i < children.length; i++) {
            children[i].style.display = 'none';
        }
        lvl.innerText = 'Level ' + level;
        finishGame = true;
        scoreBoard.innerText = 0;
        score = 0;
        levelScore = 0;
    });

    right.addEventListener('click', function () {
        intro.classList.remove('introUp');
        const children = intro.children;
        for (var i = 0; i < children.length; i++) {
            children[i].style.display = 'block';
        }
    });


    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    function randomHole() {
        let rand = randomInt(0, 6);

        while (rand === lastHole) {
            rand = randomInt(0, 6);
        }

        lastHole = rand;
        return rand;
    }


    function mollMove() {

        let time = randomInt();

        switch (level) {
            case 1:

                time = randomInt(2000, 2500);
                console.log(time);
                break;

            case 2:

                time = randomInt(1500, 2000);
                console.log(time);
                break;

            case 3:

                time = randomInt(1000, 1500);
                console.log(time);
                break;

            case 4:

                time = randomInt(750, 1000);
                console.log(time);
                break;

            case 5:
                time = randomInt(500, 750);
                console.log(time);
                break;

            case 6:

                time = randomInt(300, 500);
                console.log(time);
                break;

            case 7:

                time = randomInt(250, 400);
                console.log(time);
                break;

            case 8:

                time = randomInt(200, 300);
                console.log(time);
                break;

            case 9:

                time = randomInt(200, 250);
                console.log(time);
                break;

            case 10:

                time = randomInt(150, 200);
                console.log(time);
                break;

            case 11:

                time = randomInt(50, 100);
                console.log(time);
                break;
        }

        const hole = moleHill[randomHole()];
        hole.classList.add('up');

        setTimeout(() => {
            hole.classList.remove('up');
            if (!finishGame) mollMove();
        }, time);
    }

    function startGame() {
        console.log(startGame);
        start.parentElement.style.display = 'none';

        if (level == 1) {
            minScore = 5;
        } else if (level == 2) {
            minScore = 11;
        } else if (level == 3) {
            minScore = 17;
        } else if (level == 4) {
            minScore = 23;
        } else {
            minScore = 28;
        }
        finishGame = false;
        mollMove();

        setTimeout(() => {
            finishGame = true;
            start.parentElement.style.display = 'block';
            createDiv(score);
        }, 15000);

    }


    start.addEventListener('click', function () {
        timer();


    });

    let count = 4;

    function timer() {
        count = 4;
        const countTimer = document.createElement('div');
        countTimer.style.display = 'block';
        countTimer.classList.add('fullCount');
        let counter = setInterval(function () {
            count = count - 1;
            console.log(count);

            if (count <= 0) {
                clearInterval(counter);
                countTimer.style.display = 'none';
                startGame();
                return;
            }
            countTimer.innerHTML = '<h1>' + count + '</h1>'
            body.appendChild(countTimer);
        }, 1000);
    }


    function createDiv() {
        var newDiv = document.createElement('div');
        newDiv.classList.add('fullScreen');
        newDiv.innerHTML = '<h2 class="scoreResult">Your score = ' + score + '</h2>';

        if (score >= minScore && levelScore > 1 && level <= 10) {
            newDiv.style.backgroundImage = "url(images/maxresdefault.jpg)";
            newDiv.style.backgroundRepeat += ('no-repeat');
            newDiv.innerHTML += '<h2 class="proceedNote">GREAT JOB!!! You can challenge next level</h2>';
            newDiv.innerHTML += '<button class="next">Next Level</button><button class="prev">Try again</button><p class="return">Main menu</p>';
        } else if (score < minScore && level <= 10) {
            newDiv.style.backgroundImage = "url(images/Don-t-Give-Up.jpg)";
            newDiv.innerHTML += '<h2 class="alertNote">You need at least ' + minScore + ' points to proceed to the next level</h2><div class="formBase"><label>Name:</label></br><input type="text" id="name" name="name" placeholder="Type your name:"><button id="subme">Submit</button></div>';
            newDiv.innerHTML += '<span class="noNext">Next Level</span><button class="prev">Try again</button><p class="return">Main menu</p>';
            const formBase = newDiv.querySelector('.formBase');
            console.log(formBase);
            const submit = formBase.querySelector('#subme');
            const input = formBase.querySelector('input');
            console.log(submit);

            submit.addEventListener('click', function () {

                const inputVal = input.value;
                input.value = '';
                var results = app.database().ref('Results');
                var bestResults = results.push({
                    name: inputVal,
                    score: score
                });
                console.log(bestResults.key);
            });
        } else if (score >= minScore && levelScore > 1 && level > 10) {
            newDiv.style.backgroundImage = "url(images/maxresdefault.jpg)";
            newDiv.style.backgroundRepeat += ('no-repeat');
            newDiv.innerHTML += '<h2 class="proceedNote">CONGRATULATIONS!!! You finished a game with ' + score + ' points</h2><div class="formBase"><label>Name:</label></br><input type="text" id="name" name="name" placeholder="Type your name:"><button id="subme">Submit</button></div>';
            newDiv.innerHTML += '<span class="noNext">Next Level</span><button class="prev">Try again</button><p class="return">Main menu</p>';
            const formBase = newDiv.querySelector('.formBase');
            console.log(formBase);
            const submit = formBase.querySelector('#subme');
            const input = formBase.querySelector('input');
            console.log(submit);

            submit.addEventListener('click', function () {

                const inputVal = input.value;
                input.value = '';
                var results = app.database().ref('Results');
                var bestResults = results.push({
                    name: inputVal,
                    score: score
                });
                console.log(bestResults.key);
            });
        } else {
            newDiv.style.backgroundImage = "url(images/Don-t-Give-Up.jpg)";
            newDiv.innerHTML += '<h2 class="alertNote">You need to score at least 2 to proceed to the next level</h2><div class="formBase"><label>Name:</label></br><input type="text" id="name" name="name" placeholder="Type your name:"><button id="subme">Submit</button></div>';
            newDiv.innerHTML += '<span class="noNext">Next Level</span><button class="prev">Try again</button><p class="return">Main menu</p>';

            const formBase = newDiv.querySelector('.formBase');
            console.log(formBase);
            const submit = formBase.querySelector('#subme');
            const input = formBase.querySelector('input');
            console.log(submit);

            submit.addEventListener('click', function () {
                console.log('działa');
                const inputVal = input.value;
                input.value = '';
                var results = app.database().ref('Results');
                var bestResults = results.push({
                    name: inputVal,
                    score: score
                });
                console.log(bestResults.key);
            });
        }

        body.appendChild(newDiv);
        const menu = newDiv.querySelector('p');
        menu.addEventListener('click', function () {
            intro.classList.remove('introUp');
            const children = intro.children;
            for (var i = 0; i < children.length; i++) {
                children[i].style.display = 'block';
            }
            body.removeChild(newDiv);
            level = 1;
        });

        const prev = newDiv.querySelector('.prev');
        prev.addEventListener('click', function () {
            body.removeChild(newDiv);
            scoreBoard.innerText = 0;
            score = 0;
            levelScore = 0;
            console.log(score);
        });

        const next = newDiv.querySelector('.next');
        next.addEventListener('click', function () {
            body.removeChild(newDiv);
            levelScore = 0;
            level++;
            lvl.innerText = 'Level ' + level;
            console.log(minScore);
        });
    }


    for (var i = 0; i < mole.length; i++) {
        mole[i].addEventListener('click', function (e) {
            const layerX = e.layerX;
            const layerY = e.layerY;
            if (layerX > 55 && layerX < 136 && layerY > 25 && layerY < 100) {
                levelScore++;
                score++;
                scoreBoard.innerText = score;
                this.parentElement.classList.remove('up');

            }
        });
    }

    for (var i = 0; i < moleHill.length; i++) {
        moleHill[i].addEventListener('click', function (e) {
            if (this.classList.contains('up')) {
                const hillLayerX = e.layerX;
                const hillLayerY = e.layerY;
                console.log(hillLayerX, hillLayerY);
                if (hillLayerX > 170 && hillLayerX < 215 && hillLayerY > 0 && hillLayerY < 40) {
                    levelScore++;
                    score++;
                    scoreBoard.innerText = score;
                    this.classList.remove('up');
                }
            }
        });
    }


    var config = {
        apiKey: "AIzaSyD6bNtG-ckHmAyqOJqlwi7RKL_4YeFyts8",
        databaseURL: "https://catch-a-mole.firebaseio.com",
    };
    var app = firebase.initializeApp(config);



});