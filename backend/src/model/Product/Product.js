import { PRODUCT_STATUS_SAIL } from "./ProductStatus.js";

export default class Product {
  constructor({
    id,
    category,
    title,
    content = "",
    cost = 0,
    status = PRODUCT_STATUS_SAIL,
    location = "",
    thumbnail = "",
    images = [],
    author,
    updatedAt = new Date(),
    createdAt = new Date(),
    countOfView = 0,
    countOfChat = 0,
    countOfInterested = 0,
    isInterested = false,
  }) {
    this.id = id;
    this.category = category;
    this.title = title;
    this.content = content;
    this.cost = cost;
    this.status = status;
    this.location = location;
    this.thumbnail = thumbnail;
    this.images = images;
    this.author = author;
    this.isInterested = isInterested;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.countOfView = countOfView;
    this.countOfChat = countOfChat;

    this.countOfInterested = countOfInterested;
  }
}
