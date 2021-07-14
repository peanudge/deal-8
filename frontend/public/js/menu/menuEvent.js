const elements = {};

const tabList = {
  productList: {
    number: 1,
    sectionId: 'product-list-window',
  },
  chatting: {
    number: 2,
    sectionId: 'chat-list-window',
  },
  interestList: {
    number: 3,
    sectionId: 'interest-list-window',
  },
};

const primary1Color = '#2ac1bc';

const slideContent = ($tab) => {};

const showContent = ({ number, sectionId }) => {
  const left = -1 * ((number - 1) * 100); // left 퍼센트 정하기
  const $sectionWrapper = document.querySelector(`.section-wrapper`);
  $sectionWrapper.style.left = `${left}%`;

  setBottomBorder({ number, sectionId });
};

const menuSectionClickHandler = (event) => {
  // TODO change parameter without redirect
  // 리다이렉트가 없어진다면 서로 슬라이드 해서 넘길 수 있음
  const id = event.currentTarget.id;
  const tabNames = Object.keys(tabList);

  if (!tabNames.includes(id)) {
    event.preventDefault();
    return null;
  }
  window.history.pushState('', '', `./menu?tab=${id}`);
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
  $tab.classList.remove('selected');
};

const enableSelectedEffect = ($tab) => {
  $tab.classList.add('selected');
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
    return (location.href = './menu?tab=productList');
  }

  showContent(tabInfo);

  const menuSections = document.querySelectorAll('.tab-bar > section');

  menuSections.forEach(($menuSection) => {
    $menuSection.addEventListener('click', menuSectionClickHandler);
  });
};
