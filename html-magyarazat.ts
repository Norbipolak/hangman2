/*  <h3>Helyes karakterek</h3>
    <div class="white-box flex" id="guessed-div">
            <div class="guessed-char">a</div>
            <div class="guessed-char"></div>
            <div class="guessed-char"></div>
            <div class="guessed-char">a</div>
    </div>

megkapta a flex osztályt a class="white-box"div, amiben el vannak helyezve 
a többi class="guessed-char"div-ek

ezeknek a formázása a css-ben -> 
.flex {
    display: flex;
    justify-content: center;
}
.guessed-char {
    padding: 5px;
    border-bottom: 1px solid grey; alapból adunk neki egy aláhuzást
    margin: 5px;
    min-width: 20px; mert ahol van betű, ott szélesebb lesz a border bottom aláhuzás
}
*/
/*
ezzel azt csináltuk, hogy a white-box-ban amit a css-ben már előbb formáztunk beleraktunk (guessed-char)-os div-eket 
amik egymás mellett fognak elhelyezkedni középen, ugye a szűlőelem .flex beállításai miatt és ezek a div-ek még fontos, hogy 
kapnak egy border-bottom-ot is, hiszen, hiszen azt szeretnénk, hogy így nézzenek ki -> _ _ _ _

amit a guessed-div-be beleírtuk (a az első és negyediknél),  a     a    így néz ki, amit kitaláltunk az felül van írva, amit nem az üres
                                                             _ _ _ _
*/

