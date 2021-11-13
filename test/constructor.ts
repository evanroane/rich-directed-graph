import DirectedGraph from '../src/index';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import { getPopulatedGraph, serializedGraphData } from './graph-data';

describe('constructor', () => {
  it('should make a new graph with no previous data', () => {
    const graph = new DirectedGraph();

    expect(graph.edges).to.deep.equal(new Map());
    expect(graph.nodes).to.deep.equal(new Map());
  });

  it('should make a new graph based on data that was formatted for JSON', () => {
    const graph = new DirectedGraph({ serializedDirectedGraph: serializedGraphData });
    const populatedGraph = getPopulatedGraph();

    expect(graph).to.deep.equal(populatedGraph);
  });
});