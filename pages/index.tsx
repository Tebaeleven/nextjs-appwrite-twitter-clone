import { Client, Databases , Account} from 'appwrite'


export default function Home({ tweets }) {
    // サインアップ（新規登録）
    const createUser = async () => {
        const client = new Client();

        const account = new Account(client);

        client
            .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT)
            .setProject(process.env.NEXT_PUBLIC_PROJECT);

        const response = account.create(
            "test1", //name
            "test@test.com", //email
            "password" //password
        );

        response.then(
            function (response) {
                console.log(response); // Success
            },
            function (error) {
                console.log(error); // Failure
            }
        );
    };

    // ログイン
    const userLogin = async () => {
        const client = new Client();

        const account = new Account(client);

        client
            .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT)
            .setProject(process.env.NEXT_PUBLIC_PROJECT);

        const response = account.createEmailSession(
            "test@test.com", //email
            "password" //password
        );

        response.then(
            function (response) {
                console.log(response); // Success
            },
            function (error) {
                console.log(error); // Failure
            }
        );
    };

    return (
        <>
            <div>
                <button
                    onClick={createUser}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    ユーザー新規登録
                </button>
                <button
                    onClick={userLogin}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    email+passwordログイン
                </button>
            </div>
        </>
    );
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