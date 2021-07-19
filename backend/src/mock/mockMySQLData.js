import MySQLCategoryStore from "../model/Category/Store/MySQLCategoryStore.js";

const categoryStore = new MySQLCategoryStore();

export const createMockData = async () => {
  await createInitCategory();
  console.log("Generate Category Mock Data");
};

const createInitCategory = async () => {
  const remoteCategories = await categoryStore.getCategories();
  for (let { id, name } of categoryList) {
    const exist = remoteCategories.find((category) => category.id === id);
    if (!exist) {
      await categoryStore.addCategory(id, name);
    }
  }
};

const categoryList = [
  {
    name: "디지털 기기",
    id: 1,
  },
  {
    name: "게임/취미",
    id: 2,
  },
  {
    name: "여성패션/잡화",
    id: 3,
  },
  {
    name: "뷰티/미용",
    id: 4,
  },
  {
    name: "생활 가전",
    id: 5,
  },
  {
    name: "생활/가공식품",
    id: 6,
  },
  {
    name: "남성패션/잡화",
    id: 7,
  },
  {
    name: "반려동물",
    id: 8,
  },
  {
    name: "가구 인테리어",
    id: 9,
  },

  {
    name: "스포츠/레저",
    id: 10,
  },

  {
    name: "유아동",
    id: 11,
  },
  {
    name: "도서/티켓/음반",
    id: 12,
  },
];
