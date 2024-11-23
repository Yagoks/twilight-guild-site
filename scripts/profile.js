document.addEventListener("DOMContentLoaded", function () {
    // Carregar as informações salvas no localStorage
    document.getElementById("profileNome").textContent = localStorage.getItem("nome") || "Não informado";
    document.getElementById("profileClasse").textContent = localStorage.getItem("classe") || "Não informado";
    document.getElementById("profileNivel").textContent = localStorage.getItem("nivel") || "Não informado";
    document.getElementById("profileTitulo").textContent = localStorage.getItem("titulo") || "Não informado";
    document.getElementById("profileDataNascimento").textContent = localStorage.getItem("dataNascimento") || "Não informado";
    document.getElementById("profileGenero").textContent = localStorage.getItem("genero") || "Não informado";
    document.getElementById("profileRaca").textContent = localStorage.getItem("raca") || "Não informado";
    document.getElementById("profileXP").textContent = localStorage.getItem("userXP") || "0"; // Default XP: 0
    document.getElementById("profileGold").textContent = localStorage.getItem("userGold") || "0"; // Default GOLD: 0
    document.getElementById("profileRank").textContent = localStorage.getItem("userRank") || "Não informado";

    // Carregar e exibir a imagem de perfil
    const profileImage = localStorage.getItem("imagemPerfil");
    if (profileImage) {
        document.getElementById("profileImage").src = profileImage;
    } else {
        document.getElementById("profileImage").src = "default-avatar.jpg"; // Imagem padrão se nenhuma foi enviada
    }
});