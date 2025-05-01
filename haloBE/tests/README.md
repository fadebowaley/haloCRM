🧪 Tests Directory
This folder contains all automated tests for the Node.js backend. It is structured for scalability and clarity, using a combination of unit tests, integration tests, fixtures, and utility scripts.

📁 Folder Structure
tests/
│
├── fixtures/             # Reusable mock data for tests
│   ├── token.fixture.js
│   └── user.fixture.js
│
├── integration/          # End-to-end tests for API routes and services
│   ├── auth.test.js
│   ├── docs.test.js
│   └── user.test.js
│
├── unit/                 # Tests for isolated components
│   ├── middlewares/
│   │   └── error.test.js
│   ├── models/
│   │   ├── plugins/
│   │   │   ├── paginate.plugin.test.js
│   │   │   └── toJson.plugin.test.js
│   │   ├── permission.model.test.js
│   │   ├── role.model.test.js
│   │   └── user.model.test.js
│
├── utils/                # Helpers for test setup
│   └── setupTestDB.js



🔍 Test Types
✅ Fixtures (fixtures/)
Reusable mock data used across test files. Keeps your test cases clean and consistent.
- token.fixture.js: Generates mock access and refresh tokens.
- user.fixture.js: Creates admin and regular user samples.


✅ Integration Tests (integration/)
Tests the full request-response lifecycle for API endpoints using tools like supertest.
- auth.test.js: Authentication endpoints
- docs.test.js: API documentation endpoints
- user.test.js: User routes (CRUD, roles, etc.)

Each test file follows this pattern:
describe('POST /v1/users', () => {
  it('should create a new user', async () => {
    const res = await request(app)
      .post('/v1/users')
      .set('Authorization', `Bearer ${adminAccessToken}`)
      .send(userData);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('user');
  });
});


✅ Unit Tests (unit/)
Tests isolated logic such as middlewares, model behavior, and plugins.
Middlewares
- error.test.js: Validates error-handling middleware logic.
Models
- permission.model.test.js, role.model.test.js, user.model.test.js: Test schema validation, instance methods, and static methods.
Plugins
- paginate.plugin.test.js: Checks the custom pagination plugin on Mongoose schemas.
- toJson.plugin.test.js: Ensures models serialize correctly.


✅ Utils (utils/)
Contains utilities used by multiple test files.
- setupTestDB.js: Connects to a test database, clears data between tests, and handles teardown.

Example usage:
const setupTestDB = require('../utils/setupTestDB');
setupTestDB();


🚀 How to Run Tests
You can run all tests using:
npm test
# or
npx jest

To run a specific test file:
- npx jest tests/integration/user.test.js

To run only tests matching a keyword:
- npx jest -t 'should create a new user'


🧰 How to Add New Tests
➕ Add a New Integration Test
- Create a new file in tests/integration/, e.g. product.test.js.
- Use supertest to call your endpoints.
- Use mock data from fixtures/.

describe('POST /v1/products', () => {
  it('should create a new product', async () => {
    const res = await request(app)
      .post('/v1/products')
      .set('Authorization', `Bearer ${adminAccessToken}`)
      .send({ name: 'Test Product', price: 100 });

    expect(res.status).toBe(201);
  });
});


➕ Add a Unit Test for a Helper or Model
- Create a new file in tests/unit/[area]/.
- Test your function or model behavior in isolation.
js
// tests/unit/utils/slugify.test.js
const slugify = require('../../../src/utils/slugify');

describe('slugify()', () => {
  it('should convert string to URL-friendly format', () => {
    expect(slugify('Hello World')).toBe('hello-world');
  });
});


🛠 Tips for Writing Good Tests
- Use the Arrange-Act-Assert pattern: Set up data, perform action, then assert the result.
- Use fixtures for reusability.
- Use beforeEach() or beforeAll() to prepare test context.
- Avoid testing too many things in a single test case.


📌 Dependencies
Make sure the following dependencies are installed for the test environment:
npm install --save-dev jest supertest mongodb-memory-server


📣 Contribution
When contributing tests:
- Follow the folder structure.
- Reuse fixtures where possible.
- Keep tests focused and descriptive.
- Run npm test before pushing your code.

Happy Testing! 💪