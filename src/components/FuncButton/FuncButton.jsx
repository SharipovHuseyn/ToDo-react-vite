import './FuncButton.css'

export default function FuncButton({ children, color, onClick, todoId }){
    return (
        <button className='func-btn' style={{color: color}} onClick={() => onClick(todoId)}>{ children }</button>
    )
}