import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props){
    return (
        <button 
            className='square' 
            onClick={props.onClick}
        >
            {props.value}
        </button>
    )
}

class Board extends React.Component {
    // constructor(props){
    //     super(props)
    //     this.state = {
    //         squares: Array(9).fill(null),
    //         xIsNext:true
    //     }
    // }
    handleClick(i){
        // 浅拷贝数组中的每一项，也就是说，数组中的项不是Object类型即可
        const squares = this.state.squares.slice()
        if(this.calculateWinner(squares) || squares[i]) return;
        squares[i] = this.state.xIsNext ? 'X' :'O'
        this.setState({
            squares:squares,
            xIsNext:!this.state.xIsNext
        })
    }
    renderSquare(i) {
        // 从Board组件将数据传递到 Square 组件
        // 传递一个名为 value 的 prop 到Square中
        return (
            <Square 
                // value={this.state.squares[i]}
                // onClick={ () => this.handleClick(i)}
                value={this.props.squares[i]}
                onClick={ () => this.props.onClick(i)}
            />
        );
    }
    calculateWinner(squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
            }
        }
        return null;
    }

    render() {
        // const status = 'Next player: X';
            // const winner = this.calculateWinner(this.state.squares)
            // let status
            // if(winner)
            //     status = "Winner:" + winner
            // else
            //     status = "Next player:" + (this.state.xIsNext ? "X" : "O")

        return (
            <div>
                {/* <div className="status">{status}</div> */}
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            history:[{
                squares:Array(9).fill(null)
            }],
            xIsNext:true,
            stepNumber:0,
        }
    }
    calculateWinner(squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
            }
        }
        return null;
    }
    handleClick(i){
        const history = this.state.history.slice(0,this.state.stepNumber + 1)
        const current = history[history.length - 1]
        const squares = current.squares.slice()
        if(this.calculateWinner(squares) || squares[i]) return
        squares[i] = this.state.xIsNext ? "X" : "O"
        this.setState({
            history:history.concat([{
                squares:squares,
            }]),
            stepNumber:history.length,
            xIsNext:!this.state.xIsNext,
        })
    }
    jumpTo(step){
        this.setState({
            stepNumber:step,
            xIsNext: (step % 2) === 0
        })
    }
    render() {
        const history = this.state.history
        const current = history[this.state.stepNumber]
        const winner = this.calculateWinner(current.squares)

        const moves = history.map( (step,move) => {
            const desc = move ?
                "Go to move #" + move :
                "Go to game start"
            return (
                <li key={move}>
                    <button 
                        onClick={ () => this.jumpTo(move)}
                    >
                        {desc}
                    </button>
                </li>
            );
        })

        let status
        if(winner)
            status = "Winner:" + winner
        else
            status = "Next player:" + (this.state.xIsNext ? "X" : "O")

        return (
            <div className="game">
                <div className="game-board">
                <Board 
                    squares = {current.squares}
                    onClick = { (i) => this.handleClick(i)}
                />
                </div>
                <div className="game-info">
                <div>{status}</div>
                <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);