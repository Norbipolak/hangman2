/*
a jobban láthatóság miatt bemásolom, amit eddig csináltunk kommentek és az új változtatásokat kommentelem
*/

class Hangman {
    private guessInput: HTMLInputElement | null;
    private guessBtn: HTMLButtonElement | null;
    private guessedDiv: HTMLDivElement | null;
    private errorsDiv: HTMLDivElement | null;
    private hangmanImg: HTMLImageElement | null;
    private gameOverWinDiv: HTMLDivElement | null;
    private restartBtn: HTMLButtonElement | null;
    private errorNumbers: number;
    private errors: string[]
    private guessed: string[];
    private words: string[];
    private word: string;
    private end: boolean;

    constructor() {
        this.guessInput = document.querySelector("#guess-input");
        this.guessBtn = document.querySelector("#guess-btn");
        this.guessedDiv = document.querySelector("#guess-div");
        this.errorsDiv = document.querySelector("#errors-div");
        this.hangmanImg = document.querySelector("#hangman-img");
        this.gameOverWinDiv = document.querySelector("#gameover-win");
        this.restartBtn = document.querySelector("#restart-btn");
        this.errorNumbers = 0;
        this.errors = [];
        this.guessed = [];
        this.end = false;

        this.words = [
            "alma", "kecske", "monitor", "mobiltelefon", "zsemle"
        ];

        this.generateWord();
        this.Guess();
        this.Restart(); // Restart-val itt regisztráljuk ezt az eventListener-t
    }

    private generateWord() {
        this.guessed = [];
        this.word = this.words[Math.floor(Math.random() * this.words.length)]

        for (let i = 0; i < this.word.length; i++) {
            this.guessed[i] = "";

            this.ShowGuessedCharacters();

            /*
            itt még az a probléma, hogy előfordulhat, hogy volt egy hosszabb szavunk és pl. kékeszöld és 
            utána jön egy rövidebb szavunk, akkor a guessed-nek annyi eleme lesz, mint a korábbi hosszabb szó
            szoval mobiltelefon a szavunk -> _ _ _ _ _ _ _ _ _ _ _ _ és ezt kitaláltuk, akkor a következő (kecske)igy fog megjelenni 
                        e l e f o n 
            _ _ _ _ _ _ _ _ _ _ _ _  tehát kiadja a kitalálandó szónak a _ de viszont utána benthaggya az előző szónál, 
            azokat a karaktereket, amikkel több mint a mostani szavunk kitalálva, lásd kecske karakterei + elefon
            megoldás generateWord alatt rögtön 
            -> 
            this.guessed = [];
            akkor innentől kezdve, azért van jobb dolgom, mert utána újra annyi karakteres lesz a this.guessed[i] mint amennyi 
            a szavunk volt, this.word -> mert ugye feltölti újból a forciklussal, minden egyes betű után kap a guessed tömb egy 
            üres stringet belé 
            */
        }
    }

    private ShowGuessedCharacters() {
        for (const char of this.guessed) {
            const div = document.createElement("div");
            div.classList.add("guessed-char");
            div.innerText = char;
            this.guessedDiv?.appendChild(div);
        }
    }

    /*
     Ha újra szeretnénk kezdeni a játékot, akkor jó lenne, ha van egy gombunk amire rákattintva kiürül minden és 
     újra kezdjük a játékot, igy fog kinézni html-ben -> 
                    <h3>Újrakezdés</h3>
                    <div class="white-box flex">
                        <button id="restart-btn" disabled>Újrakezdés!</button>
                    </div>

    Az újrakezdés gomb az alapból disabled és majd csak akkor tudjuk újrakezdeni, ha vége a játéknak 
    csináltunk a Hangman class-ba egy private end: boolean;
    ami alapból false lesz a constructorében this.end = false;
    és ha odaérünk, ahol vége van a játéknak, akkor true-ra átváltoztatjuk 
    ez két esetben van -> (ha nyertünk és ha vesztettünk)
        1. nyertünk 
                if(!this.guessed.includes("")) {
                    ha a guessed tömb már nem tartalmaz üres stringet, akkor kiírjuk, hogy nyert
                    this.gameOverWinDiv.innerHTML = "Win!"
                    ha vesztettünk, akkor pirosan szeretnénk kiírni ami a gameOverDiv-ben van, ha pedig nyertünk akkor zöldel
                    his.gameOverWinDiv.style.color = "green";
                    this.end = true;

                2. vesztettünk 
                    if(this.errors.length === 11) {
                    this.gameOverWinDiv.innerHTML = "Game over!";//kiírja, hogy game over miután elértük az errors tömb length-jénél a 11-et 
                        his.gameOverWinDiv.style.color = "red";//pirossal írjuk ki, ha vesztettünk 
                        this.end = true;

        és még ide is be kell írni a végére-> 
                    f(this.guessInput === null || this.errorsDiv === null || this.hangmanImg === null || this.gameOverWinDiv === null || this.end)
                                
                    akkor is return ha az elején a this.end az true, this.end -> ez már alapból azt jelenti, hogy az end az true (nem kell odaírni === true)
                    akkor se lehessen tovább találgatni
        */
    private Restart() {
        this.restartBtn?.addEventListener("click" ()=> {
            /*
            Interlicenses probléma, ha null az értéke a restartBtn-nek, akkor a ?-vel this.restartBtn?.addEventListener-vel
            ez ki van védve, mert ilyenkor ha null az értéke, akkor nem tudunk tovább menni és nem tudjuk megcsinálni rá az 
            eventListener-t 
            */ 
            if(this.guessedDiv === null || this.errorsDiv === null || this.gameOverWinDiv === null)
                return;
            this.end = false;
            /*
            de amikor lejebb, ahol véget ér a játék, akkor a restartBtn-nek a disabled-je az false lesz mind a két helyen, kimenetben!!!!!!!!!
            ennél is kell a this.restartBtn === null a guess-ben hiszen, ott adjuk meg neki, hogy a restartBtn.disaled = false;
            Alapból le volt tiltva nekünk, de ha véget ér a játék, akkor ez a letiltás feloldodik 
            de nem csak feloldodik ez a tiltás, de ha megnyomjuk ezt a gombot, akkor utána újra le kell tiltanunk addig 
            még nem fejeződik be egy új játék 
            */
            //this.restartBtn.disabled = true;
            /*
            és akkor ezt a sort this.restartBtn.disabled = true; lehet helyetesíteni azzal(teljesen ugyanazt csinálja), hogy 
            -> 
            */
            this.restartBtn?.setAttribute("disabled", "true");
            /*
            de még a Restartnak azt is tartalmaznia kéne, hogy kiüritjük a helyes karakterek div-et és a hibás karakterek div-et 
            illetve levesszük a képet, miután vége lett a játéknak és még azt is, hogy generáljon egy új szót, szóval meg kell itt hívni a 
            generateWord függvényt 
            */
            this.generateWord();
            /*
            még ugye kiűrítjük a guessedDiv-et és az errorsDiv-et is 
            ugyanugy setAttribute-val, nem így, this.guessedDiv?.innerHTML = "";
            */
            // this.guessedDiv?.setAttribute("innerHTML", "");
            // this.errorsDiv?.setAttribute("innerHTML", "");
            /*
            nem müködik itt a setAttribute-os dolog, ezért felül if-vel megcsináljuk
                if(this.guessedDiv === null || this.errorsDiv === null)
                    return;
            */
            this.guessedDiv.innerHTML = "";
            this.errorsDiv.innerHTML = "";
            //és még ki kell szedni a képet a játék után, hogy ne maradjon ott 
            this.hangmanImg?.setAttribute("src", "");
            /*
            és ezenkívül meghatározunk az imng-nek html-ben egy holder div-et
            -> 
                <div id="hangman-holder">
                    <img id="hangman-img">
                </div>

            és még a gameover-win-nek a mezőjébe beleírjuk, hogy Game Started, hogy alapból be legyen írva, amikor a játék kezdődik
                <div class="box">
                <div id="gameover-win">Game Started!</div> !!!
                <div id="hangman-holder">
                    <img id="hangman-img">
                </div>
            </div>

            de amikor vége van és vesztettünk, akkor azt írja, hogy Game Over! és ezt benthaggya, azt szeretnénk, ha azt írná ki
            amiután rákattintunk az újrakezdés gombra, hogy Game Started, ne azt, hogy Game Over!
            */
            this.gameOverWinDiv.innerHTML = "Game Started!";
            this.gameOverWinDiv.style.color = "";
            /*
            meghatároztuk alapból blue-ra a css-ben 
            #gameover-win {
            font-size: 45px;
            text-align: center;
            color: blue;
            */


        });
    }

    private Guess() {
        this.guessBtn?.addEventListener("click"()=> {
            if(this.guessInput === null || this.errorsDiv === null || this.hangmanImg === null || this.gameOverWinDiv === null || this.end
            || this.restartBtn === null)
        /*
        akkor is return ha az elején a this.end az true, this.end -> ez már alapból azt jelenti, hogy az end az true (nem kell odaírni === true)
        akkor se lehessen tovább találgatni
        */
        return;

        const char: string | undefined = this.guessInput.value.toString();

        this.guessInput.value = "";//ha megnyomjuk az tippelés gombot, akkor kiürüljön az input mező 

        if (!this.word.includes(char)) {
            if (this.errors.includes(char)) { //nem engedi beírni azt a betűt, amit már tartalmaz az errors mégegyszer
                return;
            }
            this.errors.push(char);

            /*
            Ha rosszat írunk be, akkor a hibás karaktereket fel kell majd sorolni, hogy lássuk 
            miket tippeltünk már rosszul 

            Tehát az errors tömbben betöltött rossz betűket megjelenítjük join-val egy stringként vesszővel összekötve 
            */
            this.errorsDiv.innerHTML = this.errors.join(", ");
            /*
            mondjuk a kitalálandó szó az a mobiltelefon és a beírunk egy x-et vagy bármit ami nincsen benne 
            akkor meg fog jelenni az a betű, ami nincsen benne a bongésőben a hibás karaktereknél -> 
                 <h3>Hibás karakterek</h3>
                 <div class="white-box" id="errors-div"></div>
             
             és ha hibáztunk, akkor jó lenne megjeleníteni a képet, ha egyszer hibáztunk, akkor a hangman1.png
             ha kétszer, akkor a hangman2.png-t és így tovább
 
             van ez a <img id="hangman-img"> és ennek fogjuk a src attributumát cserélgetni aszerint, hogy éppen 
             hányadik hibánál tartunk, méghozzá olyan formában tudjuk, hogy hány hibánk volt, hogy pontosan ennyi 
             eleme van az errros tömbnek 
            */
            this.hangmanImg.src = `hangman${this.errors.length}.png`;
            /*
            Ezzel még az a probléma, hogyha beírunk egy rossz karaktert és már kijőtt az akasztófa, tehát vesztettünk
            akkor megprobálja megnyitni a hangman12.png, ami már nincsen és kapunk egy hibaüzenetet
            és még azt is csinálhatjuk, hogy egy betűt többször adunk meg, beírjuk a q betűt az input mezőbe és utána mégegyszer, mégegyszer 
            és alul a hibás karaktereknél -> q, q, q, q
            ami hibás mert ha már egyszer beírtam egy rossz karaktert azt ne lehessen mégegyszer beírni és ne jelentsen mégegy hibát
            -> 
            ha már egyszer tartalmazta azt a karaktert, akkor ne írja be mégegyszer

            if (!this.word.includes(char)) {
            if(this.errors.includes(char)) {
                return;
            */

            /*
            Mikor van game-over -> ha az errors-nak a length-je az 11(mert annyi lépésből rajzolodik ki a hangman)
            és ha az errors 11, akkor kell valamit írni a felhasználónak, hogy vége a játék -> html
                <div class="box">
                <div id="gameover-win"></div>    ezt a sort raktuk bele és formáztuk meg css-ben plusz lementjük ide 
                <img id="hangman-img">
            #gameover-win {
            font-size: 45px;
            text-align: center;
            } 
            */
            if (this.errors.length === 11) {
                this.gameOverWinDiv.innerHTML = "Game over!";//kiírja, hogy game over miután elértük az errors tömb length-jénél a 11-et 
                this.gameOverWinDiv.style.color = "red";//pirossal írjuk ki, ha vesztettünk 
                this.end = true;
                this.restartBtn.disabled = false;
            }
        } else {
            if (this.guessedDiv)
                this.guessedDiv.innerHTML = "";

            for (let i = 0; i < this.word.length, i++) {
                if (char === this.word[i]) {
                    this.guessed[i] = char;
                }
            }

            this.ShowGuessedCharacters();

            /*
            Honnan tudjuk, hogy nyert a felhasználó -> 
            onnan, ha a guessed tömbben már nincsen üres string 
            */
            if (!this.guessed.includes("")) {
                //ha a guessed tömb már nem tartalmaz üres stringet, akkor kiírjuk, hogy nyert
                this.gameOverWinDiv.innerHTML = "Win!"
                //ha vesztettünk, akkor pirosan szeretnénk kiírni ami a gameOverDiv-ben van, ha pedig nyertünk akkor zöldel
                this.gameOverWinDiv.style.color = "green";
                this.end = true;
                this.restartBtn.disabled = false;
            }
        }

    });
}  
}


new Hangman();
