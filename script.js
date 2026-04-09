const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const revealItems = document.querySelectorAll(".reveal");

const chartRanges = document.querySelectorAll(".chip-group [data-range]");
const chartArea = document.querySelector(".chart-area[data-chart-range]");
const holdingsList = document.querySelector(".holdings-panel [data-holdings-list]");

const featureGraphToggles = document.querySelectorAll("[data-feature-range]");
const featureGraphArea = document.querySelector("[data-feature-graph]");
const featureGraphLabels = document.querySelector("[data-feature-labels]");
const assetGraphRangeTabs = document.querySelectorAll("[data-asset-graph-range]");
const assetGraphTotal = document.querySelector("[data-asset-graph-total]");
const assetGraphChange = document.querySelector("[data-asset-graph-change]");
const assetGraphHighlight = document.querySelector("[data-asset-graph-highlight]");
const assetGraphNote = document.querySelector("[data-asset-graph-note]");
const assetGraphLine = document.querySelector("[data-asset-graph-line]");
const assetGraphArea = document.querySelector("[data-asset-graph-area]");
const assetGraphPoints = document.querySelector("[data-asset-graph-points]");
const assetGraphLabels = document.querySelector("[data-asset-graph-labels]");

const featureSortButtons = document.querySelectorAll("[data-feature-sort]");
const featureStockBody = document.querySelector("[data-feature-stock-body]");

const newsFilterButtons = document.querySelectorAll("[data-news-filter]");
const newsCards = document.querySelectorAll("[data-news-category]");
const newsPageButtons = document.querySelectorAll("[data-news-page]");
const newsPageActions = document.querySelectorAll("[data-news-page-action]");
const newsSearchForm = document.querySelector(".news-search");
const newsSearchInput = document.querySelector('.news-search input[name="q"]');
const newsPagination = document.querySelector(".news-pagination");

const faqSearchInput = document.querySelector("[data-faq-search]");
const faqItems = document.querySelectorAll("[data-faq-item]");
const faqEmptyState = document.querySelector("[data-faq-empty]");
const faqFilterButtons = document.querySelectorAll("[data-faq-filter]");

const NEWS_ITEMS_PER_PAGE = 3;
let activeNewsFilter = "all";
let activeNewsKeyword = "";
let currentNewsPage = 1;
let activeFaqFilter = "all";

const chartRangeData = {
  month: {
    bars: ["14%", "18%", "22%", "28%", "34%", "38%"],
    holdings: [
      { name: "トヨタ自動車 (7203)", weight: "22%" },
      { name: "ソニーグループ (6758)", weight: "18%" },
      { name: "三菱UFJ FG (8306)", weight: "14%" },
      { name: "オリックス (8591)", weight: "10%" },
    ],
    line: {
      left: "46%",
      bottom: "18%",
      width: "48%",
      height: "34%",
      skewX: "-28deg",
      skewY: "-18deg",
    },
    dot: { left: "58%", bottom: "25%" },
  },
  year: {
    bars: ["18%", "28%", "24%", "40%", "48%", "54%"],
    holdings: [
      { name: "トヨタ自動車 (7203)", weight: "25%" },
      { name: "ソニーグループ (6758)", weight: "20%" },
      { name: "ソフトバンクグループ (9984)", weight: "15%" },
      { name: "キーエンス (6861)", weight: "12%" },
    ],
    line: {
      left: "41%",
      bottom: "14%",
      width: "59%",
      height: "50%",
      skewX: "-33deg",
      skewY: "-22deg",
    },
    dot: { left: "54%", bottom: "29%" },
  },
  all: {
    bars: ["10%", "20%", "26%", "38%", "52%", "68%"],
    holdings: [
      { name: "日本電信電話 (9432)", weight: "28%" },
      { name: "トヨタ自動車 (7203)", weight: "22%" },
      { name: "オリックス (8591)", weight: "17%" },
      { name: "三井住友FG (8316)", weight: "13%" },
    ],
    line: {
      left: "36%",
      bottom: "10%",
      width: "64%",
      height: "62%",
      skewX: "-35deg",
      skewY: "-24deg",
    },
    dot: { left: "50%", bottom: "34%" },
  },
};

const featureGraphData = {
  month: {
    bars: ["34%", "48%", "42%", "64%", "74%", "86%"],
    labels: ["1月", "2月", "3月", "4月", "5月", "6月"],
  },
  year: {
    bars: ["26%", "34%", "46%", "58%", "72%", "84%"],
    labels: ["2021", "2022", "2023", "2024", "2025", "2026"],
  },
};

const assetGraphShowcaseData = {
  day: {
    total: "¥18,452,000",
    change: "+¥42,000",
    highlight: "本日 15:20",
    note: "相場上昇を反映",
    labels: ["09:00", "10:30", "12:00", "13:30", "15:00", "引け後"],
    points: [
      [18, 214],
      [96, 202],
      [174, 208],
      [252, 188],
      [330, 176],
      [408, 168],
      [486, 156],
      [564, 146],
    ],
  },
  month: {
    total: "¥18,420,000",
    change: "+¥286,000",
    highlight: "今月 2回",
    note: "配当入金を反映",
    labels: ["1週目", "2週目", "3週目", "4週目", "5週目", "月末"],
    points: [
      [18, 225],
      [96, 208],
      [174, 198],
      [252, 183],
      [330, 170],
      [408, 148],
      [486, 128],
      [564, 102],
    ],
  },
  year: {
    total: "¥18,420,000",
    change: "+¥2,380,000",
    highlight: "最高値 2026.03",
    note: "年初来の積み上がり",
    labels: ["4月", "6月", "8月", "10月", "12月", "3月"],
    points: [
      [18, 236],
      [96, 228],
      [174, 212],
      [252, 194],
      [330, 174],
      [408, 152],
      [486, 118],
      [564, 88],
    ],
  },
};

const FAQ_CATEGORY_META = {
  all: "すべて",
  account: "アカウント・契約",
  feature: "機能・使い方",
  security: "セキュリティ",
  payment: "お支払い",
};

const FAQ_CATEGORY_PAGE_MAP = {
  account: "./faq-account.html",
  feature: "./faq-feature.html",
  security: "./faq-security.html",
  payment: "./faq-payment.html",
};

const FAQ_DATA = [
  {
    id: "faq-top-001",
    question: "無料プランでは何ができますか？",
    answer:
      "無料プランでは基本的な資産管理機能とポートフォリオの確認をお使いいただけます。配当管理や一部の高度な分析機能は、有料プランでご利用いただけます。",
    category: "account",
  },
  {
    id: "faq-top-002",
    question: "データのセキュリティは確保されていますか？",
    answer:
      "すべての通信は SSL/TLS により暗号化されており重要な情報は安全な環境で管理しています。お客様のデータを保護するため、継続的に運用体制を見直しています。",
    category: "security",
  },
  {
    id: "faq-top-003",
    question: "複数のデバイスで利用できますか？",
    answer:
      "可能です。クラウドベースのシステムを採用しているため PC、スマートフォン、タブレットなど、どのデバイスからでも最新の情報にアクセスできます。",
    category: "feature",
  },
  {
    id: "faq-top-004",
    question: "請求書や領収書は確認できますか？",
    answer:
      "マイページの契約情報から、請求履歴と領収書を確認できます。必要に応じてダウンロードできるため、経費処理にも使いやすい設計です。",
    category: "payment",
  },
  {
    id: "faq-account-001",
    question: "メールアドレスを変更できますか？",
    answer:
      "マイページのアカウント設定から変更できます。変更後は確認メールをお送りしますので、認証完了後に新しいメールアドレスが有効になります。",
    category: "account",
  },
  {
    id: "faq-account-002",
    question: "パスワードを忘れた場合はどうすればいいですか？",
    answer:
      "ログイン画面の「パスワードを忘れた方」から再設定手続きに進めます。登録済みメールアドレス宛に再設定用リンクをお送りします。",
    category: "account",
  },
  {
    id: "faq-account-003",
    question: "2段階認証に対応していますか？",
    answer:
      "対応しています。セキュリティ設定から有効化すると、ログイン時に追加認証コードの入力が必要になります。",
    category: "security",
  },
  {
    id: "faq-account-004",
    question: "ログインできないときの確認項目は？",
    answer:
      "メールアドレスの入力間違い、パスワードの大文字小文字、ブラウザの保存情報をご確認ください。解決しない場合は再設定をご利用ください。",
    category: "account",
  },
  {
    id: "faq-account-005",
    question: "退会後に再登録できますか？",
    answer:
      "再登録は可能です。ただし、退会済みアカウントの保存データは復元できないため必要な情報は事前にご確認ください。",
    category: "account",
  },
  {
    id: "faq-pricing-001",
    question: "無料プランでは何が使えますか？",
    answer:
      "無料プランでは、資産一覧の確認、基本的なポートフォリオ管理、配当の概要表示をご利用いただけます。詳細分析は有料プランで提供しています。",
    category: "account",
  },
  {
    id: "faq-pricing-002",
    question: "プレミアムプランの支払い方法は？",
    answer:
      "クレジットカード決済に対応しています。対応ブランドはお申し込み画面に表示されます。",
    category: "payment",
  },
  {
    id: "faq-pricing-003",
    question: "月途中でプラン変更した場合はどうなりますか？",
    answer:
      "変更タイミングに応じて日割りまたは次回請求から適用されます。実際の反映内容はお手続き画面で事前に確認できます。",
    category: "account",
  },
  {
    id: "faq-pricing-004",
    question: "解約はいつでもできますか？",
    answer:
      "はい、契約期間中でもマイページから解約手続きが可能です。次回更新日までは有料機能をご利用いただけます。",
    category: "account",
  },
  {
    id: "faq-pricing-005",
    question: "請求書や領収書は確認できますか？",
    answer:
      "契約情報ページから請求履歴と領収書を確認できます。PDF形式で保存できるため、管理にも便利です。",
    category: "payment",
  },
  {
    id: "faq-import-001",
    question: "保有株データは手動で登録できますか？",
    answer:
      "はい、銘柄コード、保有数量、取得単価などを手動で入力して登録できます。少量の保有銘柄を管理したい場合にも便利です。",
    category: "feature",
  },
  {
    id: "faq-import-002",
    question: "CSVインポートに対応していますか？",
    answer:
      "対応しています。所定のCSVフォーマットに沿ってアップロードすると、一括で保有データを取り込めます。",
    category: "feature",
  },
  {
    id: "faq-import-003",
    question: "証券口座データの取り込み方法は？",
    answer:
      "CSVダウンロードに対応している証券会社の場合、出力したファイルを取り込めます。対応形式はインポート画面でご確認ください。",
    category: "feature",
  },
  {
    id: "faq-import-004",
    question: "インポートに失敗した場合はどうすればよいですか？",
    answer:
      "エラー内容が表示されるので、項目名や日付形式、銘柄コードなどをご確認ください。必要に応じてサンプルCSVも参照できます。",
    category: "feature",
  },
  {
    id: "faq-import-005",
    question: "重複データは自動で判定されますか？",
    answer:
      "一定条件で重複候補を検出し、取り込み前に確認できる仕組みがあります。意図しない二重登録を防ぎやすくなっています。",
    category: "feature",
  },
  {
    id: "faq-notification-001",
    question: "配当通知は設定できますか？",
    answer:
      "設定できます。配当予定日や入金完了時の通知を有効にすると、確認漏れを防ぎやすくなります。",
    category: "feature",
  },
  {
    id: "faq-notification-002",
    question: "価格アラートはありますか？",
    answer:
      "一部の銘柄について、指定した価格帯に到達した際のアラート通知に対応しています。設定は銘柄詳細画面から行えます。",
    category: "feature",
  },
  {
    id: "faq-notification-003",
    question: "通知メールを停止できますか？",
    answer:
      "通知設定ページからメール通知のオン・オフを切り替えられます。必要な通知だけを残すことも可能です。",
    category: "feature",
  },
  {
    id: "faq-notification-004",
    question: "アプリ内通知とメール通知は分けられますか？",
    answer:
      "分けて設定できます。通知種別ごとに受け取り方法を選べるため、ご利用スタイルに合わせて調整できます。",
    category: "feature",
  },
  {
    id: "faq-notification-005",
    question: "通知タイミングは変更できますか？",
    answer:
      "通知の種類によっては、前日や当日などのタイミングを選択できます。設定可能な項目は通知設定画面に表示されます。",
    category: "feature",
  },
];

const observer =
  revealItems.length > 0
    ? new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.16,
          rootMargin: "0px 0px -40px 0px",
        }
      )
    : null;

const observeRevealElements = (elements) => {
  if (!observer) return;
  elements.forEach((element) => {
    if (element) observer.observe(element);
  });
};

const syncHeaderState = () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 12);
};

const closeMenu = () => {
  if (!menuToggle || !siteNav) return;
  menuToggle.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  siteNav.classList.remove("is-open");
};

const applyChartRange = (range) => {
  if (!chartArea || !chartRangeData[range]) return;

  const config = chartRangeData[range];
  chartArea.dataset.chartRange = range;

  chartArea.querySelectorAll(".bar").forEach((bar, index) => {
    if (!config.bars[index]) return;
    bar.style.setProperty("--bar-height", config.bars[index]);
    bar.style.animation = "none";
    void bar.offsetHeight;
    bar.style.animation = "";
  });

  chartArea.style.setProperty("--line-left", config.line.left);
  chartArea.style.setProperty("--line-bottom", config.line.bottom);
  chartArea.style.setProperty("--line-width", config.line.width);
  chartArea.style.setProperty("--line-height", config.line.height);
  chartArea.style.setProperty("--line-skew-x", config.line.skewX);
  chartArea.style.setProperty("--line-skew-y", config.line.skewY);
  chartArea.style.setProperty("--dot-left", config.dot.left);
  chartArea.style.setProperty("--dot-bottom", config.dot.bottom);

  if (holdingsList) {
    holdingsList.innerHTML = [...config.holdings]
      .sort((a, b) => Number.parseFloat(b.weight) - Number.parseFloat(a.weight))
      .map(
        (holding) =>
          `<li><span>${holding.name}</span><strong>${holding.weight}</strong></li>`
      )
      .join("");
  }

  chartRanges.forEach((button) => {
    button.classList.toggle("chip-active", button.dataset.range === range);
  });
};

const applyFeatureGraphRange = (range) => {
  if (!featureGraphArea || !featureGraphData[range]) return;

  const config = featureGraphData[range];
  featureGraphArea.dataset.featureGraph = range;

  featureGraphArea.querySelectorAll(".feature-graph-bar").forEach((bar, index) => {
    if (!config.bars[index]) return;
    bar.style.setProperty("--feature-bar-height", config.bars[index]);
  });

  if (featureGraphLabels) {
    featureGraphLabels.innerHTML = config.labels.map((label) => `<span>${label}</span>`).join("");
  }

  featureGraphToggles.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.featureRange === range);
  });
};

const formatAssetGraphPath = (points, closeArea = false) => {
  if (!points?.length) return "";

  const [firstX, firstY] = points[0];
  const linePath = [`M ${firstX} ${firstY}`];

  points.slice(1).forEach(([x, y]) => {
    linePath.push(`L ${x} ${y}`);
  });

  if (!closeArea) {
    return linePath.join(" ");
  }

  const [lastX] = points[points.length - 1];
  linePath.push(`L ${lastX} 252`, `L ${firstX} 252 Z`);
  return linePath.join(" ");
};

const applyAssetGraphRange = (range) => {
  const config = assetGraphShowcaseData[range];
  if (!config || !assetGraphLine || !assetGraphArea) return;

  if (assetGraphTotal) assetGraphTotal.textContent = config.total;
  if (assetGraphChange) assetGraphChange.textContent = config.change;
  if (assetGraphHighlight) assetGraphHighlight.textContent = config.highlight;
  if (assetGraphNote) assetGraphNote.textContent = config.note;

  assetGraphLine.setAttribute("d", formatAssetGraphPath(config.points));
  assetGraphArea.setAttribute("d", formatAssetGraphPath(config.points, true));

  if (assetGraphPoints) {
    assetGraphPoints.innerHTML = config.points
      .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5"></circle>`)
      .join("");
  }

  if (assetGraphLabels) {
    assetGraphLabels.innerHTML = config.labels.map((label) => `<span>${label}</span>`).join("");
  }

  assetGraphRangeTabs.forEach((button) => {
    const isActive = button.dataset.assetGraphRange === range;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
};

const sortFeatureStocks = (key) => {
  if (!featureStockBody || !key) return;

  [...featureStockBody.querySelectorAll("tr")]
    .sort((a, b) => {
      const aValue = Number.parseFloat(a.dataset[key] || "0");
      const bValue = Number.parseFloat(b.dataset[key] || "0");
      return bValue - aValue;
    })
    .forEach((row) => featureStockBody.appendChild(row));

  featureSortButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.featureSort === key);
  });
};

const getNewsEmptyState = () => {
  const newsList = document.querySelector("[data-news-list]");
  if (!newsList) return null;

  let emptyState = newsList.querySelector("[data-news-empty]");
  if (emptyState) return emptyState;

  emptyState = document.createElement("div");
  emptyState.className = "news-empty-state";
  emptyState.dataset.newsEmpty = "true";
  emptyState.hidden = true;
  emptyState.innerHTML =
    "<h2>該当するお知らせが見つかりませんでした</h2><p>別のキーワードを試すか、カテゴリを「すべて」に切り替えてご確認ください。</p>";

  if (newsPagination?.parentElement === newsList) {
    newsList.insertBefore(emptyState, newsPagination);
  } else {
    newsList.appendChild(emptyState);
  }

  return emptyState;
};

const renderNewsCards = () => {
  if (!newsCards.length) return;

  const filteredCards = [...newsCards].filter((card) => {
    const matchesCategory =
      activeNewsFilter === "all" || card.dataset.newsCategory === activeNewsFilter;
    const normalizedKeyword = activeNewsKeyword.trim().toLowerCase();
    const matchesKeyword =
      !normalizedKeyword || card.textContent.toLowerCase().includes(normalizedKeyword);

    return matchesCategory && matchesKeyword;
  });

  const emptyState = getNewsEmptyState();
  if (emptyState) {
    emptyState.hidden = filteredCards.length > 0;
  }

  const totalPages = Math.max(1, Math.ceil(filteredCards.length / NEWS_ITEMS_PER_PAGE));
  currentNewsPage = Math.min(Math.max(currentNewsPage, 1), totalPages);

  const startIndex = (currentNewsPage - 1) * NEWS_ITEMS_PER_PAGE;
  const endIndex = startIndex + NEWS_ITEMS_PER_PAGE;

  newsFilterButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.newsFilter === activeNewsFilter);
  });

  newsCards.forEach((card) => {
    const cardIndex = filteredCards.indexOf(card);
    card.hidden = !(cardIndex >= startIndex && cardIndex < endIndex);
  });

  newsPageButtons.forEach((button) => {
    const pageNumber = Number(button.dataset.newsPage);
    const isAvailable = pageNumber > 0 && pageNumber <= totalPages;
    const isCurrent = pageNumber === currentNewsPage;

    button.classList.toggle("is-current", isCurrent);
    button.classList.toggle("is-disabled", !isAvailable);
    button.disabled = !isAvailable;
    button.setAttribute("aria-current", isCurrent ? "page" : "false");
  });

  newsPageActions.forEach((button) => {
    const shouldDisable =
      button.dataset.newsPageAction === "prev"
        ? currentNewsPage <= 1
        : currentNewsPage >= totalPages;
    button.classList.toggle("is-disabled", shouldDisable);
    button.disabled = shouldDisable;
  });

  if (newsPagination) {
    newsPagination.hidden = filteredCards.length === 0;
  }
};

const applyNewsFilter = (filter) => {
  activeNewsFilter = filter;
  currentNewsPage = 1;
  renderNewsCards();
};

const applyNewsKeyword = (keyword = "") => {
  activeNewsKeyword = keyword;
  currentNewsPage = 1;
  renderNewsCards();
};

const filterFaqItems = (keyword = faqSearchInput?.value || "") => {
  if (!faqItems.length) return;

  const normalizedKeyword = keyword.trim().toLowerCase();
  const showAllByKeyword = normalizedKeyword === "すべて";
  let visibleCount = 0;

  faqFilterButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.faqFilter === activeFaqFilter);
  });

  faqItems.forEach((item) => {
    const sourceText = [
      item.dataset.faqKeywords || "",
      item.querySelector("h2")?.textContent || "",
      item.querySelector("p")?.textContent || "",
    ]
      .join(" ")
      .toLowerCase();

    const matchesKeyword =
      !normalizedKeyword || showAllByKeyword || sourceText.includes(normalizedKeyword);
    const matchesCategory =
      activeFaqFilter === "all" || item.dataset.faqCategory === activeFaqFilter;
    const shouldShow = matchesKeyword && matchesCategory;

    item.hidden = !shouldShow;
    if (shouldShow) visibleCount += 1;
  });

  if (faqEmptyState) {
    faqEmptyState.hidden = visibleCount > 0;
  }
};

const renderFaqApp = () => {
  const faqAppRoot = document.querySelector("[data-faq-app]");
  if (!faqAppRoot) return;

  const faqAppSearch = faqAppRoot.querySelector("[data-faq-app-search]");
  const faqAppTabs = faqAppRoot.querySelectorAll("[data-faq-app-tab]");
  const faqAppList = faqAppRoot.querySelector("[data-faq-app-list]");
  const faqAppCategories = faqAppRoot.querySelector("[data-faq-app-categories]");

  if (!faqAppList || !faqAppCategories) return;

  // FAQトップは、上部タブ・右カテゴリリンク・検索欄で同じ state を共有する。
  const state = {
    keyword: "",
    category: "all",
  };

  const getKeywordFiltered = () => {
    const keyword = state.keyword.trim().toLowerCase();
    if (!keyword || keyword === "すべて") return FAQ_DATA;

    return FAQ_DATA.filter((item) => {
      const haystack = `${item.question} ${item.answer} ${FAQ_CATEGORY_META[item.category] || ""}`.toLowerCase();
      return haystack.includes(keyword);
    });
  };

  const getVisibleItems = () => {
    const keywordFiltered = getKeywordFiltered();
    if (state.category === "all") return keywordFiltered;
    return keywordFiltered.filter((item) => item.category === state.category);
  };

  const renderFaqList = () => {
    const items = getVisibleItems();

    if (!items.length) {
      faqAppList.innerHTML =
        '<p class="faq-empty-state">該当するFAQが見つかりませんでした。別のキーワードやカテゴリをお試しください。</p>';
      return;
    }

    faqAppList.innerHTML = items
      .map((item, index) => {
        const delayClass =
          index % 3 === 1 ? "reveal-delay" : index % 3 === 2 ? "reveal-delay-2" : "";

        return `
          <article class="faq-card reveal ${delayClass}">
            <div class="faq-qmark">Q.</div>
            <div class="faq-card-body">
              <h2>${item.question}</h2>
              <p>${item.answer}</p>
            </div>
          </article>
        `;
      })
      .join("");

    observeRevealElements(faqAppList.querySelectorAll(".reveal"));
  };

  const renderCategoryLinks = () => {
    const categories = Object.entries(FAQ_CATEGORY_META).filter(([key]) => key !== "all");

    faqAppCategories.innerHTML = categories
      .map(
        ([key, label]) => `
          <li>
            <a
              href="${FAQ_CATEGORY_PAGE_MAP[key]}"
              class="${state.category === key ? "is-active" : ""}"
            >
              <span>${label}</span>
            </a>
          </li>
        `
      )
      .join("");
  };

  const syncCategoryTabs = () => {
    faqAppTabs.forEach((button) => {
      button.classList.toggle("is-active", button.dataset.faqAppTab === state.category);
      button.setAttribute(
        "aria-pressed",
        button.dataset.faqAppTab === state.category ? "true" : "false"
      );
    });
  };

  const renderFaqAppState = () => {
    if (faqAppSearch) {
      faqAppSearch.value = state.keyword;
    }
    syncCategoryTabs();
    renderFaqList();
    renderCategoryLinks();
  };

  // 上のカテゴリタブと右カラムのリンクの両方から使う共通更新関数。
  const setActiveCategory = (category) => {
    state.category = FAQ_CATEGORY_META[category] ? category : "all";
    renderFaqAppState();
  };

  faqAppTabs.forEach((button) => {
    button.addEventListener("click", () => {
      setActiveCategory(button.dataset.faqAppTab || "all");
    });
  });

  if (faqAppSearch) {
    faqAppSearch.addEventListener("input", (event) => {
      state.keyword = event.target.value;
      renderFaqAppState();
    });
  }

  renderFaqAppState();
};

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    siteNav.classList.toggle("is-open", isOpen);
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
}

observeRevealElements(revealItems);

chartRanges.forEach((button) => {
  button.addEventListener("click", () => {
    applyChartRange(button.dataset.range);
  });
});

featureGraphToggles.forEach((button) => {
  button.addEventListener("click", () => {
    applyFeatureGraphRange(button.dataset.featureRange);
  });
});

assetGraphRangeTabs.forEach((button) => {
  button.addEventListener("click", () => {
    applyAssetGraphRange(button.dataset.assetGraphRange || "month");
  });
});

featureSortButtons.forEach((button) => {
  button.addEventListener("click", () => {
    sortFeatureStocks(button.dataset.featureSort);
  });
});

newsFilterButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    applyNewsFilter(button.dataset.newsFilter || "all");
  });
});

newsPageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const page = Number(button.dataset.newsPage);
    if (!page || button.disabled) return;
    currentNewsPage = page;
    renderNewsCards();
  });
});

newsPageActions.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.disabled) return;
    currentNewsPage += button.dataset.newsPageAction === "prev" ? -1 : 1;
    renderNewsCards();
  });
});

if (newsSearchForm) {
  newsSearchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    applyNewsKeyword(newsSearchInput?.value || "");
  });
}

if (newsSearchInput) {
  newsSearchInput.addEventListener("input", (event) => {
    applyNewsKeyword(event.target.value);
  });
}

if (faqSearchInput) {
  faqSearchInput.addEventListener("input", (event) => {
    filterFaqItems(event.target.value);
  });
}

faqFilterButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    activeFaqFilter = button.dataset.faqFilter || "all";
    filterFaqItems();
  });
});

window.addEventListener("scroll", syncHeaderState, { passive: true });
window.addEventListener("resize", () => {
  if (window.innerWidth > 840) closeMenu();
});

syncHeaderState();
applyChartRange(chartArea?.dataset.chartRange || "year");
applyFeatureGraphRange(featureGraphArea?.dataset.featureGraph || "year");
applyAssetGraphRange("month");
if (newsCards.length) {
  const initialNewsKeyword = new URLSearchParams(window.location.search).get("q") || "";
  if (newsSearchInput) newsSearchInput.value = initialNewsKeyword;
  activeNewsKeyword = initialNewsKeyword;
  applyNewsFilter("all");
}
if (faqItems.length) filterFaqItems("");
renderFaqApp();
