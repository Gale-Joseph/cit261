
class Hero{
    constructor(name,hitpoints){
        this.heroname = name;
        this.hitpoints = hitpoints;
        this.defense=5;
        this.speed=2;
    }
    attack(){
        return "Your hero attacks";     
    }
}

class SuperHero extends Hero{
    constructor(name,hitpoints,ability){
        super(name,hitpoints);
        this.ability=ability;
        this.speed=100;

    }
    useAbility(){
        return "Your hero is " + this.ability;
    }
}
 
function createHero() {
    myHero = new Hero("Olgath",10);
    document.getElementById("createHeroDiv").innerHTML="Congratulations. A hero" +
    " is born. When you pressed the button, the 'Hero' class was called and an"+
    " object was instantiated under the variable name 'myHero'." + "<br>" + "The syntax looks" +
    "like this: myHero = new Hero('Olgath')";
}

function seeHeroName() {
    myHero = new Hero("Olgath",10);
    document.getElementById("seeHeroNameDiv").innerHTML="Using a method " +
    "with the following syntax gives us the name: myHero.heroname: " + 
    myHero.heroname + "<br>" + 
    "Our hero has "
    
    ;
}

function seeHeroProperties() {
    myHero = new Hero("Olgath",10);
    document.getElementById("seeHeroPropertiesDiv").innerHTML=
    "myHero.defense = " + myHero.defense + "<br>" + 
    "myHero.speed = " + myHero.speed + "<br>" + 
    "myHero.hitpoints = " + myHero.hitpoints + "<br>";

}
function seeHeroMethod() {
    myHero = new Hero("Olgath",10);
    document.getElementById("seeHeroMethodDiv").innerHTML=
    "myHero.attack() = " + myHero.attack();
}
function seeHeroInheritance() {
    mySuperHero=new SuperHero("Olgath",100,"flying");
    document.getElementById("seeHeroInheritanceDiv").innerHTML=
    "You have chosen wisely. Your hero has become a super hero "
         + "through class inheritance." + "<br>" + 
    
    "<block><code>class SuperHero extends Hero{" + "<br>" + 
        "constructor(name,hitpoints,ability){" + "<br>" + 
            "super(name,hitpoints);" + "<br>" + 
            "this.ability=ability;" + "<br>" + 
            "this.speed=100;" + "<br>" + 
    
       "}" + "<br>" + 
        "useAbility(){" + "<br>" + 
            "return 'Your hero is ' + ability;" + "<br>" + 
        "}" + "<br>" + 
    "}</code></block>" + "<br>"+
    "To create a class, use the 'extends' keyword. The constructor" + "<br>" + 
    "in this code creates the subclass with necessary parameters, " + "<br>" + 
    "while the super() calls the constructor of the parent class, " + "<br>" +   
    "in this case, the Hero class. Thus the SuperHero objects will " + "<br>" + 
    "inherit all Hero properties and methods with an extra 'ability' method." + "<br>" +         
    "<code>mySuperHero=new SuperHero('Olgath',100,'flying')</code>;"
}

function seeSuperHero() {
    mySuperHero=new SuperHero("Olgath",100,"flying");
    mySuperHero.defense=100;
    document.getElementById("seeSuperHeroDiv").innerHTML=
    "mySuperHero.defense = " + mySuperHero.defense + "<br>" + 
    "mySuperHero.speed = " + mySuperHero.speed + "<br>" + 
    "mySuperHero.hitpoints = " + mySuperHero.hitpoints + "<br>" +
    "mySuperHero.attack() = " + mySuperHero.attack() + "<br>" +
    "mySuperHero.useAbility() = " + mySuperHero.useAbility() + "<br>" + 
    "<br>*Notice that this super hero object has all the properties and " +
    "methods of the hero class. Notice that all properties were upgraded to fit " +
    "those of super hero. 'Speed' was upgraded during the class construction, " +
    " while we adjusted defense using this syntax: 'mySuperHero.defense=100;'"
    ;



}