/* =========================================
   SISTEMA DE LIKE E DISLIKE
   Tecnologia no Mar
========================================= */


/*
    Seleciona todos os cards de posts
*/
const posts = document.querySelectorAll(".post-card");


/*
    Para cada post encontrado na página,
    configuramos os botões de Like e Dislike.
*/
posts.forEach((post) => {

    // Identificador único do post
    const postId = post.dataset.postId;

    // Busca os botões
    const likeButton = post.querySelector(".like-button");
    const dislikeButton = post.querySelector(".dislike-button");

    // Busca os elementos que mostram os números
    const likeCount = post.querySelector(".like-count");
    const dislikeCount = post.querySelector(".dislike-count");


    /*
        Cria as chaves usadas no localStorage.

        Exemplo:
        tecnologiaNoMar_post1_likes
        tecnologiaNoMar_post1_dislikes
        tecnologiaNoMar_post1_userVote
    */

    const likesKey = `tecnologiaNoMar_${postId}_likes`;
    const dislikesKey = `tecnologiaNoMar_${postId}_dislikes`;
    const userVoteKey = `tecnologiaNoMar_${postId}_userVote`;


    /*
        Recupera os valores salvos anteriormente.

        Se não existir nenhum valor,
        começa com zero.
    */

    let likes = Number(localStorage.getItem(likesKey)) || 0;
    let dislikes = Number(localStorage.getItem(dislikesKey)) || 0;

    let userVote = localStorage.getItem(userVoteKey);


    /*
        Atualiza visualmente os números
        de Like e Dislike.
    */

    function updateCounters() {

        likeCount.textContent = likes;
        dislikeCount.textContent = dislikes;

    }


    /*
        Atualiza qual botão está selecionado.
    */

    function updateActiveButton() {

        likeButton.classList.remove("active");
        dislikeButton.classList.remove("active");


        if (userVote === "like") {

            likeButton.classList.add("active");

        } else if (userVote === "dislike") {

            dislikeButton.classList.add("active");

        }

    }


    /*
        Salva os dados no navegador.
    */

    function saveData() {

        localStorage.setItem(likesKey, likes);
        localStorage.setItem(dislikesKey, dislikes);

        if (userVote) {

            localStorage.setItem(userVoteKey, userVote);

        } else {

            localStorage.removeItem(userVoteKey);

        }

    }


    /*
        Quando o usuário clica em Like.
    */

    likeButton.addEventListener("click", () => {

        /*
            Se já deu Like,
            clicar novamente remove o Like.
        */

        if (userVote === "like") {

            likes--;

            userVote = null;

        }

        /*
            Se tinha dado Dislike,
            remove o Dislike e adiciona Like.
        */

        else {

            if (userVote === "dislike") {

                dislikes--;

            }

            likes++;

            userVote = "like";

        }


        // Salva e atualiza a interface
        saveData();

        updateCounters();

        updateActiveButton();

    });


    /*
        Quando o usuário clica em Dislike.
    */

    dislikeButton.addEventListener("click", () => {

        /*
            Se já deu Dislike,
            clicar novamente remove o Dislike.
        */

        if (userVote === "dislike") {

            dislikes--;

            userVote = null;

        }

        /*
            Se tinha dado Like,
            remove o Like e adiciona Dislike.
        */

        else {

            if (userVote === "like") {

                likes--;

            }

            dislikes++;

            userVote = "dislike";

        }


        // Salva e atualiza a interface
        saveData();

        updateCounters();

        updateActiveButton();

    });


    /*
        Inicializa o post com os dados
        armazenados no navegador.
    */

    updateCounters();

    updateActiveButton();

});