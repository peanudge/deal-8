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

const showTab = () => {};

const menuSectionClickHandler = (event) => {
  // TODO change parameter without redirect
  // 리다이렉트가 없어진다면 서로 슬라이드 해서 넘길 수 있음
  const id = event.currentTarget.id;
  const tabNames = Object.keys(tabList);
  if (!tabNames.includes(id)) {
    event.preventDefault();
    return null;
  }

  let left = tabList[id]?.number;
  left = -1 * ((left - 1) * 100); // left 퍼센트 정하기
  const $sectionWrapper = document.querySelector(`.section-wrapper`);
  $sectionWrapper.style.left = `${left}%`;
  event.preventDefault();
};

const getTabInfo = (tab) => {
  const tabNames = Object.keys(tabList);
  if (!tabNames.includes(tab)) {
    return null;
  }

  return tabList[tab];
};

const setBottomBorder = (tabInfo) => {
  const $targetElement = document.querySelector(
    `.tab-bar > :nth-child(${tabInfo.number})`,
  );
  $targetElement.style.borderBottom = '2px solid #2ac1bc';
};

window.onload = () => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const { tab } = Object.fromEntries(urlSearchParams.entries());
  const tabInfo = getTabInfo(tab);

  if (tabInfo === null) {
    return (location.href = './menu?tab=productList');
  }

  setBottomBorder(tabInfo);

  const menuSections = document.querySelectorAll('.tab-bar > section');

  menuSections.forEach(($menuSection) => {
    $menuSection.addEventListener('click', menuSectionClickHandler);
  });
};
