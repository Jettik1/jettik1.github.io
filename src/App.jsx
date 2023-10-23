import './App.css'
import {useGetPostsQuery} from "./widgets/PostService.js"
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {FixedSizeList} from "react-window";



function App() {
    const [page, setPage] = useState(1)
    const {data, error, isFetching} = useGetPostsQuery()

    const Row = ({ index, style }) => {
        const item = data[index]
        return (
            <div key={item.id} style={style}>
                <p><Link to={`/${item.id}`}
                         preventScrollReset={false}
                         state={{ id: item.id}}>
                    {item.id}. {item.title}
                </Link></p>
                {item.body.length >= 50 ? (
                    <div>{item.body.slice(0, 50)}...</div>
                ) : (
                    <div>{item.body}</div>
                )}
            </div>
        )
    }

    const Example = () => (
        <FixedSizeList
            height={800}
            itemCount={data.length}
            itemSize={90}
            width={800}
        >
            {Row}
        </FixedSizeList>
    );

  return (
    <>
        {isFetching ? (<>Fetching</>) : data ? (
            <Example/>
        ) : null }
    </>
  )
}

export default App
