document.addEventListener("DOMContentLoaded", function () {
    const questList = document.getElementById("questList");
    const questPopup = document.getElementById("questPopup");
    const questTitle = document.getElementById("questTitle");
    const questRank = document.getElementById("questRank");
    const questReward = document.getElementById("questReward");
    const questXP = document.getElementById("questXP");
    const questDescription = document.getElementById("questDescription");
    const acceptQuestBtn = document.getElementById("acceptQuestBtn");
    const closePopupBtn = document.getElementById("closePopupBtn");

    const userRank = localStorage.getItem("userRank");
    const userGold = parseInt(localStorage.getItem("userGold")) || 0;
    const userXP = parseInt(localStorage.getItem("userXP")) || 0;

    if (!userRank) {
        alert("Por favor, complete o nivelamento primeiro para obter um rank!");
        window.location.href = "nivelamento.html";
        return;
    }

    const rankHierarchy = ["D", "C", "B", "A", "S"];

    // Quests fixas
    const quests = [
        {
            id: 1,
            title: "Derrotar a Bruxa da Heresia",
            rank: "S",
            goldReward: 100000,
            xpReward: 1000000
        },
        {
            id: 2,
            title: "Derrotar o Polvo Negro",
            rank: "A",
            goldReward: 50000,
            xpReward: 500000
        },
        {
            id: 3,
            title: "Escoltar uma carruagem até Molvania",
            rank: "B",
            goldReward: 2500,
            xpReward: 8000
        },
        {
            id: 4,
            title: "Salvar um grupo de crianças de lobos",
            rank: "C",
            goldReward: 500,
            xpReward: 600
        },
        {
            id: 5,
            title: "Colher 5 Weaveshrooms",
            rank: "D",
            goldReward: 20,
            xpReward: 100
        }
    ];

    // Verificar se a quest foi completada
    function isQuestCompleted(questId) {
        const completedQuests = JSON.parse(localStorage.getItem("completedQuests")) || [];
        return completedQuests.includes(questId);
    }

    // Marcar quest como completada
    function completeQuest(questId) {
        const completedQuests = JSON.parse(localStorage.getItem("completedQuests")) || [];
        completedQuests.push(questId);
        localStorage.setItem("completedQuests", JSON.stringify(completedQuests));
    }

    // Gerar os cartões das quests
    function generateQuests() {
        quests.forEach((quest) => {
            const questCard = document.createElement("div");
            questCard.classList.add("quest-card");

            if (isQuestCompleted(quest.id)) {
                questCard.classList.add("inactive");
            }

            questCard.innerHTML = `
                <h4>${quest.title}</h4>
                <p><strong>Rank:</strong> ${quest.rank}</p>
                <p><strong>Gold:</strong> ${quest.goldReward}</p>
                <p><strong>XP:</strong> ${quest.xpReward}</p>
            `;

            questCard.addEventListener("click", function () {
                if (isQuestCompleted(quest.id)) {
                    alert("Você já completou esta missão!");
                    return;
                }

                questTitle.textContent = quest.title;
                questRank.textContent = quest.rank;
                questReward.textContent = quest.goldReward;
                questXP.textContent = quest.xpReward;
                questDescription.textContent = `Esta é a missão "${quest.title}". Complete-a para receber sua recompensa!`;
                acceptQuestBtn.dataset.questId = quest.id;
                acceptQuestBtn.dataset.goldReward = quest.goldReward;
                acceptQuestBtn.dataset.xpReward = quest.xpReward;
                acceptQuestBtn.dataset.questRank = quest.rank;
                openPopup();
            });

            questList.appendChild(questCard);
        });
    }

    // Abrir o popup da quest
    function openPopup() {
        questPopup.classList.add("show");
    }

    // Fechar o popup
    closePopupBtn.addEventListener("click", function () {
        questPopup.classList.remove("show");
    });

    // Aceitar a quest
    acceptQuestBtn.addEventListener("click", function () {
        const questRankValue = this.dataset.questRank;
        const goldReward = parseInt(this.dataset.goldReward);
        const xpReward = parseInt(this.dataset.xpReward);
        const questId = parseInt(this.dataset.questId);

        const userRankIndex = rankHierarchy.indexOf(userRank);
        const questRankIndex = rankHierarchy.indexOf(questRankValue);

        if (questRankIndex > userRankIndex) {
            alert("Você não pode completar esta missão. Seu rank não é compatível.");
            return;
        }

        completeQuest(questId);

        // Atualizar Gold e XP
        const newGold = userGold + goldReward;
        const newXP = userXP + xpReward;
        localStorage.setItem("userGold", newGold);
        localStorage.setItem("userXP", newXP);

        alert(`Parabéns! Você completou a missão "${questTitle.textContent}". Recompensas: ${goldReward} GOLD e ${xpReward} XP.`);

        // Fechar popup e recarregar quests
        questPopup.classList.remove("show");
        questList.innerHTML = "";
        generateQuests();
    });

    generateQuests();
});
