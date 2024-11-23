document.addEventListener("DOMContentLoaded", function () {
    const loadingStage = document.getElementById("loadingStage");
    const finalStage = document.getElementById("finalStage");
    const loadingText = document.getElementById("loadingText");
    const loadingImage = document.getElementById("loadingImage");
    const finalText = document.getElementById("finalText");
    const finalImage = document.getElementById("finalImage");
    const toQuestsBtn = document.getElementById("toQuestsBtn");

    // Verificar se o usuário está cadastrado
    const userLevel = parseInt(localStorage.getItem("nivel"));
    const userName = localStorage.getItem("nome");

    if (!userName || !userLevel) {
        alert("Por favor, cadastre-se primeiro para acessar o nivelamento!");
        window.location.href = "register.html"; // Redireciona para a página de inscrição
        return;
    }

    // Função para calcular o rank com base no nível
    function calculateRank(level) {
        if (level >= 1 && level <= 3) return { rank: "D", image: "img/D-rank.jpg" };
        if (level >= 4 && level <= 8) return { rank: "C", image: "img/C-rank.jpg" };
        if (level >= 9 && level <= 13) return { rank: "B", image: "img/B-rank.jpg" };
        if (level >= 14 && level <= 19) return { rank: "A", image: "img/A-rank.jpg" };
        if (level === 20) return { rank: "S", image: "img/S-rank.jpg" };
        return { rank: "Desconhecido", image: "img/default-loading.jpg" };
    }

    // Função para iniciar o nivelamento com estágios de carregamento
    function startNivelamento() {
        let stage = 1;

        const interval = setInterval(() => {
            if (stage === 1) {
                loadingText.textContent = "Calculando...";
                loadingImage.src = "img/loading1.jpg";
            } else if (stage === 2) {
                loadingText.textContent = "Ainda Calculando...";
                loadingImage.src = "img/loading2.jpg";
            } else if (stage === 3) {
                loadingText.textContent = "Quase lá...";
                loadingImage.src = "img/loading3.jpg";
            } else {
                clearInterval(interval); // Finaliza o intervalo

                // Exibir resultado final
                const rankResult = calculateRank(userLevel);
                loadingStage.classList.add("hidden");
                finalStage.classList.remove("hidden");
                finalText.textContent = `Parabéns, seu Rank é: ${rankResult.rank}`;
                finalImage.src = rankResult.image;
                localStorage.setItem("userRank", rankResult.rank); // Salva o rank no localStorage
            }
            stage++;
        }, 3000); // Cada estágio dura 3 segundos (exceto o final que dura 5 segundos somados)
    }

    // Redirecionar para a página de quests
    toQuestsBtn.addEventListener("click", function () {
        window.location.href = "quests.html";
    });

    // Iniciar o nivelamento automaticamente
    startNivelamento();
});
