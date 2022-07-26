import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    collection,
    getDocs,
    limit,
    orderBy,
    query
} from 'firebase/firestore/lite'

import NewsBlockSkeleton from '../../skeletons/newsBlockSkeleton';
import Pagination from './Pagination';
import NewsCard from './NewsCard';
import { database } from '../../firebase/firebaseConfig';

const NewsBlock = () => {
	const [news, setNews] = useState([]);
    const [pageCount, setPageCount] = useState(0)
    const [dataSelected, setDataSelected] = useState(1)
    const [loading, setLoading] = useState(true)

    const [data, setData] = useState([])
    const collectionRef = collection(database, 'news')

    useEffect(() => {
        getData()
    },[])
    
    const getData = async () => {
        setLoading(true)
        const collectionQuery = query(collectionRef, orderBy('id', 'asc'), limit(4))
        const dataNews = await getDocs(collectionQuery)
        const newsData = dataNews.docs.map(item => {
            return item.data()
        })
        setNews(newsData)
        setLoading(false)
    }

    // console.log(news);

    // useEffect(() => {
    //     fetchNews()
    // }, [])

    // const fetchNews = async (currentPage) => {
    //     setLoading(true)
    //     const response = await fetch(`http://localhost:3001/news?_page=${currentPage}&_limit=4`);
    //     const data = await response.json();
    //     setNews(data)
    //     // const total = response.headers.get('x-total-count')
    //     // setPageCount(Math.ceil(total/4))
    //     setLoading(false)
    //     return data;
    // };

    // const onCurrentPage = async (data) => {
    //     let currentPage = data.selected + 1
    //     setDataSelected(currentPage)
    //     const fetchItems = await fetchNews(currentPage) 
    //     setNews(fetchItems)
    // }

    const content = loading ? 
        [...new Array(4)].map((_, i) => <NewsBlockSkeleton key={i} />) :
        <NewsCard news={news}/>

	return (
		<div className="news-block">
			<div className="container">
				<div className="news-block__box">
					<span className="news-block__title title">Nachrichten</span>
					<Link className="news-block__link" to={'/Nachrichten'}>
						Alle Nachrichten
					</Link>
				</div>
                {content}
				{/* <Pagination 
                    pageChange={onCurrentPage} 
                    pageCount={pageCount} 
                    dataSelected={dataSelected}
                    /> */}
			</div>
		</div>
	);
};

export default NewsBlock;
