export default class Product {
  constructor({
    id,
    category,
    title,
    content,
    cost,
    location,
    thumbnail,
    images = [],
    author,
    isInterested,
    updatedAt,
    createdAt,
    deletedAt,
  }) {
    if (images?.length === 0 || !images) {
      console.log("no images");
      thumbnail = null;
    }
    this.id = id;
    this.category = category;
    this.title = title;
    this.content = content;
    this.cost = cost;
    this.location = location;
    this.thumbnail = thumbnail;
    this.images = images;
    this.author = author;
    this.isInterested = isInterested;
    this.updatedAt = updatedAt;
    this.createdAt = createdAt;
    this.deletedAt = deletedAt;
  }
}
