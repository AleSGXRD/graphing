import './App.css'
import { Node } from './model/Node'
import { Graph } from './logic/Graph';
import { Edge } from './model/Edge';

function App() {

  const nodes = [ new Node({ value : 1, heuristic: 20}),new Node({ value : 2, weiheuristicght: 15}),
                  new Node({ value : 3, heuristic: 5}) ,new Node({ value : 4, heuristic: 23}),
                  new Node({ value : 5, heuristic: 18}) ,new Node({ value : 6, heuristic: 0}),];
  const edges = [ new Edge({ a: 1, b: 2, weight: 15}), new Edge({ a: 1, b:3, weight: 10}),
                  new Edge({ a: 3, b: 4, weight: 50}), new Edge({ a: 5, b: 4, weight: 8}),
                  new Edge({ a: 2, b: 5, weight: 5}), new Edge({ a: 5, b: 6, weight: 1})];
  const graph = new Graph(nodes,edges);

  const bfs = getBFS(graph);
  const dfs = getDFS(graph);

  bfs.tree.mapperGraph();
  const bfsGreedy = bfs.tree.restartVisited().Greedy(1, 6);
  const bfsA = bfs.tree.restartVisited().A(1,6);
  
  dfs.tree.mapperGraph();
  const dfsGreedy = bfs.tree.restartVisited().Greedy(1, 6);
  const dfsA = bfs.tree.restartVisited().A(1,6);
                
  
  
  // const nodes = [ new Node({ value : 1, heuristic: 50}),new Node({ value : 2, weiheuristicght: 15}),
  //   new Node({ value : 3, heuristic: 19}) ,new Node({ value : 4, heuristic: 23}),
  //   new Node({ value : 5, heuristic: 18}) ,new Node({ value : 6, heuristic: 40}),
  //   new Node({ value : 7, heuristic: 78}) ,new Node({ value : 8, heuristic: 70}),
  //   new Node({ value : 9, heuristic: 0}),
  // ];
  //  const edges = [ new Edge({ a: 1, b: 2, weight: 15}), new Edge({ a: 1, b:3, weight: 10}),
  //                   new Edge({ a: 2, b: 4, weight: 5}),
  //                   new Edge({ a: 2, b: 6, weight: 15}),
  //                   new Edge({ a: 3, b: 2, weight: 4}), 
  //                   new Edge({ a: 3, b: 4, weight: 50}),  new Edge({ a: 4, b: 5, weight: 8}),  
  //                   new Edge({ a: 5, b: 6, weight: 18}),
  //                   new Edge({ a: 6, b: 7, weight: 10}), new Edge({ a: 7, b: 8, weight: 9}),
  //                   new Edge({ a: 8, b: 9, weight: 5}), new Edge({ a: 5, b: 9, weight: 29})];
  // const graph = new Graph(nodes,edges);

  // const bfs = getBFS(graph);
  // const dfs = getDFS(graph);

  // bfs.tree.mapperGraph();
  // const bfsGreedy = bfs.tree.restartVisited().Greedy(1, 9);
  // const bfsA = bfs.tree.restartVisited().A(1,9);
  
  // dfs.tree.mapperGraph();
  // const dfsGreedy = bfs.tree.restartVisited().Greedy(1, 9);
  // const dfsA = bfs.tree.restartVisited().A(1,9);
  


  function getBFS(graph){
    return graph.restartVisited().BFS(1);
  }
  function getDFS(graph){
    return graph.restartVisited().DFS(1);
  }

  function mapperRoute(route){
    return route.map((n,index)=>{
      if(index === 0)
        return(
          <>
            <li>
              {n}
            </li>
          </>
        )
      else
        return (
          <>
            <hr />
            <li>
              {n}
            </li>
          </>
        )
    })
  }

  return (
    <main>
      <div>
        <span>BFS </span>
        <ul className='route'>
          {
            mapperRoute(bfs.route)
          }
        </ul>
        <br />
        <span>Greedy </span>
        <ul className='route'>
          {
            mapperRoute(bfsGreedy.route)
          }
        </ul>
        <br />
        <span>A </span>
        <ul className='route'>
          {
            mapperRoute(bfsA.route)
          }
        </ul>
      </div>
      <div>
        <span>DFS </span>
        <ul className='route'>
          {
            mapperRoute(dfs.route)
          }
        </ul>
        <br />
        <span>Greedy </span>
        <ul className='route'>
          {
            mapperRoute(dfsGreedy.route)
          }
        </ul>
        <br />
        <span>A </span>
        <ul className='route'>
          {
            mapperRoute(dfsA.route)
          }
        </ul>
      </div>
      
      
    </main>
  )
}

export default App
