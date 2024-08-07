require('dotenv').config();
const { GraphQLClient, gql } = require('graphql-request');

const clients = {};

function getClient(url) {
  if (!clients[url]) {
    clients[url] = new GraphQLClient(url);
  }
  return clients[url];
}

function clientBuilder(url) {
  return async (query) => {
    const client = getClient(url);
    const response = await client.request(query);
    return response;
  };
}

module.exports = {
  // multiflowSG: clientBuilder('https://api.studio.thegraph.com/query/69878/multiflow11/version/latest'),
  multiflowSG: clientBuilder('https://graph.node.bean.money/subgraphs/name/multiflow11_all/'),
  urlGql: clientBuilder,
  gql,
};
