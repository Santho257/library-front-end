export default function MessageListItem(props) {
    return <>
        <li className={`message border-2 border-b-4 border-transparent flex ${props.self && "flex-row-reverse"}`}>
            <p className={`${(props.self)?"bg-white":"text-white bg-blue"} max-w-[70%] px-2 rounded-lg`}>{props.message}</p>
        </li>
    </>;
}