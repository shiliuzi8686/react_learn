import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
    // constructor(props){
    //     super(props)
    //     this.state = {
    //         value:null
    //     }
    // }
    // render() {
    //     return (
    //         // 使用大括号容纳JS表达式
    //         // 这里onClick的回调函数若是用function声明的this应该指向这个button
    //         // 若是用箭头函数生命的，this应该就是render的this，render是组件子类
    //         //     即，和下面的this是一样的
    //         <button 
    //             className="square"
    //             onClick={ () => {
    //                 // setState是哪来的方法？？？
    //                 this.setState({value:'X'})
    //             }}
    //         >
    //             {/* 将外界传递来的名为value的prop接收并使用 */}
    //             {/* TODO */}
    //             {this.state.value}
    //         </button>
    //     );
    // }
    render() {
        return (
            // 使用大括号容纳JS表达式
            // 这里onClick的回调函数若是用function声明的this应该指向这个button
            // 若是用箭头函数生命的，this应该就是render的this，render是组件子类
            //     即，和下面的this是一样的
            <button 
                className="square"
                // 下面这两个有什么区别呢？为啥是这样呢？？？不是多此一举吗？
                onClick={ () => this.props.onClick()}
                // onClick={ this.props.onClick()}
                // 或许是下面的这个onClick不需要加括号
            >
                {/* 将外界传递来的名为value的prop接收并使用 */}
                {/* TODO */}
                {this.props.value}
            </button>
        );
    }
}

class Board extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            squares: Array(9).fill(null),
            xIsNext:true
        }
    }
    handleClick(i){
        // 浅拷贝数组中的每一项，也就是说，数组中的项不是Object类型即可
        const squares = this.state.squares.slice()
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
                value={this.state.squares[i]}
                onClick={ () => this.handleClick(i)}
            />
        );
    }

    render() {
        const status = 'Next player: X';

        return (
        <div>
            <div className="status">{status}</div>
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
    render() {
        return (
            <div className="game">
                <div className="game-board">
                <Board />
                </div>
                <div className="game-info">
                <div>{/* status */}</div>
                <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
  