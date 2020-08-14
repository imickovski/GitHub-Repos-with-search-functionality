const express = require('express');
const router  = express.Router();
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

// GraphQL 
let schema = buildSchema(`
  type Query {
    hello: String
  }
`);

let root = { hello: () => 'Hello world!' };

router.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

module.exports = router;
