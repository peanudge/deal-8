export default class Product {
  constructor({
    category,
    title,
    content,
    cost,
    location,
    images,
    author,
    isInterested,
    updatedAt,
    createdAt,
    deletedAt,
  }) {
    this.category = category;
    this.title = title;
    this.content = content;
    this.cost = cost;
    this.location = location;
    this.images = images;
    this.author = author;
    this.isInterested = isInterested;
    this.updatedAt = updatedAt;
    this.createdAt = createdAt;
    this.deletedAt = deletedAt;
  }
}
