window.onload = function () {

    //DECLARATION DES VARIABLES
    var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h','i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's','t', 'u', 'v', 'w', 'x', 'y', 'z'];

    var categories;         // Categories
    var choixCat;           // Categorie choisie
    var mot;                // Mot Selectionné
    var réponse;            // Mot à deviner sous forme de _ (pour l'afffichage)
    var tentées = [];       // Storage des tentatives précedentes
    var essais;             // Nb d'essais restants
    var compte;             // Nb d'essais corrects
    var espace;             // Permettra de remplacer les caractères qui ne sont pas des lettres

    //OBTENTENIR LES ELEMENTS DE LA PAGE
    var showVies = document.getElementById("mesVies");
    var getIndice = document.getElementById("hint");
    var showIndice = document.getElementById("clue");



    // AFFICHE LES LETTRES ET LES BOUTONS CORRESPONDANTS
    var boutons = function () {
        mesBoutons = document.getElementById('boutons');
        lettres = document.createElement('ul');

        for (var i = 0; i < alphabet.length; i++) {
            lettres.id = 'alphabet';
            list = document.createElement('li');
            list.id = 'letter';
            list.innerHTML = alphabet[i];
            check();
            mesBoutons.appendChild(lettres);
            lettres.appendChild(list);
        }
    }


    // AFFICHE LA CATEGORIE
    var selectCat = function () {
        if (choixCat === categories[0]) {
            categorieNom.innerHTML = "Catégorie : Animaux";
        } else if (choixCat === categories[1]) {
            categorieNom.innerHTML = "Catégorie : Pays";
        } else if (choixCat === categories[2]) {
            categorieNom.innerHTML = "Catégorie : Villes de France";
        }
        else if (choixCat === categories[3]) {
            categorieNom.innerHTML = "Catégorie : Métiers";
        }
        else if (choixCat === categories[4]) {
            categorieNom.innerHTML = "Catégorie : Véhicules";
        }
        else if (choixCat === categories[5]) {
            categorieNom.innerHTML = "Catégorie : Science-Fiction";
        }
    }

    // Affiche le mot a deviner
    result = function () {
        wordHolder = document.getElementById('hold');
        correct = document.createElement('ul');


        for (var i = 0; i < mot.length; i++) {
            correct.setAttribute('id', 'monmot');
            réponse = document.createElement('li');
            réponse.setAttribute('class', 'réponse');
            if (mot[i] === "-") {//AFFICHE LES TIRETS SANS LES REMPLACER PAR DES TIRETS BAS
                réponse.innerHTML = "-";
                espace = 1;
            } else {//AFFICHE LES TIRETS BAS
                réponse.innerHTML = "_";
            }

            tentées.push(réponse);
            wordHolder.appendChild(correct);
            correct.appendChild(réponse);
        }
    }

    // Montre le nombre de vies restantes et la victoire/défaite
    comments = function () {
        showVies.innerHTML = "Vous avez " + essais + " essais";
        if (essais < 1) {
            showVies.innerHTML = "Perdu";
        }
        for (var i = 0; i < tentées.length; i++) {
            if (compte + espace === tentées.length) {
                showVies.innerHTML = "Félicitations!";
            }
        }
    }

    // dessine le pendu
    var animate = function () {
        var drawMe = essais;
        drawArray[drawMe]();
    }


    // CODE QUI PERMET DE DESSINER LE PENDU
    canvas = function () {

        myStickman = document.getElementById("stickman");
        context = myStickman.getContext('2d');
        context.beginPath();
        context.strokeStyle = "#0000ff";
        context.lineWidth = 4;
    };

    head = function () {
        myStickman = document.getElementById("stickman");
        context = myStickman.getContext('2d');
        context.beginPath();
        context.arc(60, 25, 10, 0, Math.PI * 2, true);
        context.stroke();
    }

    draw = function ($pathFromx, $pathFromy, $pathTox, $pathToy) {

        context.moveTo($pathFromx, $pathFromy);
        context.lineTo($pathTox, $pathToy);
        context.stroke();
    }

    frame1 = function () {
        draw(0, 150, 150, 150);
    };

    frame2 = function () {
        draw(10, 0, 10, 600);
    };

    frame3 = function () {
        draw(0, 5, 70, 5);
    };

    frame4 = function () {
        draw(60, 5, 60, 15);
    };

    torso = function () {
        draw(60, 36, 60, 70);
    };

    rightArm = function () {
        draw(60, 46, 100, 50);
    };

    leftArm = function () {
        draw(60, 46, 20, 50);
    };

    rightLeg = function () {
        draw(60, 70, 100, 100);
    };

    leftLeg = function () {
        draw(60, 70, 20, 100);
    };

    drawArray = [rightLeg, leftLeg, rightArm, leftArm, torso, head, frame4, frame3, frame2, frame1];


    // OnClick Function
    check = function () {
        list.onclick = function () {
            var entree = (this.innerHTML);
            this.setAttribute("class", "active");
            this.onclick = null;
            this.body.style.Color = 'blue'
            for (var i = 0; i < mot.length; i++) {//VERIFIE SI LA LETTRE ENTREE EST DANS LE MOT
                if (mot[i] === entree) {
                    tentées[i].innerHTML = entree;//remplace dans l'affichage par la bonne lettre
                    compte += 1;
                }
            }
            var j = (mot.indexOf(entree));
            if (j === -1) {
                essais -= 1;
                comments();//APPELLE LA FONCTION DE LA MODIFCATION DU COMMENTAIRE
                animate();//APPELLE LA FONCTION POUR DESSINER UN TRAIT DU PENDU
            } else {
                comments();
            }
        }
    }


    // INITIALISE LA PARTIE
    play = function () {
       
        categories = [ //Liste de mots à choisir (triés par catégories)
            ["singe", "girafe", "canard", "chien", "zebre", "lezard", "yak","cheval","vache","poisson-rouge","lapin","lion"],//animaux
            ["royaume-uni", "chine", "perou", "mozambique", "nouvelle-zelande","vatican","france","egypte","australie"],//pays
            ["sartene", "grenoble", "nice", "seyssinet-pariset", "paris"],//villes
            ["pompier", "cartographe", "marin", "eboueur", "camionneur","cuisinier","fermier"],//metiers
            ["avion","voiture","bateau","train","bus"],//vehicules
            ["ovni","extra-terrestre","laser","clones","robot","asteroide","vaisseau-spatial"]//S-F
        ];

        //choisit un mot au hasard
        choixCat = categories[Math.floor(Math.random() * categories.length)];
        mot = choixCat[Math.floor(Math.random() * choixCat.length)];

        mot = mot.replace(/\s/g, "-");//remplace tout ce qui n'est pas une lettre par un tiret
        console.log(mot);
        boutons();
        //appelle les fonctions et initialise les variables
        tentées= [];
        essais = 10;
        compte = 0;
        espace = 0;
        result();
        comments();
        selectCat();
        canvas();
    }

    play();

    // CODE DES INDICES

    hint.onclick = function () {

        indices = [//TABLE DES INDICES (1 par mot)
            ["Ancetre lointain de l'Homme", "Très long cou", "Le villain petit", "Meilleur ami", "Code barre", "Reptile", "Vache tibétaine","Monture","Donne du lait","Mémoire courte","Sa patte porte bonheur","roi de la savanne"],
            ["Outre-manche", "Pays le plus peuplé", "Pays des Incas", "Pays d'Afrique", "L'Australie en pas pareil","Pays du pape","Hexagone","Pays des pharaons","La Nouvelle-Zelande en pas pareil"],
            ["Ville corse", "Ville dans le 38", "Sympa en anglais", "lycée Aristide Bergès", "Capitale"],
            ["Volontaire du contre feu", "Dessine le monde", "Part souvent en croisière", "Transporte les poubelles", "Conduit sur l'autoroute","Prépare des bons petits plats","Comme le poulet"],
            ["Vehicule aerien","Sur les routes","Permet de traverser les oceans","Sur un rail","Transport en commun"],
            ["Objet inconnu","Alien","Rayon de lumiere concentée","Doppelgangers","Être artificiel","Gros caillou de l'espace","Pour aller dans l'espace"]
        ];

        var indexCat = categories.indexOf(choixCat);
        var indexIndice = choixCat.indexOf(mot);
        showIndice.innerHTML = "Indice - " + indices[indexCat][indexIndice];
    };

    //Réinitialisation
    document.getElementById('reset').onclick = function () {
        correct.parentNode.removeChild(correct);
        lettres.parentNode.removeChild(lettres);
        showIndice.innerHTML = "Indice - "//retire l'indice
        context.clearRect(0, 0, 400, 400);//vide le canvas
        play();
    }
}


