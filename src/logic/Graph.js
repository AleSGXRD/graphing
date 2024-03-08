import { Edge } from "../model/Edge";
import { Node } from "../model/Node";

class Graph{
    constructor(nodes,edges){
        this.nodes = nodes;
        this.edges = edges;
        this.visited = Array.of(this.nodes.length);
        this.treeNodes = [];
        this.treeEdges = [];
        this.route = [];

        this.mapperGraph();
    }
    searchNode(value){
        for(var i =0;i< this.nodes.length;i ++){
            if(this.nodes[i].value === value) return i;
    
            continue;
        }
        return -1;
    }
    
    mapperGraph(){
        for(var i=0;i < this.nodes.length;i++){
            this.nodes[i].edges = [];
        }

        for(var i=0; i < this.edges.length;i++){
            const indexNodeFrom = this.searchNode(this.edges[i].nodeFrom);
            this.nodes[indexNodeFrom].addEdge(this.edges[i]);
        }
        return this.nodes;
    }
    restartVisited(){
        this.visited = Array.of(this.nodes.length);
        return this;
    }

    BFS(value){ 

        var route = [];
        var treeNodes = [];
        var treeEdges = [];
    
        var queue = [this.nodes[this.searchNode(value)]];

        const indexNode = this.searchNode(value);
        this.visited[indexNode] = true;
    
        while(queue.length >0){
            var current = queue.shift();
    
            if(current == null) continue;
    
            route.push(current.value);
            for(const edge of current.edges){
                const indexNodeTo = this.searchNode(edge.nodeTo);

                if(this.visited[indexNodeTo] == true) continue;
                this.visited[indexNodeTo] = true;

                queue.push(this.nodes[indexNodeTo]);
                treeEdges.push(edge);
            }
            treeNodes.push(current);
        }

        const tree = new Graph(treeNodes, treeEdges);
        this.mapperGraph();
        
        return {route, tree : tree};
    }
    DFS(value){
        var route = [];

        const indexNode = this.searchNode(value);
        this.visited[indexNode] = true;

        route.push(this.nodes[indexNode].value);
        this.treeNodes.push(this.nodes[indexNode]);

        for(let edge of this.nodes[indexNode].edges)
        {
            const indexNodeTo = this.searchNode(edge.nodeTo);
            if (this.visited[indexNodeTo] == true) continue;
            
            this.treeEdges.push(edge);
            this.DFS(edge.nodeTo).route.map(n =>{
                route.push(n);
            })
        }
        
        const tree = new Graph(this.treeNodes, this.treeEdges);
        return {route, tree};
    }
    Greedy(value, end){
        var route = [];

        const indexNode = this.searchNode(value);
        this.visited[indexNode] = true;

        route.push(this.nodes[indexNode].value);
        if (this.nodes[indexNode].value == end) return {route}

        const edges = this.nodes[indexNode].edges.toSorted((a,b)=> 
        {
            const indexNodeA = this.searchNode(a.nodeTo)
            const indexNodeB = this.searchNode(b.nodeTo)
            const costA = this.nodes[indexNodeA].heuristic;
            const costB = this.nodes[indexNodeB].heuristic;
            
            if(costA < costB)
                return costB - costA
            else
                return costA - costB
        });
        console.log(edges);
        for(let edge of edges)
        {
            const indexNodeTo = this.searchNode(edge.nodeTo);
            if (this.visited[indexNodeTo] == true) continue;
            
            var found = false;
            this.Greedy(edge.nodeTo, end).route.map(n =>{
                route.push(n);
                if(n == end)
                    found = true;
            })

            if (found) break;
        }

        return {route};
    }
    A(value, end){
        var route = [];

        const indexNode = this.searchNode(value);
        this.visited[indexNode] = true;

        route.push(this.nodes[indexNode].value);
        if (this.nodes[indexNode].value == end) return {route}

        const edges = this.nodes[indexNode].edges.toSorted((a,b)=> 
        {
            const indexNodeA = this.searchNode(a.nodeTo)
            const indexNodeB = this.searchNode(b.nodeTo)
            const costA = this.nodes[indexNodeA].heuristic + a.weight;
            const costB = this.nodes[indexNodeB].heuristic + b.weight;
            
            if(costA > costB)
                return costB - costA
            else
                return costA - costB
        });

        for(let edge of edges)
        {
            const indexNodeTo = this.searchNode(edge.nodeTo);
            if (this.visited[indexNodeTo] == true) continue;
            
            var found = false;
            this.A(edge.nodeTo, end).route.map(n =>{
                route.push(n);
                if(n == end)
                    found = true;
            })

            if (found) break;
        }

        return {route};
    }
}


export { Graph }