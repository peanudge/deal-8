const elements = {};

const tabList = {
  productList: {
    number: 1,
  },
  chatting: {
    number: 2,
  },
  interestList: {
    number: 3,
  },
};

const menuSectionClickHandler = (event) => {
  // TODO change parameter without redirect
  // event.preventDefault();
};

const getTabNumber = (tab) => {
  const tabNames = Object.keys(tabList);
  if (!tabNames.includes(tab)) {
    return null;
  }

  return tabList[tab]?.number;
};

const setBottomBorder = (tabNumber) => {
  const $targetElement = document.querySelector(
    `.menu-tab > :nth-child(${tabNumber})`,
  );
  $targetElement.style.borderBottom = '2px solid #2ac1bc';
  console.log($targetElement);
};

window.onload = () => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const { tab } = Object.fromEntries(urlSearchParams.entries());
  const tabNumber = getTabNumber(tab);

  if (tabNumber === null) {
    return (location.href = './menu?tab=productList');
  }

  setBottomBorder(tabNumber);

  const menuSections = document.querySelectorAll('.menu-tab > section');

  elements.$slider = document.querySelector('.menu-tab--slider');

  menuSections.forEach(($menuSection) => {
    $menuSection.addEventListener('click', menuSectionClickHandler);
  });
};
