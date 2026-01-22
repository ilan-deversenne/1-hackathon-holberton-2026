export default function Sidebar() {
    return (
        <nav className="m-3 p-8 h-full relative bg-card rounded-xl w-[220px]">
            <p>Hackathon</p>

            <li className="mt-4 mb-2 list-none">
                <a href="#">Dashboard</a>
            </li>
            <li className="mb-2 list-none">
                <a href="#">Lessons</a>
            </li>
            <li className="mb-2 list-none">
                <a href="#">Quiz</a>
            </li>
            <li className="mb-2 list-none">
                <a href="#">Users</a>
            </li>
        </nav>
    )
}
