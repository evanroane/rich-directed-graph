import { getPopulatedGraph, simpleGraphData } from './populated-graph';
import { describe, it } from 'mocha';
import { expect } from 'chai';

describe('toJson', () => {
  it('should return the full graph in JSON serializable form', () => {
    const graph = getPopulatedGraph();

    const json = graph.toJSON();

    expect(JSON.stringify(json)).to.equal(JSON.stringify(simpleGraphData));
  });
});