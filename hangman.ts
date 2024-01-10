class Hangman {
    private guessInput: HTMLInputElement | null;
    private guessBtn: HTMLButtonElement | null;
    private guessedDiv: HTMLDivElement | null;
    private errorsDiv: HTMLDivElement | null;
    private errorNumbers: number;
    private errors: string[]
    private guessed: string[];
    private words: string[]; 
    private word: string;

    constructor() {
        this.guessInput = document.querySelector("#guess-input");
        this.guessBtn = document.querySelector("#guess-btn");
        this.guessedDiv = document.querySelector("#guess-div");
        this.errorsDiv = document.querySelector("#errors-div");
        this.errorNumbers = 0;
        this.errors = [];
        this.guessed = [];

        this.words = [
            //megadjuk a szavakat, amiből, majd random valamelyiket beteszi, hogy ki lehessen találni 
            "alma", "kecske", "monitor", "mobiltelefon", "zsemle"
        ];

        this.generateWord(); //meghívjuk itt a generateWord-ot!!!!!!
        this.Guess(); //meghívjuk a Guessed-et 
    }

    private generateWord() {
        //ez annyit csinál, hogy a words-ből véletlenszerűen választunk 
        this.word = this.words[Math.floor(Math.random() * this.words.length)]
        console.log(this.word);//kiírja mindig az aktuális szavunkat, pl. alma utána ujratöltünk zsemle stb.

        /*
        annyi üres stringet fog csinálni a tömbben, ahány betűs a kitalálandó szó 
        és akkor, így fog megjelenni a kitalálandó szó a áték elején -> _ _ _ _ _ _ , ha mondjuk a kitalálandó szó a zsemle
        tehát a zsemle minden eggyes karaktere egy üres string a guessed tömbben, amig nem találjuk ki 
        */
        for(let i = 0; i < this.word.length; i++) {
            this.guessed[i] = "";

        this.ShowGuessedCharacters(); 
        }
    }

    private ShowGuessedCharacters() { //ezt majd meghívjuk a generateWord-ben és a Guess else ágában is!!!!!!!!!!!!!!!!!!!!!!!!!4
        /*
        látni kellene alapból, hogy hány karakterünk van, hogy tudjuk tippelni 
        */
        for(const char of this.guessed) {
            /*
            <div class="white-box flex" id="guessed-div">
                <div class="guessed-char">a</div>
            minden karakternek létrehozunk egy div-et mint itt felette van, (manuálisan létrehoztuk a html-ben és bemutattuk milyen lesz) 
            hogy látszodjon a bongészőben hány karakteres a kitalálandó szó
            */
                const div = document.createElement("div");
                div.classList.add("guessed-char");
                div.innerText = char; 
                this.guessedDiv?.appendChild(div);
           }
    }
    /*
    Ha megnyomjuk a gombot, akkor össze kell hasonlítani a this.word-ot a betűvel, amit beírtunk 
    az input mezőbe, hogy tartalmazza-e a this.word
    */ 
    private Guess() {
        this.guessBtn?.addEventListener("click" ()=> {
            if(this.guessInput === null)//ha véletlen a guessInput az null lenne akkor rögtön return-elünk, mert akkor semmit nem tudunk csinálni
                return;

            //egy változóban egyenlővé tesszük a betűt, amit beírtunk az input mezőbe 
            const char:string|undefined = this.guessInput.value.toString();
            /*
            Az a problémája, hogy lehetséges szerinte, hogy a guessInput az null értékű -> private guessInput: HTMLInputElement | null;,
            mert, hogy rosszul adtuk meg az id-t vagy nincs ilyen id
            ezért kivédjük azzal, hogy írunk egy kérdőjelet = this.guessInput?.value
            de akkor a value lehet, hogy undefined lesz 
            ilyenkor az lesz a típusa a const char-nak, hogy never mert nem kap ilyenkor vissza értéket vagy undefined
            const char:string|never -> ilyenkor az lesz a problémája, hogy never, de nem használtuk semmire sem
            ilyenkor meg az a problémaja, hogy az includes this.word.includes(char);
            mert az undefined-val nem müködik az includes, de ugyanugy lefordul és müködik, csak alá lesz húzva 

            erre a megoldás -> 
            
            !!!!!!Megnéztük, hogy a kitalálandó szóban van-e olyan karakter, amit beírtunk 
        
            */
            if(char !== undefined)
                return; //ha a char undefined, akkor egyszerűen csak return, ugy sem tudunk vele mit kezdeni 

            this.guessInput.value = "";//ha megnyomjuk az tippelés gombot, akkor kiürüljön az input mező 

            if(!this.word.includes(char)) {
                //ha nincs benne a betű, akkor az errors tömbbe belerakosgatni, azokat a karaktereket amelyek nem jók 
                this.errors.push(char);
            } else {
                /*
                itt minden alkalommal ki kell majd üreteni, hogy ha van egy új szó akkor majd annyi üres div mező generálodjon le 
                ahány betűs a szavunk 
                */
                if(this.guessedDiv)
                /*
                ez azért kell, hogy a guessedDiv létezik és nem undefined az értéke
                az if-es megoldás, azért kellett, mert -> this.guessedDiv?.innerHTML = ""; elvileg ugyanazt csinálja de nem volt jó 
                */          
                this.guessedDiv.innerHTML = "";//ezzel generákjuk le ami ebben van itt alatta for(const char of this.guessed)
                /*
                ha benne van a karakter akkor lesz érdekes, mert pl. a zongora szóban az o betű kétszer szerepel
                és nekünk tudnunk kell, hogy hányadik helyen szerepel ez a két karakter -> _ o _ _ o _ _
                A legelején, amikor a szót legeneráltuk(generateWord), akkor guessed tömben
                azok, azok a karakterek, amiket már kitaláltunk, ott azt kell csinálni(alsóvonást rakni vagy üres stringet csinálni)
                annyi eleme legyen a guessed tömbnek, mint ahány karaktere a szónak, mert csak ugy tudjuk megcsinálni, hogy kiírjuk -> 
                _ _ _ _ _ _ -> zsemle a kitaláálandó szó, és utána ha kitaláltuk az e betűt _ _ e _ _ e (generateWord-ben ezt megcsináltuk)
                */
               for(let i = 0; i < this.word.length, i++) {
                //végigmegyünk a word karakterein 
                if(char === this.word[i]){
                    /*
                    ha a karakter, amit beírtunk az input mezőben(char) az egyenlő(megtalálható) a this.word[i]-ben
                    tehát a karakter, amit beírtunk az megegyezik a kitalálandó szó bármelyik indexű elemével
                    és ezt a for ciklus leellenőrzi, pl. zongora a kitalálandó szó és n-et írtunk be,
                    akkor megy a for ciklus és eggyesével hasonlítja össze, z nem az(nem egyenlő), megy tovább o nem egyenlő......
                    */
                    this.guessed[i] = char;
                    /*
                    ha talált egyezést, akkor felülírjuk a guessed tömbben azt elemet, ahol egyezés történt a betűnkkel amit megadtunk(char)
                    !!!!! ezt azért tudjuk megtenni, mert ugyanannyi a guessed elemszáma, mint ahány karaktere van a word-ünknek 
                    mondjuk az alma szó kitalálandó, beírjuk az a-betűt, első egyezés is a char egyenlő lesz a nulladik elemével 
                    a this.word[i]-nek, így a guessed tömb nulladik elemét is felülírjuk arra, hogy char utána az l-m nem jók és 
                    utána jön a harmadik indexű karakter (a), amit szintén felülírunk az a-val

                    pár dolgot csináltunk html-ben, hogy lesz majd a kíirás -> html-magyarazat.ts
                    */
                    }
               }

               this.ShowGuessedCharacters();
            }
           
        });
    }
}


const hm = new Hangman();
/*
Amikor elkészítjük a példányt abban a pillanatban a generateWord(), ami meg van hívva constructorában,
generál nekünk egy szót véletlenszerűen a words tömbből és majd ezt kell majd kitalálnunk 
*/
