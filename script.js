const moodButtons = document.querySelectorAll(".moods button");

moodButtons.forEach(button => {

    button.addEventListener("click", () => {
        button.classList.toggle("selected");
    });

});

const recommendations = [
    {
        moods: ["ENGRAÇADO", "LEVE"],
        title: "O Grande Hotel Budapeste",
        genres: "Comédia · Drama · Aventura",
        description: "Uma história divertida, visualmente marcante e cheia de personagens excêntricos."
    },

    {
        moods: ["TENSO", "SOMBRIO"],
        title: "Garota Exemplar",
        genres: "Mistério · Suspense · Drama",
        description: "Um suspense cheio de reviravoltas para quem quer uma história que prende até o fim."
    },

    {
        moods: ["ESTRANHO", "PRA PENSAR"],
        title: "Brilho Eterno de uma Mente sem Lembranças",
        genres: "Drama · Romance · Ficção científica",
        description: "Uma história diferente sobre memória, relacionamentos e aquilo que escolhemos lembrar."
    },

    {
        moods: ["EMOCIONANTE", "ACONCHEGANTE"],
        title: "Pequena Miss Sunshine",
        genres: "Comédia · Drama",
        description: "Uma viagem familiar divertida, estranha e cheia de momentos inesperadamente emocionantes."
    }
];

const discoverButton = document.querySelector(".discover-button");
const discoveryResult = document.querySelector("#discoveryResult");

discoverButton.addEventListener("click", () => {

    const selectedButtons = document.querySelectorAll(".moods button.selected");

    if (selectedButtons.length === 0) {
        alert("Escolha pelo menos uma opção para descobrir uma história.");
        return;
    }

    const selectedMoods = Array.from(selectedButtons)
        .map(button => button.textContent.trim());

    let recommendation = recommendations.find(movie =>
        movie.moods.every(mood => selectedMoods.includes(mood))
    );

    if (!recommendation) {
        recommendation = recommendations[
            Math.floor(Math.random() * recommendations.length)
        ];
    }

    discoveryResult.innerHTML = `
        <p class="section-label">SUA PRÓXIMA HISTÓRIA</p>

        <h3>${recommendation.title}</h3>

        <p class="result-genres">
            ${recommendation.genres}
        </p>

        <p>
            ${recommendation.description}
        </p>

        <button>VER RECOMENDAÇÃO</button>
    `;

    discoveryResult.style.display = "block";

    discoveryResult.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

});

// CATÁLOGO: os títulos ficam cadastrados neste array de objetos.
const catalogItems = [
    { title: "Interestelar", type: "Filme", year: 2014, genre: "Ficção científica", description: "Uma jornada pelo espaço em busca de um novo futuro para a humanidade." },
    { title: "O Grande Hotel Budapeste", type: "Filme", year: 2014, genre: "Comédia", description: "As aventuras excêntricas de um concierge e seu jovem aprendiz." },
    { title: "Garota Exemplar", type: "Filme", year: 2014, genre: "Suspense", description: "O desaparecimento de uma mulher transforma um casamento em mistério." },
    { title: "Pequena Miss Sunshine", type: "Filme", year: 2006, genre: "Drama", description: "Uma família improvável embarca em uma viagem cheia de descobertas." },
    { title: "A Origem", type: "Filme", year: 2010, genre: "Ficção científica", description: "Um especialista em sonhos recebe uma missão quase impossível." },
    { title: "O Show de Truman", type: "Filme", year: 1998, genre: "Drama", description: "Um homem começa a desconfiar que sua vida não é exatamente o que parece." },
    { title: "Ruptura", type: "Série", year: 2022, genre: "Suspense", description: "Funcionários passam por um procedimento que separa suas memórias pessoais e profissionais." },
    { title: "The Office", type: "Série", year: 2005, genre: "Comédia", description: "O cotidiano peculiar dos funcionários de uma empresa de papel." },
    { title: "Dark", type: "Série", year: 2017, genre: "Mistério", description: "O desaparecimento de crianças revela segredos que atravessam gerações." },
    { title: "One Piece", type: "Anime", year: 1999, genre: "Aventura", description: "Luffy e sua tripulação partem em busca do maior tesouro dos mares." },
    { title: "Death Note", type: "Anime", year: 2006, genre: "Suspense", description: "Um estudante encontra um caderno capaz de mudar o destino de qualquer pessoa." },
    { title: "Your Name", type: "Anime", year: 2016, genre: "Romance", description: "Dois jovens passam a trocar de corpos e tentam entender essa conexão." }
];

const catalogGrid = document.querySelector("#catalogGrid");
const catalogSearch = document.querySelector("#catalogSearch");
const typeFilter = document.querySelector("#typeFilter");
const catalogCount = document.querySelector("#catalogCount");
const emptyMessage = document.querySelector("#emptyMessage");

// Recupera os favoritos salvos no navegador.
const FAVORITES_KEY = "entreatos-favorites";
let favoriteTitles = JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]");
const favoritesGrid = document.querySelector("#favoritesGrid");
const favoritesEmpty = document.querySelector("#favoritesEmpty");

// Salva a lista atual no LocalStorage para ela continuar disponível depois.
function saveFavorites() {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favoriteTitles));
}

// Cria os cartões a partir dos dados cadastrados acima.
function createCatalogCards(items) {
    return items.map((item, index) => {
        const isFavorite = favoriteTitles.includes(item.title);
        return `
            <article class="catalog-card">
                <div class="catalog-art art-${index % 6}" aria-hidden="true">
                    <span>${item.type}</span>
                    <strong>${item.title}</strong>
                    <small>${item.year}</small>
                </div>
                <div class="catalog-card-info">
                    <div class="catalog-card-heading">
                        <h3>${item.title}</h3>
                        <span>${item.type}</span>
                    </div>
                    <p class="catalog-meta">${item.year} · ${item.genre}</p>
                    <p>${item.description}</p>
                    <button class="details-button" type="button" data-details-title="${item.title}">VER DETALHES</button>
                    <button class="favorite-button ${isFavorite ? "is-favorite" : ""}"
                        type="button" data-title="${item.title}"
                        aria-pressed="${isFavorite}"
                        aria-label="${isFavorite ? "Remover" : "Adicionar"} ${item.title} ${isFavorite ? "dos" : "aos"} favoritos">
                        ${isFavorite ? "♥ Na minha lista" : "♡ Adicionar à minha lista"}
                    </button>
                </div>
            </article>
        `;
    }).join("");
}

function renderCatalog(items) {
    catalogGrid.innerHTML = createCatalogCards(items);
    catalogCount.textContent = `${items.length} ${items.length === 1 ? "título encontrado" : "títulos encontrados"}`;
    emptyMessage.hidden = items.length !== 0;
}

// Atualiza a seção Minha Lista com os títulos que o usuário salvou.
function renderFavorites() {
    const favoriteItems = catalogItems.filter(item => favoriteTitles.includes(item.title));
    favoritesGrid.innerHTML = createCatalogCards(favoriteItems);
    favoritesEmpty.hidden = favoriteItems.length !== 0;
}

// ELEMENTOS E FUNÇÕES DA JANELA DE DETALHES
const detailsModal = document.querySelector("#detailsModal");
const detailsArt = document.querySelector("#detailsArt");
const detailsType = document.querySelector("#detailsType");
const detailsTitle = document.querySelector("#detailsTitle");
const detailsMeta = document.querySelector("#detailsMeta");
const detailsDescription = document.querySelector("#detailsDescription");
const detailsFavorite = document.querySelector("#detailsFavorite");
let currentDetailsTitle = null;
let lastDetailsTrigger = null;

function updateDetailsFavoriteButton() {
    const isFavorite = favoriteTitles.includes(currentDetailsTitle);
    detailsFavorite.classList.toggle("is-favorite", isFavorite);
    detailsFavorite.setAttribute("aria-pressed", String(isFavorite));
    detailsFavorite.textContent = isFavorite ? "♥ Na minha lista" : "♡ Adicionar à minha lista";
}

function openDetails(title) {
    const item = catalogItems.find(catalogItem => catalogItem.title === title);
    if (!item) return;

    currentDetailsTitle = item.title;
    lastDetailsTrigger = document.activeElement;
    detailsArt.className = `details-art art-${catalogItems.indexOf(item) % 6}`;
    detailsArt.textContent = item.title;
    detailsType.textContent = item.type;
    detailsTitle.textContent = item.title;
    detailsMeta.textContent = `${item.year} · ${item.genre}`;
    detailsDescription.textContent = item.description;
    updateDetailsFavoriteButton();

    detailsModal.hidden = false;
    detailsModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    detailsModal.querySelector(".details-close").focus();
}

function closeDetails() {
    detailsModal.hidden = true;
    detailsModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    currentDetailsTitle = null;
    if (lastDetailsTrigger && document.contains(lastDetailsTrigger)) lastDetailsTrigger.focus();
    lastDetailsTrigger = null;
}

// Um único evento controla detalhes e favoritos em todos os cartões.
document.addEventListener("click", event => {
    const detailsButton = event.target.closest(".details-button");
    if (detailsButton) {
        openDetails(detailsButton.dataset.detailsTitle);
        return;
    }

    if (event.target.closest("[data-close-details]")) {
        closeDetails();
        return;
    }

    const favoriteButton = event.target.closest(".favorite-button");
    if (!favoriteButton || favoriteButton === detailsFavorite) return;

    const title = favoriteButton.dataset.title;
    if (favoriteTitles.includes(title)) {
        favoriteTitles = favoriteTitles.filter(favorite => favorite !== title);
    } else {
        favoriteTitles.push(title);
    }

    saveFavorites();
    filterCatalog();
    renderFavorites();
    if (currentDetailsTitle) updateDetailsFavoriteButton();
});

// Permite fechar a janela com a tecla Escape.
document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !detailsModal.hidden) closeDetails();
});

// O botão de favorito dentro da janela também usa a mesma lista salva.
detailsFavorite.addEventListener("click", () => {
    if (!currentDetailsTitle) return;

    if (favoriteTitles.includes(currentDetailsTitle)) {
        favoriteTitles = favoriteTitles.filter(title => title !== currentDetailsTitle);
    } else {
        favoriteTitles.push(currentDetailsTitle);
    }

    saveFavorites();
    filterCatalog();
    renderFavorites();
    updateDetailsFavoriteButton();
});

// Combina a pesquisa por texto com o filtro de formato.
function filterCatalog() {
    const searchTerm = catalogSearch.value.trim().toLowerCase();
    const selectedType = typeFilter.value;

    const filteredItems = catalogItems.filter(item => {
        const matchesText = `${item.title} ${item.genre} ${item.description}`.toLowerCase().includes(searchTerm);
        const matchesType = selectedType === "todos" || item.type === selectedType;
        return matchesText && matchesType;
    });

    renderCatalog(filteredItems);
}

catalogSearch.addEventListener("input", filterCatalog);
typeFilter.addEventListener("change", filterCatalog);

// A busca rápida da primeira tela reaproveita o filtro do catálogo.
const quickSearch = document.querySelector("#quickSearch");
const quickSearchButton = document.querySelector("#quickSearchButton");
const heroDiscoverButton = document.querySelector("#heroDiscoverButton");

function runQuickSearch() {
    catalogSearch.value = quickSearch.value;
    typeFilter.value = "todos";
    filterCatalog();
    document.querySelector("#catalogo").scrollIntoView({ behavior: "smooth" });
}

quickSearchButton.addEventListener("click", runQuickSearch);
quickSearch.addEventListener("keydown", event => {
    if (event.key === "Enter") runQuickSearch();
});
heroDiscoverButton.addEventListener("click", () => {
    document.querySelector("#catalogo").scrollIntoView({ behavior: "smooth" });
    catalogSearch.focus({ preventScroll: true });
});

renderCatalog(catalogItems);
renderFavorites();


// CARROSSEL: mostra uma seleção de títulos do catálogo.
const featuredTrack = document.querySelector("#featuredTrack");
const carouselPrev = document.querySelector("#carouselPrev");
const carouselNext = document.querySelector("#carouselNext");

function renderFeatured() {
    const featuredItems = catalogItems.slice(0, 6);
    featuredTrack.innerHTML = featuredItems.map((item, index) => `
        <article class="featured-card">
            <div class="featured-art art-${index % 6}">
                <span>${item.type} · ${item.year}</span>
                <strong>${item.title}</strong>
            </div>
            <div class="featured-card-info">
                <p>${item.genre}</p>
                <button type="button" class="details-button" data-details-title="${item.title}">CONHECER HISTÓRIA</button>
            </div>
        </article>
    `).join("");
}

carouselPrev.addEventListener("click", () => {
    featuredTrack.scrollBy({ left: -300, behavior: "smooth" });
});

carouselNext.addEventListener("click", () => {
    featuredTrack.scrollBy({ left: 300, behavior: "smooth" });
});

renderFeatured();


// ACESSIBILIDADE: preferências visuais do usuário.
const themeToggle = document.querySelector("#themeToggle");
const fontIncrease = document.querySelector("#fontIncrease");
const fontDecrease = document.querySelector("#fontDecrease");
const contrastToggle = document.querySelector("#contrastToggle");

// Restaura as preferências que foram salvas anteriormente.
const savedTheme = localStorage.getItem("entreatos-theme");
const savedFontSize = localStorage.getItem("entreatos-font-size") || "normal";
const savedContrast = localStorage.getItem("entreatos-high-contrast") === "true";

if (savedTheme === "light") document.body.classList.add("light-theme");
if (savedFontSize === "large") document.body.classList.add("font-large");
if (savedFontSize === "larger") document.body.classList.add("font-larger");
if (savedContrast) document.body.classList.add("high-contrast");

function updateAccessibilityButtons() {
    const isLight = document.body.classList.contains("light-theme");
    const isHighContrast = document.body.classList.contains("high-contrast");
    themeToggle.textContent = isLight ? "☾ Modo escuro" : "☀ Modo claro";
    themeToggle.setAttribute("aria-pressed", String(isLight));
    contrastToggle.setAttribute("aria-pressed", String(isHighContrast));
}

// Alterna entre o tema escuro original e o tema claro.
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");
    localStorage.setItem("entreatos-theme", document.body.classList.contains("light-theme") ? "light" : "dark");
    updateAccessibilityButtons();
});

// Aumenta a fonte em dois níveis, sem permitir tamanhos ilimitados.
fontIncrease.addEventListener("click", () => {
    document.body.classList.remove("font-large");
    document.body.classList.add("font-larger");
    localStorage.setItem("entreatos-font-size", "larger");
});

fontDecrease.addEventListener("click", () => {
    if (document.body.classList.contains("font-larger")) {
        document.body.classList.remove("font-larger");
        document.body.classList.add("font-large");
        localStorage.setItem("entreatos-font-size", "large");
    } else {
        document.body.classList.remove("font-large", "font-larger");
        localStorage.setItem("entreatos-font-size", "normal");
    }
});

// Liga ou desliga uma apresentação com contraste reforçado.
contrastToggle.addEventListener("click", () => {
    document.body.classList.toggle("high-contrast");
    localStorage.setItem("entreatos-high-contrast", String(document.body.classList.contains("high-contrast")));
    updateAccessibilityButtons();
});

updateAccessibilityButtons();


// FORMULÁRIO DE CONTATO: valida os campos no próprio navegador.
const contactForm = document.querySelector("#contactForm");
const contactFeedback = document.querySelector("#contactFeedback");
contactForm.addEventListener("submit", event => {
    event.preventDefault();
    if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
    }
    contactFeedback.textContent = "Mensagem validada! Como este é um protótipo, ela não foi enviada a um servidor.";
    contactForm.reset();
});

// LOGIN DEMONSTRATIVO: guarda apenas o nome e o e-mail da sessão, nunca a senha.
const accountModal = document.querySelector("#accountModal");
const accountOpen = document.querySelector("#accountOpen");
const accountForm = document.querySelector("#accountForm");
const accountNameField = document.querySelector("#accountNameField");
const accountName = document.querySelector("#accountName");
const accountEmail = document.querySelector("#accountEmail");
const accountPassword = document.querySelector("#accountPassword");
const accountFeedback = document.querySelector("#accountFeedback");
const accountTitle = document.querySelector("#accountTitle");
const accountSubmit = document.querySelector("#accountSubmit");
const loginTab = document.querySelector("#loginTab");
const registerTab = document.querySelector("#registerTab");
const accountLogout = document.querySelector("#accountLogout");
let accountMode = "login";
let lastAccountTrigger = null;
let demoProfile = JSON.parse(sessionStorage.getItem("entreatos-demo-profile") || "null");

function updateAccountButton() {
    accountOpen.textContent = demoProfile ? `Olá, ${demoProfile.name}` : "Entrar";
}

function setAccountMode(mode) {
    accountMode = mode;
    const registering = mode === "register";
    accountNameField.hidden = !registering;
    accountName.required = registering;
    accountPassword.autocomplete = registering ? "new-password" : "current-password";
    accountTitle.textContent = registering ? "Crie seu perfil." : "Bem-vindo ao Entreatos.";
    accountSubmit.textContent = registering ? "CRIAR PERFIL" : "ENTRAR";
    loginTab.classList.toggle("active", !registering);
    registerTab.classList.toggle("active", registering);
    loginTab.setAttribute("aria-pressed", String(!registering));
    registerTab.setAttribute("aria-pressed", String(registering));
    accountFeedback.textContent = "";
}

function openAccount() {
    lastAccountTrigger = document.activeElement;
    accountModal.hidden = false;
    accountModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    accountLogout.hidden = !demoProfile;
    accountForm.hidden = Boolean(demoProfile);
    accountTitle.textContent = demoProfile ? `Olá, ${demoProfile.name}!` : "Bem-vindo ao Entreatos.";
    accountFeedback.textContent = demoProfile ? "Você está usando um perfil demonstrativo nesta sessão." : "";
    accountModal.querySelector(".account-close").focus();
}

function closeAccount() {
    accountModal.hidden = true;
    accountModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    if (lastAccountTrigger && document.contains(lastAccountTrigger)) lastAccountTrigger.focus();
    lastAccountTrigger = null;
}

accountOpen.addEventListener("click", openAccount);
accountModal.querySelectorAll("[data-close-account]").forEach(element => element.addEventListener("click", closeAccount));
loginTab.addEventListener("click", () => setAccountMode("login"));
registerTab.addEventListener("click", () => setAccountMode("register"));

accountForm.addEventListener("submit", event => {
    event.preventDefault();
    if (!accountForm.checkValidity()) {
        accountForm.reportValidity();
        return;
    }
    const email = accountEmail.value.trim();
    const name = accountMode === "register" ? accountName.value.trim() : (email.split("@")[0] || "Visitante");
    // A senha é usada apenas para validar o preenchimento e não é armazenada.
    demoProfile = { name, email };
    sessionStorage.setItem("entreatos-demo-profile", JSON.stringify(demoProfile));
    accountPassword.value = "";
    accountForm.hidden = true;
    accountLogout.hidden = false;
    accountTitle.textContent = `Olá, ${name}!`;
    accountFeedback.textContent = "Perfil demonstrativo iniciado com sucesso nesta sessão.";
    updateAccountButton();
});

accountLogout.addEventListener("click", () => {
    demoProfile = null;
    sessionStorage.removeItem("entreatos-demo-profile");
    accountForm.reset();
    accountForm.hidden = false;
    accountLogout.hidden = true;
    setAccountMode("login");
    accountTitle.textContent = "Você saiu do perfil.";
    accountFeedback.textContent = "Até a próxima visita!";
    updateAccountButton();
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !accountModal.hidden) closeAccount();
});
updateAccountButton();


// Mantém o foco dentro das janelas abertas e devolve o foco ao controle que as abriu.
document.addEventListener("keydown", event => {
    const activeModal = !accountModal.hidden ? accountModal : (!detailsModal.hidden ? detailsModal : null);
    if (!activeModal || event.key !== "Tab") return;

    const focusableElements = Array.from(activeModal.querySelectorAll(
        'a[href], button:not([disabled]):not([hidden]), input:not([disabled]):not([hidden]), select:not([disabled]):not([hidden]), textarea:not([disabled]):not([hidden]), [tabindex]:not([tabindex="-1"])'
    )).filter(element => element.getClientRects().length > 0);

    if (focusableElements.length === 0) {
        event.preventDefault();
        return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
    }
});
