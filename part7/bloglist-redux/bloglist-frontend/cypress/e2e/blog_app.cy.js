describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user1 = {
      name: "Matti Luukkainen",
      username: "mluukkai",
      password: "salainen",
    };
    const user2 = {
      name: "Test User",
      username: "test",
      password: "password",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user1);
    cy.request("POST", "http://localhost:3003/api/users/", user2);
    cy.visit("http://localhost:3000");
  });

  it("Front page can be opened", () => {
    cy.contains("Log in to application");
  });

  describe("Login", function () {
    it("Succeeds with correct credentials", function () {
      cy.get("#username").type("mluukkai");
      cy.get("#password").type("salainen");
      cy.get("#login-btn").click();

      cy.contains("Matti Luukkainen logged in");
    });

    it("Fails with wrong credentials", function () {
      cy.get("#username").type("mluukkai");
      cy.get("#password").type("wrong");
      cy.get("#login-btn").click();

      cy.get(".error")
        .should("contain", "Wrong username or password")
        .and("have.css", "color", "rgb(255, 0, 0)");

      cy.get("html").should("not.contain", "Matti Luukkainen logged in");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "mluukkai", password: "salainen" });
      cy.wait(500);
    });

    it("a blog can be created", function () {
      cy.get("#new-form").click();
      cy.get("#title").type("New Blog", { force: true });
      cy.get("#author").type("New Author", { force: true });
      cy.get("#url").type("sampleurl.dev/newblog", { force: true });
      cy.get("#submit-btn").click({ force: true });

      cy.get(".notice").should(
        "contain",
        "New Blog by New Author has been created",
      );

      cy.get(".blog").should("contain", "New Blog New Author view");
    });

    it("user can like a blog", function () {
      cy.get("#new-form").click();
      cy.get("#title").type("First Blog");
      cy.get("#author").type("First Author");
      cy.get("#url").type("sampleurl.dev/firstblog");
      cy.get("#submit-btn").click();

      cy.get(".view-btn").click();
      cy.contains("0 like");

      cy.get(".like-btn").click();
      cy.wait(500);
      cy.get(".view-btn").click();

      cy.contains("1 like");
    });

    it("user can delete a blog", function () {
      cy.get("#new-form").click();
      cy.get("#title").type("New Blog");
      cy.get("#author").type("New Author");
      cy.get("#url").type("sampleurl.dev/newblog");
      cy.get("#submit-btn").click();

      cy.get(".view-btn").click();
      cy.get(".remove-btn").click();

      cy.get(".blog").should("not.contain", "First Blog First Author");
    });

    it("cannot delete post from another user", function () {
      cy.get("#new-form").click();
      cy.get("#title").type("New Blog");
      cy.get("#author").type("New Author");
      cy.get("#url").type("sampleurl.dev/newblog");
      cy.get("#submit-btn").click();

      cy.get("#logout-btn").click();

      cy.login({ username: "test", password: "password" });

      cy.get(".view-btn").click();
      cy.get(".blog").should("not.contain", ".remove-btn");
    });

    it("blogs are ordered by most likes", function () {
      cy.get("#new-form").click();
      cy.get("#title").type("First Blog");
      cy.get("#author").type("First Author");
      cy.get("#url").type("sampleurl.dev/firstblog");
      cy.get("#submit-btn").click();

      cy.get(".view-btn").click();
      cy.get(".like-btn").click();
      cy.wait(500);

      cy.get("#new-form").click();
      cy.get("#title").type("Second Blog");
      cy.get("#author").type("Second Author");
      cy.get("#url").type("sampleurl.dev/secondblog");
      cy.get("#submit-btn").click();
      cy.wait(500);

      cy.get(".blog").eq(0).should("contain", "First Blog");

      cy.get(".view-btn:last").click();
      cy.get(".like-btn").click();
      cy.wait(500);

      cy.get(".view-btn:last").click();
      cy.get(".like-btn").click();
      cy.wait(500);

      cy.get(".blog").eq(0).should("contain", "Second Blog");
    });
  });
});
