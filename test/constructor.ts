import DirectedGraph from '../src/index';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import { getPopulatedGraph, simpleGraphData } from './graph-data';
import exp from "constants";

describe('constructor', () => {
  it('should make a new graph with no previous data', () => {
    const graph = new DirectedGraph();


    expect(graph).to.deep.equal({
      edges: new Map(),
      nodes: new Map(),
    });
  });

  it('should make a new graph based on data that was formatted for JSON', () => {
    const graph = new DirectedGraph(simpleGraphData as any);
    const populatedGraph = getPopulatedGraph();

    expect(graph).to.deep.equal(populatedGraph);
  })
});