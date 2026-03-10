const request = require('supertest');
const app = require('../../app');
const prisma = require('../../lib/prisma');


const loginAsAdmin = async () => {
  const response = await request(app).post("/api/admin/login").send({
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD
  });
  return response.body.token;
};

let token;

beforeAll(async () => {
    token = await loginAsAdmin();
});
afterAll(async () => {
  await prisma.$disconnect();
});

describe("Admin login", () => {

  it("Successful Login", async () => {
    const res = await request(app).post("/api/admin/login").send({
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Login successful");
  });

  it("Failed login due to wrong password", async () => {
    const res = await request(app).post("/api/admin/login").send({
      email: process.env.ADMIN_EMAIL,
      password: "Wrong Password"
    });
    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
  });

  it("Failed login due to wrong email", async () => {
    const res = await request(app).post("/api/admin/login").send({
      email: "Wrong email",
      password: process.env.ADMIN_PASSWORD
    });
    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
  });

});

describe("Admin view blogs", () => {
  

  it("GET /admin/blogs returns 401 without token", async () => {
    const res = await request(app).get("/api/admin/blogs");
    expect(res.statusCode).toBe(401);
  });

  it("GET /admin/blogs returns 200 with token", async () => {
    const res = await request(app)
      .get("/api/admin/blogs")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });

  it("GET /admin/blogs returns 401 due to wrong bearer format", async () => {
    const res = await request(app)
      .get("/api/admin/blogs")
      .set("Authorization", `Wrong-Format ${token}`);
    expect(res.statusCode).toBe(401);
  });

});

describe("Admin view blog by slug", () => {
  

  it("GET /admin/blogs/:slug returns 401 without token", async () => {
    const res = await request(app).get("/api/admin/blogs/a");
    expect(res.statusCode).toBe(401);
  });

  it("GET /admin/blogs/:slug returns 200 for valid slug", async () => {
    const res = await request(app)
      .get("/api/admin/blogs/a")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });

  it("GET /admin/blogs/:slug returns 404 for invalid slug", async () => {
    const res = await request(app)
      .get("/api/admin/blogs/slug-that-doesnt-exist")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(404);
  });

  it("GET /admin/blogs/:slug returns 401 due to wrong bearer format", async () => {
    const res = await request(app)
      .get("/api/admin/blogs/a")
      .set("Authorization", `Wrong-Format ${token}`);
    expect(res.statusCode).toBe(401);
  });

});


describe("Admin create Blog",()=>{
    let blogId;

    afterAll(async () => {
        if(blogId){
            await prisma.blog.delete({ where: { id: blogId } });
        }
    })

    it("POST /admin/blogs return 401 without token",async () => {
        const res=await request(app).post("/api/admin/blogs")
        expect(res.statusCode).toBe(401)
    })
    
    it("POST /admin/blogs return 401 due to wrong bearer format",async () => {
        const res=await request(app).post("/api/admin/blogs").set("Authorization",`wrong-format ${token}`)
        expect(res.statusCode).toBe(401)
    })

    it("POST /admin/blogs return 400 due to incomplete fields", async ()=>{
        let payload={
            title:"345"
        }
        const res=await request(app)
        .post("/api/admin/blogs")
        .set("Authorization",`Bearer ${token}`)
        .send(payload)
        expect(res.statusCode).toBe(400)
    })

    it("POST /admin/blogs return 400 to slug already exists",async () => {
        let payload={
            title:"a",
            content:"a",
            slug:'a',
            cover_image:"a",
            tag:"a",
            description:"a"
        }
        const res=await request(app)
        .post("/api/admin/blogs")
        .set("Authorization",`Bearer ${token}`)
        .send(payload)
        expect(res.statusCode).toBe(400)
        expect(res.body.message).toBe("Blog with slug already exists");
    })

    it("POST /admin/blogs return 201 to creating blog",async () => {
        let payload={
            title:"jest-test-1234",
            content:"a",
            cover_image:"a",
            tag:"a",
            description:"a"
        }
        const res=await request(app)
        .post("/api/admin/blogs")
        .set("Authorization",`Bearer ${token}`)
        .send(payload)
        expect(res.statusCode).toBe(201)
        expect(res.body.success).toBe(true)
        blogId=res.body.id
    })

})

describe("Publish Blog",()=>{
    let blogId
    beforeAll(async ()=>{
        let payload={
            title:"jest-publish-test-1234",
            content:"a",
            cover_image:"a",
            tag:"a",
            description:"a"
        }
        const res=await request(app)
        .post("/api/admin/blogs")
        .set("Authorization",`Bearer ${token}`)
        .send(payload)
        blogId=res.body.id
    })

    afterAll(async () => {
        await prisma.blog.delete({ where: { id: blogId } });
    })

    it("PATCH /admin/blogs/:id/publish return 401 without token",async ()=>{
        const res=await request(app).patch("/api/admin/blogs/1/publish")
        expect(res.statusCode).toBe(401)
    })

    it("PATCH /admin/blogs/:id/publish return 401 due to wrong bearer format", async () => {
        const res=await request(app).patch("/api/admin/blogs/1/publish").set("Authorization",`Wrong-format ${token}`)
        expect(res.statusCode).toBe(401)
    })

    it("PATCH /admin/blogs/:id/publish return 400 to empty id",async () => {
        const res=await request(app).patch("/api/admin/blogs/invalid-id-format/publish").set("Authorization",`Bearer ${token}`)
        expect(res.statusCode).toBe(400)
        expect(res.body.success).toBe(false)
    })

    it("PATCH /admin/blogs/:id/publish return 404 to id doesnt exist",async () => {
        const res=await request(app).patch("/api/admin/blogs/999999999/publish").set("Authorization",`Bearer ${token}`)
        expect(res.statusCode).toBe(404)
        expect(res.body.success).toBe(false)
    })

    it("PATCH /admin/blogs/:id/publish return 200 to successful",async () => {
        const res=await request(app).patch(`/api/admin/blogs/${blogId}/publish`).set("Authorization",`Bearer ${token}`)
        expect(res.statusCode).toBe(200)
        expect(res.body.success).toBe(true)
    })

    it("PATCH /admin/blogs/:id/publish return 409 to already published",async () => {
        const res=await request(app).patch(`/api/admin/blogs/${blogId}/publish`).set("Authorization",`Bearer ${token}`)
        expect(res.statusCode).toBe(409)
        expect(res.body.success).toBe(false)
    })
})

describe("Unpublish Blog",()=>{
    let blogId
    beforeAll(async ()=>{
        let payload={
            title:"jest-unpublish-test-1234",
            content:"a",
            cover_image:"a",
            tag:"a",
            description:"a"
        }
        const res=await request(app)
        .post("/api/admin/blogs")
        .set("Authorization",`Bearer ${token}`)
        .send(payload)
        blogId=res.body.id

        await request(app).patch(`/api/admin/blogs/${blogId}/publish`).set("Authorization",`Bearer ${token}`)
    })

    afterAll(async () => {
        await prisma.blog.delete({ where: { id: blogId } });
    })

    it("PATCH /admin/blogs/:id/unpublish return 401 without token",async ()=>{
        const res=await request(app).patch("/api/admin/blogs/1/unpublish")
        expect(res.statusCode).toBe(401)
    })

    it("PATCH /admin/blogs/:id/unpublish return 401 due to wrong bearer format", async () => {
        const res=await request(app).patch("/api/admin/blogs/1/unpublish").set("Authorization",`Wrong-format ${token}`)
        expect(res.statusCode).toBe(401)
    })

    it("PATCH /admin/blogs/:id/unpublish return 400 to empty id",async () => {
        const res=await request(app).patch("/api/admin/blogs/invalid-id-format/unpublish").set("Authorization",`Bearer ${token}`)
        expect(res.statusCode).toBe(400)
        expect(res.body.success).toBe(false)
    })

    it("PATCH /admin/blogs/:id/unpublish return 404 to id doesnt exist",async () => {
        const res=await request(app).patch("/api/admin/blogs/999999999/unpublish").set("Authorization",`Bearer ${token}`)
        expect(res.statusCode).toBe(404)
        expect(res.body.success).toBe(false)
    })

    it("PATCH /admin/blogs/:id/unpublish return 200 to successful",async () => {
        const res=await request(app).patch(`/api/admin/blogs/${blogId}/unpublish`).set("Authorization",`Bearer ${token}`)
        expect(res.statusCode).toBe(200)
        expect(res.body.success).toBe(true)
    })

    it("PATCH /admin/blogs/:id/unpublish return 409 to already unpublished",async () => {
        const res=await request(app).patch(`/api/admin/blogs/${blogId}/unpublish`).set("Authorization",`Bearer ${token}`)
        expect(res.statusCode).toBe(409)
        expect(res.body.success).toBe(false)
    })
})

describe("Update Blog",()=>{
    let blogId
    let publishedBlogId;
    beforeAll(async ()=>{
        let payload={
            title:"jest-update-test-1234",
            content:"a",
            cover_image:"a",
            tag:"a",
            description:"a"
        }
        const res=await request(app)
        .post("/api/admin/blogs")
        .set("Authorization",`Bearer ${token}`)
        .send(payload)
        blogId=res.body.id

        const res2 = await request(app)
            .post("/api/admin/blogs")
            .set("Authorization", `Bearer ${token}`)
            .send({ title: "jest-update-published-1234", content: "a", cover_image: "a", tag: "a", description: "a" });
        publishedBlogId = res2.body.id;

        await request(app)
        .patch(`/api/admin/blogs/${publishedBlogId}/publish`)
        .set("Authorization", `Bearer ${token}`);

    })

    afterAll(async () => {
        await prisma.blog.delete({ where: { id: blogId } });
        await prisma.blog.delete({ where: { id: publishedBlogId } });
    })

    it("PATCH /admin/blogs/:id return 401 without token",async () => {
        const res=await request(app).patch("/api/admin/blogs/1")
        expect(res.statusCode).toBe(401)
    })

    it("PATCH /admin/blogs/:id return 401 due to wrong bearer format",async () => {
        const res=await request(app).patch("/api/admin/blogs/1").set("Authorization",`Wrong-Format ${token}`)
        expect(res.statusCode).toBe(401)
    })

    it("PATCH /admin/blogs/:id return 400 to empty id",async () => {
        const res=await request(app).patch("/api/admin/blogs/invalid-id-format").set("Authorization",`Bearer ${token}`)
        expect(res.statusCode).toBe(400)
        expect(res.body.success).toBe(false)
    })

    it("PATCH /admin/blogs/:id return 400 to no data provided", async () => {
        let payload={

        }
        const res=await request(app).patch("/api/admin/blogs/9999").set("Authorization",`Bearer ${token}`).send(payload)
        expect(res.statusCode).toBe(400)
        expect(res.body.success).toBe(false)
    })

    it("PATCH /admin/blogs/:id return 404 to blog not found", async () => {
        let payload={
            content:"Test contenr"
        }
        const res=await request(app).patch("/api/admin/blogs/9999").set("Authorization",`Bearer ${token}`).send(payload)
        expect(res.statusCode).toBe(404)
        expect(res.body.success).toBe(false)
    })

    it("PATCH /admin/blogs/:id return 400 to blog already published", async () => {
        let payload={
            content:"Test contenr"
        }
        const res=await request(app).patch(`/api/admin/blogs/${publishedBlogId}`).set("Authorization",`Bearer ${token}`).send(payload)
        expect(res.statusCode).toBe(400)
        expect(res.body.success).toBe(false)
    })

    it("PATCH /admin/blogs/:id return 400 to updated blog slug already exists", async () => {
        let payload={
            title:"a"
        }
        const res=await request(app).patch(`/api/admin/blogs/${blogId}`).set("Authorization",`Bearer ${token}`).send(payload)
        expect(res.statusCode).toBe(400)
        expect(res.body.success).toBe(false)
    })

    it("PATCH /admin/blogs/:id return 200 to updated blog being success", async () => {
        let payload={
            content:"jest-update-test-1234"
        }
        const res=await request(app).patch(`/api/admin/blogs/${blogId}`).set("Authorization",`Bearer ${token}`).send(payload)
        expect(res.statusCode).toBe(200)
        expect(res.body.success).toBe(true)
    })
})