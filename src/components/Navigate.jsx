export default function Navigate({ children, route="/" }){
    return (
        <a href={route} className="nav">{children}</a>
    )
}