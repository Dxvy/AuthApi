document.addEventListener('DOMContentLoaded', function () {
    var form = document.querySelector('.login form');
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Empêche l'envoi du formulaire par défaut

        var username = form.querySelector('input[name="u"]').value;
        var password = form.querySelector('input[name="p"]').value;

        // Ici, vous pouvez ajouter votre logique pour envoyer les données de connexion à votre serveur, par exemple en utilisant fetch() ou XMLHttpRequest.

        // Exemple de requête fetch pour envoyer les données à un serveur
        fetch('/Api/uti.json', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Erreur de réseau');
                }
            })
            .then(function (data) {
                // Vérifier si l'ID de l'utilisateur est présent dans notre json
                const user = data.find(user =>
                    user.username === username && user.password === password
                );
                if (user) {
                    const token = createJWT(user);
                    localStorage.setItem('jwt', token);
                    // Redirection vers la page "index.html"
                    const login = document.querySelector('.login');
                    login.style.display = 'none';
                    const post = document.querySelector('.post-container');
                    post.style.display = 'flex';
                    // console.log(user.username)
                    if (user.username === "admin") {
                        // Afficher toutes les balises <div class="post" id="456"></div>, <div class="post" id="654"></div> et <div class="post" id="555"></div> pour l'utilisateur avec l'ID 777
                        console.log('admin');
                        const post456 = document.querySelector('.post456');
                        post456.style.display = 'flex';
                        const post654 = document.querySelector('.post654');
                        post654.style.display = 'flex';
                        const post555 = document.querySelector('.post555');
                        post555.style.display = 'flex';

                    } else if (user.username === "bob") {
                        // Afficher uniquement la balise <div class="post" id="456"></div> pour l'utilisateur avec l'ID 123
                        console.log('bob');
                        const post456 = document.querySelector('.post456');
                        post456.style.display = 'flex';
                        const post654 = document.querySelector('.post654');
                        post654.style.display = 'none';
                        const post555 = document.querySelector('.post555');
                        post555.style.display = 'none';


                    } else if (user.username === "alice") {
                        // Afficher uniquement la balise <div class="post" id="654"></div> pour l'utilisateur avec l'ID 321
                        console.log('alice');
                        const post456 = document.querySelector('.post456');
                        post456.style.display = 'none';
                        const post654 = document.querySelector('.post654');
                        post654.style.display = 'flex';
                        const post555 = document.querySelector('.post555');
                        post555.style.display = 'none';
                    } else {
                        // Gérer le cas où les informations de connexion sont incorrectes
                        alert('Nom d\'utilisateur ou mot de passe incorrect');
                    }
                }
            })

            .catch(function (error) {
                // Gérer les erreurs de connexion
            });
    });
    var logout = document.querySelector('.logout');
    logout.addEventListener('click', function (event) {
        event.preventDefault(); // Empêche l'envoi du formulaire par défaut
        const login = document.querySelector('.login');
        login.style.display = 'block';
        const post = document.querySelector('.post-container');
        post.style.display = 'none';
    });
});

function createJWT(user) {
    const payload = {
        id: user.id,
        username: user.username,
        role : user.role,
    };
    const token = jwt.sign(payload, 'j8R#4qX$Z!L2%jP&5sTn@9sF7mG3dA', { expiresIn: '1d' }); // '1d' représente une durée d'un jour

    return token;
}