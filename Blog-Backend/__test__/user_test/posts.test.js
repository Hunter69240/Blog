const request = require('supertest');
const app = require('../../app');
const prisma = require('../../lib/prisma');

beforeAll(async () => {
  await prisma.blog.create({
    data: {
      title: "jest-user-test",
      slug: "jest-user-test",
      content: "a",
      coverImage: "a",
      tag: "a",
      description: "a",
      isPublished: true,
      
    }
  });
});

afterAll(async () => {
  await prisma.blog.delete({ where: { slug: "jest-user-test" } });
  await prisma.$disconnect();
});

describe('Public Routes', () => {
  it('GET /api/blogs returns 200', async () => {
    const res = await request(app).get('/api/blogs');
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.blogs)).toBe(true);
  });

  it("GET /api/blogs/:slug for valid slug", async () => {
    const res = await request(app).get("/api/blogs/jest-user-test");
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.blog).toBeInstanceOf(Object);
  });

  it("GET /api/blogs/:slug for invalid slug", async () => {
    const res = await request(app).get("/api/blogs/blog-that-doesnt-exist");
    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Blog doesn't exist");
  });
});