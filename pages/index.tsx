import { Client, Databases , Account} from 'appwrite'


export default function Home({ tweets }) {
  console.log(tweets)
    return <></>;
}

export async function getServerSideProps(context) {
  const client = new Client();
  
  client
    .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_PROJECT);
  
  const databases = new Databases(client);

  const tweets = await databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE,
      process.env.NEXT_PUBLIC_TWEETS_COLLETCION
  );

  return {
    props:{tweets},
  }
}