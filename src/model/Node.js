
export class Node{
    constructor({value, heuristic = 0}){
        this.value = value;
        this.edges = [];

        this.heuristic = heuristic;
    }

    addEdge(value){
        this.edges.push(value);
        return this;
    }
}