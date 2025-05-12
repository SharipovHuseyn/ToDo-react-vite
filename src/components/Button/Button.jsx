import './Button.css'

export default function Button({ children, onClick }){
    return (
        <button className='add-btn' onClick={onClick}>{children}</button>
    )
}