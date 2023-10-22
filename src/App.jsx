import './App.css'
import {useGetPostsQuery} from "./widgets/PostService.js"
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";




function App() {
    const [page, setPage] = useState(1)
    const {data, error, isFetching} = useGetPostsQuery(page)

    useEffect(() => {
        const onScroll = () => {
            const scrolledToBottom =
                window.innerHeight + window.scrollY >= document.body.offsetHeight
            if (scrolledToBottom && !isFetching) {
                console.log("Fetching more data...")
                setPage(page+1)
            }
        }

        document.addEventListener("scroll", onScroll)

        return function () {
            document.removeEventListener("scroll", onScroll);
        }
    }, [page, isFetching])



  return (
    <>

        {error ? (
            <>Oh no, there was an error</>
        ) : data ? (
            <ul>
                {data.map((item) => (
                    <li key={item.id}>
                        <h3><Link to={`/${item.id}`} preventScrollReset={false} state={{ id: item.id}}>{item.id}. {item.title}</Link></h3>
                        {item.body.length >= 50 ? (
                            <>{item.body.slice(0, 50)}...</>
                        ) : (
                            <>{item.body}</>
                        )}
                    </li>
                ))}
            </ul>
        ) : null}

    </>
  )
}

export default App
