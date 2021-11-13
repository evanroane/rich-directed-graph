import RDG, { RichDirectedGraphData } from '../src/index';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import { getPopulatedGraph, serializedGraphData } from './graph-data';

describe('constructor', () => {
  it('should make a new graph with no previous data', () => {
    const graph = new RDG();

    expect(graph.edges).to.deep.equal(new Map());
    expect(graph.nodes).to.deep.equal(new Map());
  });

  it('should make a new graph based on serialized data', () => {
    const graph = new RDG({ serializedDirectedGraph: serializedGraphData });
    const populatedGraph = getPopulatedGraph();

    expect(graph).to.deep.equal(populatedGraph);
  });

  it('should make a new graph based on RDG data already in memory', () => {
    const firstRDG = new RDG()
      .setNode('testKey', {testDataKey: 'test data value'})
      .setNode('testKey2', {testDataKey2: 'test data value2'})
      .setEdge('testKey', 'testKey2');

    const secondRDG = new RDG({ richDirectedGraph: firstRDG });

    const expected = {
      nodes: new Map()
        .set('testKey', { testDataKey: 'test data value' })
        .set('testKey2', { testDataKey2: 'test data value2' }),
      edges: new Map().set('testKey', new Set(['testKey2'])),
    };

    expect(secondRDG).to.deep.equal(expected);
  });
});