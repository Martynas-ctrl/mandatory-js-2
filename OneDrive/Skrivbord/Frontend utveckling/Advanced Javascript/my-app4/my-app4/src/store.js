// import {createStore} from 'redux';

// const initial = {
//     current: 'red', // can also be 'black'
//     board: [
//         [], // col 0
//         [], // col 1    
//         [], // col 2
//         [], // col 3
//         [], // col 4
//         [], // col 5
//         [], // col 6
//     ],
// };

// function reducer(state, action) {
//     if(action.type === 'DROP_TILE') {
//         console.log('dropping onto col' + action.payload );
//         const tile = state.current;
//         const col = state.board[action.payload].concat(tile); // our new col

//         const board = state.board.slice(); // need to copy , cannot vhange directly
//         board[action.payload] = col; // need to update column with new tile

//         console.log(col);

//         // komma på hur man inte låter tricka mer när man har uppfyllt alla columner på y-axel
//         if(col.length > 6) {
//             console.log('To many!'); 
//         }
        
//         return {
//             current: state.current === 'red' ? 'black' : 'red',
//             board: board,
//         };
//     }

//     return state;
// }

// export default createStore(reducer, initial);