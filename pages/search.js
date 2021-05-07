import Head from "next/head";
import { useRouter } from "next/router";
import Header from "../components/Header";
import SearchResults from "../components/SearchResults";
import { API_KEY, CONTEXT_KEY } from "../keys";
import Response from "../Response";

function Search({ results }) {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>{router.query.term} - Google Search</title>
        <link rel="icon" href="/google.png" />
      </Head>

      <Header />
      <SearchResults results={results} />
    </div>
  );
}

export default Search;

//server side rendering functions

//Server-side rendering (SSR) is the process of rendering web pages
//on a server and passing them to the browser (client-side),
//instead of rendering them in the browser

//If you export an async function called getServerSideProps from a page,
//Next.js will pre-render this page on each request using the data returned by getServerSideProps.
//context parameter is an object containing the few keys like query,req,etc

//SSR sends a fully rendered page to the client
//async makes a function return a Promise
//await makes a function wait for a Promise

export async function getServerSideProps(context) {
  const useDummyData = false;
  const startIndex = context.query.start || "0"; //used in pagination

  // we use the dummy data stored in Response.js file if useDummyData is true
  //else we display the response from server
  //this was helpful during development because Google API allows 100 searchs/day only
  const data = useDummyData
    ? Response
    : await fetch(
        `https://www.googleapis.com/customsearch/v1?key=${API_KEY}
        &cx=${CONTEXT_KEY}&q=${context.query.term}&start=${startIndex}`
      ).then((response) => response.json());

  //passing results to client after server has rendered
  return {
    props: {
      results: data,
    },
  };
}
