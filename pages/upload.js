import Head from 'next/head';
import Layout from '../components/layout';

export default function Upload({ }) {
    return (
        <div>
            <Head>
                <title>檔案上傳 - NTU ECON Database</title>
                <link rel="icon" href="/favicon.ico" />
                <style>
                    {`
                    .iframe-container {
                        position: relative;
                        width: 80%;
                        padding-bottom: 100%;
                    }
                    .responsive-iframe {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                    }

                    `}
                </style>
            </Head>
            <Layout>
                <div class="container">
                    <center>
                        <div class="iframe-container">
                            <iframe class="responsive-iframe" src="https://script.google.com/macros/s/AKfycbyr7hwIkLcl9st47XjqIkQQe6YWMfH35w1gAUIFhhx5cTbStjseGiQDgYd8dWJFcHmG/exec"></iframe>
                        </div>
                    </center>
                </div>
            </Layout>
        </div>
    );
}
