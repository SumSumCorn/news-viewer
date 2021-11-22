import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import NewsItem from './NewsItem';
import axios from 'axios';

const NewsListsBlock = styled.div`
  box-sizing: border-box;
  padding-bottom: 3rem;
  width: 768px;
  margin: 0 auto;
  margin-top: 2rem;
  @media screen and (max-width: 768px) {
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

const SampleArticle = {
  title: '제목',
  description: '내용',
  url: 'https://google.com',
  urlToImage: 'https://via.placeholder.com/160',
};

const NewsList = () => {
  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          'https://newsapi.org/v2/top-headlines?country=kr&apiKey=a1ea6984efb047f7a546a3e4d34f2378',
        );

        setArticles(response.data.articles);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return <NewsListsBlock>...대기중</NewsListsBlock>;
  }
  if (!articles) {
    return null;
  }
  return (
    <NewsListsBlock>
      {articles.map((article) => (
        <NewsItem key={article.url} article={article} />
      ))}
    </NewsListsBlock>
  );
};

export default NewsList;
