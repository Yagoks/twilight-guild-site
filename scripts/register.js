document.getElementById("registrationForm").addEventListener("submit", function (event) {
    event.preventDefault();

    // Captura e armazena as informações do formulário
    localStorage.setItem("nome", document.getElementById("nome").value);
    localStorage.setItem("classe", document.getElementById("classe").value);
    localStorage.setItem("nivel", document.getElementById("nivel").value);
    localStorage.setItem("titulo", document.getElementById("titulo").value);
    localStorage.setItem("dataNascimento", document.getElementById("data-nascimento").value);
    localStorage.setItem("genero", document.getElementById("genero").value);
    localStorage.setItem("raca", document.getElementById("raca").value);

    // Valores iniciais de XP, GOLD e Rank
    localStorage.setItem("userXP", 0); // XP inicial
    localStorage.setItem("userGold", 100); // GOLD inicial
    localStorage.setItem("userRank", "D"); // Rank inicial

    // Processa a imagem e a converte para base64
    const fileInput = document.getElementById("anexo");
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            localStorage.setItem("imagemPerfil", e.target.result);
            window.location.href = "profile.html"; // Redireciona após salvar a imagem
        };
        reader.readAsDataURL(file);
    } else {
        window.location.href = "profile.html"; // Redireciona se não houver imagem
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const profileIcon = document.getElementById("profileIcon");
    const profilePopup = document.getElementById("profilePopup");

    // Carregar imagem de perfil salva pelo usuário
    const savedProfileImage = localStorage.getItem("imagemPerfil");
    if (savedProfileImage) {
        profileIcon.src = savedProfileImage; // Substitui o ícone padrão pela imagem do usuário
    }

    // Alternar visibilidade da janela de informações ao clicar no ícone
    profileIcon.addEventListener("click", function () {
        profilePopup.style.display = profilePopup.style.display === "none" || !profilePopup.style.display ? "block" : "none";
    });

    // Ocultar a janela de informações ao clicar fora dela
    document.addEventListener("click", function (event) {
        if (!profileIcon.contains(event.target) && !profilePopup.contains(event.target)) {
            profilePopup.style.display = "none";
        }
    });
});
