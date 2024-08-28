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
                            <iframe class="responsive-iframe" src="https://script.google.com/macros/s/AKfycbw77hODmkIaSy-KnsRwdrlFNUApkUO1kHo0djy5-Q_FP1mSjfTO9CKuG9DIIhR34UEb/exec"></iframe>
                        </div>
                    </center>
                </div>
            </Layout>
        </div>
    );
}
