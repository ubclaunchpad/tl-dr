import { useEffect, useState } from 'react';
import ArticleSection from './Summary';
import Lens from '../Lens';
import Sidebar from '../Sidebar';

interface IArticleData {
  title?: string;
  date?: Date;
  author?: string;
  website?: string;
  body: string[];
}

interface ArticleProps extends IArticleData {
  close: () => void;
}

export default function Article(props: ArticleProps) {
  const [readTime, setReadTime] = useState('');
  const [keywords, setkeywords] = useState<string[]>([]);

  const pageTitle = props.title || props.website || 'No Title Found';

  const generateReadTime = () => {
    const readInMinutes = props.body.join(' ').length / 200;
    if (readInMinutes < 1) {
      setReadTime('less than a minute');
    } else if (readInMinutes > 60) {
      setReadTime(
        `< ${readInMinutes / 60} hours and ${readInMinutes % 60} minutes`
      );
    } else {
      setReadTime(`< ${Math.ceil(readInMinutes)} minutes`);
    }
  };

  const generateKeywords = () => {
    const temp = props.body[0].split(' ');
    setkeywords(['Examples:'].concat(temp.slice(0, 3)));
    //TODO: connect with BE
  };

  useEffect(() => {
    generateReadTime();
    generateKeywords();
  }, []);

  return (
    <div className="popup">
      <div className="main page">
        <Sidebar />

        <div className="article-body">
          <nav>
            <button onClick={() => props.close()}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_77_668)">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.00006 9.41407L11.5354 12.9501C11.723 13.1377 11.9774 13.2431 12.2427 13.2431C12.508 13.2431 12.7625 13.1377 12.9501 12.9501C13.1377 12.7625 13.243 12.508 13.243 12.2427C13.243 11.9774 13.1377 11.723 12.9501 11.5354L9.41339 8.00007L12.9494 4.46474C13.0422 4.37185 13.1159 4.26159 13.1661 4.14024C13.2163 4.01889 13.2422 3.88884 13.2421 3.7575C13.2421 3.62617 13.2162 3.49613 13.1659 3.37481C13.1156 3.25348 13.0419 3.14325 12.9491 3.05041C12.8562 2.95756 12.7459 2.88392 12.6246 2.83369C12.5032 2.78346 12.3732 2.75762 12.2418 2.75766C12.1105 2.75769 11.9805 2.78358 11.8591 2.83387C11.7378 2.88416 11.6276 2.95785 11.5347 3.05074L8.00006 6.58607L4.46473 3.05074C4.37253 2.95519 4.26222 2.87895 4.14024 2.82649C4.01826 2.77402 3.88705 2.74638 3.75427 2.74516C3.6215 2.74394 3.48981 2.76918 3.36689 2.81941C3.24397 2.86963 3.13228 2.94383 3.03834 3.03768C2.94441 3.13153 2.8701 3.24314 2.81976 3.36601C2.76942 3.48889 2.74406 3.62055 2.74515 3.75333C2.74624 3.88611 2.77377 4.01734 2.82612 4.13937C2.87847 4.2614 2.9546 4.37178 3.05006 4.46407L6.58673 8.00007L3.05073 11.5354C2.86313 11.723 2.75774 11.9774 2.75774 12.2427C2.75774 12.508 2.86313 12.7625 3.05073 12.9501C3.23832 13.1377 3.49276 13.2431 3.75806 13.2431C4.02336 13.2431 4.2778 13.1377 4.46539 12.9501L8.00006 9.41341V9.41407Z"
                    fill="black"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_77_668">
                    <rect width="16" height="16" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </button>
          </nav>
          <h6>{readTime}</h6>
          <div>
            <h1>{pageTitle}</h1>
          </div>
          <div className="keywords">
            {keywords.map((keyword) => (
              <p key={keyword}>{keyword}</p>
            ))}
          </div>
          <Lens>
            <ArticleSection text={props.body} />
          </Lens>
        </div>
      </div>
    </div>
  );
}
