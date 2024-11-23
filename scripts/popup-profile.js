document.addEventListener("DOMContentLoaded", function () {
    const profileIcon = document.getElementById("profileIcon");
    const profilePopup = document.getElementById("profilePopup");
    const goldDisplay = document.getElementById("profilePopupGold");
    const xpDisplay = document.getElementById("profilePopupXP");

    // Carregar imagem de perfil salva pelo usuário
    const savedProfileImage = localStorage.getItem("imagemPerfil");
    if (savedProfileImage) {
        profileIcon.src = savedProfileImage; // Substitui o ícone padrão pela imagem do usuário
    }

    // Atualizar GOLD e XP no popup
    function updatePopupStats() {
        const userGold = localStorage.getItem("userGold") || 0;
        const userXP = localStorage.getItem("userXP") || 0;
        goldDisplay.textContent = `GOLD: ${userGold}`;
        xpDisplay.textContent = `XP: ${userXP}`;
    }

    // Alternar visibilidade da janela de informações ao clicar no ícone
    profileIcon.addEventListener("click", function () {
        profilePopup.style.display = profilePopup.style.display === "none" || !profilePopup.style.display ? "block" : "none";
        updatePopupStats(); // Atualiza os valores toda vez que o popup é exibido
    });

    // Ocultar a janela de informações ao clicar fora dela
    document.addEventListener("click", function (event) {
        if (!profileIcon.contains(event.target) && !profilePopup.contains(event.target)) {
            profilePopup.style.display = "none";
        }
    });

    // Atualizar os valores ao carregar a página
    updatePopupStats();
});
