const elements = {};

const tabList = {
  productList: {
    number: 1,
    sectionId: "product-list-window",
  },
  chatting: {
    number: 2,
    sectionId: "chat-list-window",
  },
  interestList: {
    number: 3,
    sectionId: "interest-list-window",
  },
};

const primary1Color = "#2ac1bc";

const SLIDETIME = 500;

const initTabStatus = (tabInfo) => {
  const left = getContentLeft({ number: tabInfo.number });

  setContentPosition(left);
  setBottomBorder(tabInfo);
};

const setContentPosition = (left) => {
  const $sectionWrapper = document.querySelector(".section-wrapper");
  $sectionWrapper.style.left = left;
};

const getContentLeft = ({ number }) => {
  return `${-1 * ((number - 1) * 100)}%`;
};

const slideContent = (left) => {
  const $sectionWrapper = document.querySelector(".section-wrapper");

  const currentLeft = $sectionWrapper.style.left
    ? $sectionWrapper.style.left
    : "0%";

  $sectionWrapper.animate([{ left: `${currentLeft}` }, { left }], SLIDETIME);
  setContentPosition(left);
};

const showContent = ({ number, sectionId }) => {
  const left = getContentLeft({ number }); // left 퍼센트 정하기
  slideContent(left);
  setBottomBorder({ number, sectionId });
};

const menuSectionClickHandler = (event) => {
  const id = event.currentTarget.id;
  const tabNames = Object.keys(tabList);

  if (!tabNames.includes(id)) {
    event.preventDefault();
    return null;
  }
  window.history.pushState("", "", `./menu.html?tab=${id}`);
  showContent(tabList[id]);
  event.preventDefault();
};

const getTabInfo = (tab) => {
  const tabNames = Object.keys(tabList);
  if (!tabNames.includes(tab)) {
    return null;
  }

  return tabList[tab];
};

const disableSelectedEffect = ($tab) => {
  $tab.classList.remove("selected");
};

const enableSelectedEffect = ($tab) => {
  $tab.classList.add("selected");
};

const setBottomBorder = (tabInfo) => {
  const allTabs = document.querySelectorAll(`.tab-bar > *`);
  const $targetElement = allTabs[tabInfo.number - 1];

  allTabs.forEach(($tab) => disableSelectedEffect($tab));
  enableSelectedEffect($targetElement);
};

window.onload = () => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const { tab } = Object.fromEntries(urlSearchParams.entries());
  const tabInfo = getTabInfo(tab);
  if (tabInfo === null) {
    return (location.href = "./menu.html?tab=productList");
  }
  initTabStatus(tabInfo);

  const menuSections = document.querySelectorAll(".tab-bar > section");

  menuSections.forEach(($menuSection) => {
    $menuSection.addEventListener("click", menuSectionClickHandler);
  });
};
