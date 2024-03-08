
export class Edge{
    constructor({a, b, weight = 0}){
        this.nodeFrom = a;
        this.nodeTo = b;
        this.weight = weight;
    }
}