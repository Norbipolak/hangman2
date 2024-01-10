class Hangman {
    guessInput;
    guessBtn;
    guessedDiv;
    errorsDiv;
    errorNumbers;
    errors;
    guessed;
    words;
    word;
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
    }
    generateWord() {
        //ez annyit csinál, hogy a words-ből véletlenszerűen választunk 
        this.word = this.words[Math.floor(Math.random() * this.words.length)];
        console.log(this.word); //kiírja mindig az aktuális szavunkat, pl. alma utána ujratöltünk zsemle stb.
    }
    /*
    Ha megnyomjuk a gombot, akkor össze kell hasonlítani a this.word-ot a betűvel, amit beírtunk
    az input mezőbe, hogy tartalmazza-e a this.word
    */
    Guess() {
        this.guessBtn?.addEventListener("click"(), {
            //egy változóban egyenlővé tesszük a betűt, amit beírtunk az input mezőbe 
            const: char, string
        } | never, this.guessInput.value);
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
        if (char !== undefined)
            return; //ha a char undefined, akkor egyszerűen csak return, ugy sem tudunk vele mit kezdeni 
        if (!this.word.includes(char)) {
            //ha nincs benne a betű, akkor az errors tömbbe belerakosgatni, azokat a karaktereket amelyek nem jók 
            this.errors.push(char);
        }
        else {
            /*
            ha benne van a karakter akkor lesz érdekes, mert pl. a zongora szóban az o betű kétszer szerepel
            és nekünk tudnunk kell, hogy hányadik helyen szerepel ez a két karakter -> _ o _ _ o _ _
            A legelején, amikor a szót legeneráltuk, akkor
            */
        }
        /*
        !!!!!!Megnéztük, hogy a kitalálandó szóban van-e olyan karakter, amit beírtunk
        */
    }
    ;
}
const hm = new Hangman();
/*
Amikor elkészítjük a példányt abban a pillanatban a generateWord(), ami meg van hívva constructorában,
generál nekünk egy szót véletlenszerűen a words tömbből és majd ezt kell majd kitalálnunk
*/
// this.guessBtn?.addEventListener("click", () => {
//     /*
//     a kérdőjel annyit tesz a guessBtn után, hogyha null, akkor nem fog hibát adni 
//     ha viszont nem írjuk oda a kérdőjelt, akkor alá fogja húzni, mert lehet null is és abból nem tudunk eventListenert meghatározni
//     ha ott van a kérdőjel akkor, amennyiben null, nem próbálja meg az eventListener metódust meghívni
//     */
// });
