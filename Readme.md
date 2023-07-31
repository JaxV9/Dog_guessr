# Bienvenue dans Dog guesser !

## Pour exécuter le backend

1. Dans le terminal à partir du répertoire courant
allez dans le répertoire "/backend" avec la commande `cd backend`

2. Installez les dépendances avec la commande `npm install`

3. Lancez le serveur avec la commande `nodemon`

## Pour exécuter le frontend

1. Dans le terminal à partir du répertoire courant allez dans le répertoire "/dog_guesser" avec la commande `cd dog_guesser`

2. Installez les dépendances avec la commande `npm install`

3. Lancez le serveur avec la commande `npm start`

4. Attention j'ai rencontré quelques soucis avec la version de node, nottament avec l'erreur "error: error:0308010c:digital envelope routines::unsupported vue". Si vous rencontrez ce problème, je vous renvoie vers ce lien "https://www.journaldunet.fr/web-tech/developpement/1516293-react-comment-corriger-l-erreur-error-0308010c-digital-envelope-routines-unsupported/". Il vous suffit de suivre les instructions et de relancer le serveur avec la commande `npm start`. J'ai réussi à corriger l'erreur en suivant ces instructions et en changeant cette ligne dans le fichier package.json de dog_guesser :
    "start": "react-scripts --openssl-legacy-provider start",


## Maintenant vous pouvez jouer !
